#!/usr/bin/env bash
# Deploy del portal público a App Engine (equivalente macOS/Linux de
# DeployTest.bat / DeployProd.bat). Uso: scripts/deploy.sh test|prod
#
# Exige un CLOUDSDK_CONFIG propio del proyecto y la cuenta indicada en
# SUBASTEMOS_GCP_ACCOUNT (los define .envrc vía direnv). Si falta algo, aborta
# en vez de desplegar con la sesión gcloud global. Nunca hace
# `gcloud config set`: proyecto y cuenta van explícitos en cada comando.
set -euo pipefail

case "${1:-}" in
  test) PROJECT=subastemosdev; YAML=app-Dev.yaml; LABEL="TEST/DEV"; EXAMPLE=dev-1-0-0 ;;
  prod) PROJECT=subastas-dev;  YAML=app.yaml;     LABEL="PRODUCCION"; EXAMPLE=v1-0-0 ;;
  *) echo "Uso: $0 test|prod" >&2; exit 1 ;;
esac

cd "$(dirname "$0")/.."

fail() { echo "ERROR: $*" >&2; exit 1; }

[[ -n "${CLOUDSDK_CONFIG:-}" ]] \
  || fail "CLOUDSDK_CONFIG no está definido; se usaría la sesión gcloud global. Activa direnv (.envrc) en esta carpeta."
[[ "$(cd "$CLOUDSDK_CONFIG" 2>/dev/null && pwd -P)" != "$(cd "$HOME/.config/gcloud" 2>/dev/null && pwd -P)" ]] \
  || fail "CLOUDSDK_CONFIG apunta al directorio gcloud global."
[[ -n "${SUBASTEMOS_GCP_ACCOUNT:-}" ]] \
  || fail "SUBASTEMOS_GCP_ACCOUNT no está definido. Activa direnv (.envrc) en esta carpeta."
ACCOUNT="$SUBASTEMOS_GCP_ACCOUNT"

gcloud auth list --format='value(account)' | grep -Fxq "$ACCOUNT" \
  || fail "La cuenta $ACCOUNT no tiene sesión en $CLOUDSDK_CONFIG. Ejecuta: gcloud auth login $ACCOUNT"
gcloud auth print-access-token --account="$ACCOUNT" >/dev/null \
  || fail "No se pudo obtener un token para $ACCOUNT."

echo "========================================"
echo " DEPLOY - $LABEL"
echo " Proyecto: $PROJECT"
echo " Servicio: sitio-publico"
echo " Cuenta:   $ACCOUNT"
echo " Config:   $CLOUDSDK_CONFIG"
echo "========================================"
echo

read -rp "Desea continuar con el deploy a $LABEL? (S/N): " CONTINUE
[[ "$CONTINUE" =~ ^[sS]$ ]] || { echo "Deploy cancelado."; exit 1; }

echo; echo "Verificando tipos (tsc --noEmit)..."
npm run typecheck || fail "El proyecto tiene errores de tipos. Deploy cancelado."

echo; echo "Construyendo el sitio (next build)..."
npm run build || fail "El build falló."
echo "Build completado correctamente."

echo
read -rp "Ingrese la version a desplegar (ejemplo: $EXAMPLE): " VERSION
[[ -n "$VERSION" ]] || fail "Version vacía. Deploy cancelado."

if [[ "$1" == prod ]]; then
  echo
  echo "En produccion se recomienda desplegar SIN promover, verificar la version"
  echo "y promoverla despues a mano. Ver docs/DESPLIEGUE.md."
  read -rp "Desplegar sin promover trafico? (S/N, recomendado S): " NO_PROMOTE
else
  read -rp "Desplegar sin promover trafico, para revisar antes de publicar? (S/N): " NO_PROMOTE
fi
PROMOTE_FLAG=()
[[ "$NO_PROMOTE" =~ ^[sS]$ ]] && PROMOTE_FLAG=(--no-promote)

echo; echo "Desplegando version: $VERSION"
gcloud app deploy "$YAML" -v "$VERSION" "${PROMOTE_FLAG[@]+"${PROMOTE_FLAG[@]}"}" \
  --project="$PROJECT" --account="$ACCOUNT" || fail "El deploy falló."

echo
if [[ ${#PROMOTE_FLAG[@]} -gt 0 ]]; then
  echo "Desplegado SIN promover trafico. Revisa la version en:"
  echo "  https://$VERSION-dot-sitio-publico-dot-$PROJECT.uc.r.appspot.com"
  echo
  echo "Cuando este validado, promuevelo con:"
  echo "  gcloud app services set-traffic sitio-publico --splits=$VERSION=1 --project=$PROJECT --account=$ACCOUNT"
else
  echo "Despliegue completado y publicado en $LABEL."
fi
