# Despliegue en App Engine

El sitio se despliega como el servicio **`sitio-publico`** de App Engine
Standard, en dos proyectos GCP separados — siguiendo la misma convención que
ya usa el backend (`subastemosv2/backend`):

| Entorno | Proyecto GCP | Manifiesto | Script | Dominio backend equivalente |
|---|---|---|---|---|
| Test/Dev | `subastemosdev` | `app-Dev.yaml` | `DeployTest.bat` / `scripts/deploy.sh test` | testingapp.subastemos.mx |
| Producción | `subastas-dev` | `app.yaml` | `DeployProd.bat` / `scripts/deploy.sh prod` | portal.subastemos.mx |

Sí, el proyecto de producción se llama `subastas-dev` — es el nombre histórico
del proyecto en GCP, no describe su propósito. Es el mismo que usa el backend.

**Ninguno de los dos despliegues toca el backend.** Son proyectos y servicios
distintos; `sitio-publico` se añade junto al servicio `default` del backend sin
modificar su configuración.

## Antes del primer despliegue

1. **Rotar la clave de Google Maps.** La que venía en el clon estático es
   pública. Genera una nueva por entorno, activa *Maps JavaScript API* y
   restringe por referrer HTTP al dominio correspondiente.
2. **Confirmar el dominio de test.** `app-Dev.yaml` usa hoy la URL por defecto
   que asigna App Engine (`sitio-publico-dot-subastemosdev.uc.r.appspot.com`),
   porque no hay un subdominio de test mapeado todavía. Si se mapea uno (al
   estilo `testingapp.subastemos.mx`), actualiza `NEXT_PUBLIC_SITE_URL` ahí.
