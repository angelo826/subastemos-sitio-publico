@echo off
setlocal enabledelayedexpansion

echo ========================================
echo  DEPLOY - ENTORNO PRODUCCION
echo  Proyecto: subastas-dev
echo  Servicio: sitio-publico
echo ========================================
echo.

echo Configurando proyecto GCP...
call gcloud config set project subastas-dev

echo.
echo Proyecto actual:
call gcloud config get-value project

echo.
set /p CONTINUE="Desea continuar con el deploy A PRODUCCION? (S/N): "

if /i "%CONTINUE%" neq "S" (
    echo Deploy cancelado.
    exit /b 1
)

echo.
echo Verificando tipos (tsc --noEmit)...
call npm run typecheck
if errorlevel 1 (
    echo ERROR: El proyecto tiene errores de tipos. Deploy cancelado.
    pause
    exit /b 1
)

echo.
echo Construyendo el sitio (next build)...
call npm run build
if errorlevel 1 (
    echo ERROR: El build fallo.
    pause
    exit /b 1
)
echo Build completado correctamente.

echo.
echo Versiones existentes del servicio sitio-publico:
call gcloud app versions list --service=sitio-publico --sort-by=~version.createTime --project=subastas-dev

echo.
set /p VERSION="Ingrese la version a desplegar (ejemplo: v1-0-0): "

if "%VERSION%"=="" (
    echo Version vacia. Deploy cancelado.
    pause
    exit /b 1
)

echo.
echo En produccion se recomienda desplegar SIN promover, verificar la version
echo y promoverla despues a mano. Ver docs/DESPLIEGUE.md.
set /p NO_PROMOTE="Desplegar sin promover trafico? (S/N, recomendado S): "

set PROMOTE_FLAG=
if /i "%NO_PROMOTE%"=="S" set PROMOTE_FLAG=--no-promote

echo.
echo Desplegando version: %VERSION%
call gcloud app deploy app.yaml -v %VERSION% %PROMOTE_FLAG%

if errorlevel 1 (
    echo ERROR: El deploy fallo.
    pause
    exit /b 1
)

echo.
if defined PROMOTE_FLAG (
    echo Desplegado SIN promover trafico. Revisa la version en:
    echo   https://%VERSION%-dot-sitio-publico-dot-subastas-dev.uc.r.appspot.com
    echo.
    echo Cuando este validado, promuevelo con:
    echo   gcloud app services set-traffic sitio-publico --splits=%VERSION%=1 --project=subastas-dev
) else (
    echo Despliegue completado y publicado en PRODUCCION.
)
pause

:end
