@echo off
setlocal enabledelayedexpansion

echo ========================================
echo  DEPLOY - ENTORNO TEST/DEV
echo  Proyecto: subastemosdev
echo  Servicio: sitio-publico
echo ========================================
echo.

echo Configurando proyecto GCP...
call gcloud config set project subastemosdev

echo.
echo Proyecto actual:
call gcloud config get-value project

echo.
set /p CONTINUE="Desea continuar con el deploy? (S/N): "

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
set /p VERSION="Ingrese la version a desplegar (ejemplo: dev-1-0-0): "

if "%VERSION%"=="" (
    echo Version vacia. Deploy cancelado.
    pause
    exit /b 1
)

echo.
set /p NO_PROMOTE="Desplegar sin promover trafico, para revisar antes de publicar? (S/N): "

set PROMOTE_FLAG=
if /i "%NO_PROMOTE%"=="S" set PROMOTE_FLAG=--no-promote

echo.
echo Desplegando version: %VERSION%
call gcloud app deploy app-Dev.yaml -v %VERSION% %PROMOTE_FLAG%

if errorlevel 1 (
    echo ERROR: El deploy fallo.
    pause
    exit /b 1
)

echo.
if defined PROMOTE_FLAG (
    echo Desplegado SIN promover trafico. Revisa la version en:
    echo   https://%VERSION%-dot-sitio-publico-dot-subastemosdev.uc.r.appspot.com
    echo.
    echo Cuando este validado, promuevelo con:
    echo   gcloud app services set-traffic sitio-publico --splits=%VERSION%=1 --project=subastemosdev
) else (
    echo Despliegue completado y publicado.
)
pause

:end