3. **Confirmar el dominio de producción** en `app.yaml` (`www.subastemos.mx`).
4. **Crear los secretos** en cada proyecto (abajo).
5. **Autenticar gcloud** con la cuenta que tiene acceso a ambos proyectos.
   En macOS/Linux, con un directorio de configuración propio del proyecto
   (ver [Credenciales aisladas](#credenciales-aisladas-macoslinux)).

## Credenciales aisladas (macOS/Linux)

Para no mezclar este proyecto con otras sesiones de gcloud de la misma
máquina, se usa un `CLOUDSDK_CONFIG` propio. Un `.envrc` local (ignorado por
git, cargado con [direnv](https://direnv.net)) define:

```bash
export CLOUDSDK_CONFIG="$HOME/.config/<proyecto>/gcloud"
export CLOUDSDK_CORE_ACCOUNT="<cuenta>"
export GOOGLE_APPLICATION_CREDENTIALS="$CLOUDSDK_CONFIG/application_default_credentials.json"
export SUBASTEMOS_GCP_ACCOUNT="<cuenta>"
```

- `CLOUDSDK_CORE_ACCOUNT` hace que gcloud falle si esa cuenta no tiene sesión,
  en vez de usar otra.
- `GOOGLE_APPLICATION_CREDENTIALS` evita que las librerías cliente de Google
  caigan al ADC global (`~/.config/gcloud/application_default_credentials.json`),
  que no respeta `CLOUDSDK_CONFIG`.
- `scripts/deploy.sh` aborta si `CLOUDSDK_CONFIG` no está definido o apunta
  al directorio global, o si `SUBASTEMOS_GCP_ACCOUNT` no tiene sesión. Pasa
  `--project` y `--account` explícitos y nunca hace `gcloud config set`.

Dentro del directorio aislado hay dos configuraciones, `subastemos-dev` y
`subastemos-prod`, con su proyecto ya fijado:

```bash
gcloud auth login <cuenta>
gcloud auth application-default login      # solo si se usan librerías cliente
gcloud config configurations activate subastemos-dev   # o subastemos-prod
```

## Los manifiestos

`app-Dev.yaml` (test) y `app.yaml` (producción) declaran el mismo servicio
`sitio-publico`, pero:

- `app-Dev.yaml` usa `instance_class: F1` y un máximo de 2 instancias — basta
  para verificar cambios sin gastar de más.
- `app.yaml` usa `F2` y hasta 4 instancias, dimensionado para tráfico real.
- Cada uno fija su propio `NEXT_PUBLIC_SITE_URL`, de donde salen `canonical`,
  `og:url`, `sitemap.xml`, `robots.txt` y el JSON-LD — **nunca hardcodees el
  dominio en el código**, siempre por esta variable.

`entrypoint: npm start` ejecuta `next start`, que lee la variable `PORT` por su
cuenta: por eso el script de inicio no fija el puerto a mano.

### Si `nodejs24` no está disponible en algún proyecto

`gcloud app deploy` falla con un error explícito de runtime. Bajar a
`nodejs22` es cambiar una línea en el `.yaml` correspondiente; el código no
depende de nada exclusivo de Node 24.

## Secretos

Los `.yaml` se versionan en git, así que **`BACKEND_API_KEY` y
`REVALIDATE_TOKEN` no van ahí**. Se crean por proyecto:

```bash
PROJECT=subastemosdev   # o subastas-dev para prod
echo -n "valor" | gcloud secrets create REVALIDATE_TOKEN --data-file=- --project=$PROJECT
gcloud secrets add-iam-policy-binding REVALIDATE_TOKEN --project=$PROJECT \
  --member="serviceAccount:PROYECTO@appspot.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

Hoy no hacen falta: el provider activo es el estático y sin
`REVALIDATE_TOKEN` el endpoint de revalidación devuelve 503 en lugar de quedar
abierto.

## Desplegar

### Test

```bash
npm run deploy:test        # Windows
npm run deploy:test:mac    # macOS/Linux
```

Ejecuta `DeployTest.bat` (o `scripts/deploy.sh test`), que:

1. Fija el proyecto activo a `subastemosdev`.
2. Pide confirmar antes de continuar.
3. Corre `npm run typecheck` y `npm run build` — si fallan, no despliega.
4. Pide un nombre de versión (ej. `dev-1-0-0`).
5. Pregunta si desplegar **sin promover tráfico**, para poder revisar la
   versión antes de que quede pública. Recomendado siempre que haya un cambio
   grande.
6. Despliega `app-Dev.yaml` con `gcloud app deploy`.

### Producción

```bash
npm run deploy:prod        # Windows
npm run deploy:prod:mac    # macOS/Linux
```

`DeployProd.bat` (o `scripts/deploy.sh prod`) sigue el mismo flujo contra `subastas-dev` y `app.yaml`, con
una advertencia explícita de que es producción y `--no-promote` marcado como
recomendado por defecto.

### Promover una versión sin tráfico

```bash
gcloud app services set-traffic sitio-publico --splits=VERSION=1 --project=PROYECTO
```

### Revertir

```bash
gcloud app versions list --service=sitio-publico --project=PROYECTO
gcloud app services set-traffic sitio-publico --splits=VERSION_ANTERIOR=1 --project=PROYECTO
```

Es instantáneo: la versión anterior sigue desplegada.

### Limpiar versiones antiguas

App Engine cobra por versión desplegada aunque no reciba tráfico.

```bash
gcloud app versions delete VERSION --service=sitio-publico --project=PROYECTO
```

## Comprobaciones

Contra la URL de la versión sin promocionar, en **cada** entorno:

- [ ] La portada carga con su tipografía y sus imágenes
- [ ] El menú móvil abre y cierra a 375 px
- [ ] Los desplegables de la cabecera funcionan en escritorio
- [ ] El carrusel de subastas avanza
- [ ] **Los mapas pintan** en `/contacto` y `/patios/queretaro` (valida que la
      clave de ese entorno está bien restringida)
- [ ] El widget de reservas carga en `/reservas`
- [ ] `/sitemap.xml` y `/robots.txt` apuntan al dominio de ese entorno, no a
      `localhost` ni al del otro entorno
- [ ] `curl -I .../como-comprar.html` devuelve **301** a `/como-comprar`
- [ ] Ninguna página carga jQuery, Popper ni Font Awesome (pestaña Network)
- [ ] Lighthouse móvil y escritorio en `/`, `/blog` y `/patios/queretaro`

## Notas de coste

- Los assets estáticos (`/uploads`, `/fonts`) se sirven con
  `Cache-Control: max-age=31536000, immutable` desde `next.config.ts`.
- Las 17 rutas están pre-renderizadas: no se ejecuta código de página por
  petición, solo se sirven archivos.
- El único código que corre por petición son los Route Handlers de `/api/*`.
- `app-Dev.yaml` usa `F1` y 2 instancias máximo para mantener bajo el gasto en
  test.

Cuando se conecte el backend, lee la salvedad sobre la caché por instancia en
[BACKEND.md](BACKEND.md): afecta al número de peticiones que recibirá la
aplicación de producción.
