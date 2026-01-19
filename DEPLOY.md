# Guía de Deploy a GitHub Pages

## Cambios Realizados

He arreglado los siguientes problemas en tu aplicación:

### 1. **Conflictos en index.html** ✅
- Eliminé la configuración duplicada de scripts (se estaba cargando `index.jsx` e `index.tsx`)
- Removí configuraciones innecesarias de Babel standalone y import maps
- Simplifiqué a una configuración limpia usando Vite

### 2. **Configuración para GitHub Pages** ✅
- Agregué `base: '/Rocosidad/'` en `vite.config.ts` para que funcione correctamente en tu subdirectorio de GitHub
- Actualicé `.gitignore` para ignorar archivos sensibles

### 3. **Archivos Faltantes** ✅
- Creé `index.css` que faltaba
- Generé los iconos PWA (`icon-192.png`, `icon-512.png`, `favicon.ico`)

### 4. **Corrección del API de Google** ✅
- Corregí el import de `@google/genai` a `@google/generative-ai` (paquete correcto)
- Actualicé el código para usar la API correcta de Google Generative AI
- Hice la carga del módulo "lazy" para que no bloquee el build si no está instalado
- La funcionalidad de IA ahora es opcional y mostrará un mensaje claro si falta la API key

### 5. **GitHub Actions Workflow** ✅
- Creé `.github/workflows/deploy.yml` para deploy automático

### 6. **Inicialización de Git** ✅
- Inicialicé el repositorio git con rama `main`

## Pasos para Subir a GitHub

### 1. Instalar dependencias y probar localmente

```bash
cd /ruta/a/rocosidad-gym-tracker
npm install
npm run dev
```

Abre http://localhost:3000 y verifica que la app funciona.

### 2. Crear el repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: **Rocosidad** (importante: con mayúscula inicial)
3. Descripción: "Gym Tracker App - Seguimiento de entrenamientos"
4. Público
5. **NO** inicialices con README, .gitignore ni licencia
6. Crea el repositorio

### 3. Subir el código

Desde la carpeta del proyecto:

```bash
# Añadir todos los archivos
git add .

# Crear el primer commit
git commit -m "Initial commit - Rocosidad Gym Tracker

- Fixed index.html conflicts
- Configured for GitHub Pages deployment
- Added missing files (index.css, icons)
- Fixed Google Generative AI integration
- Added GitHub Actions workflow for automatic deployment

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Conectar con tu repositorio de GitHub (reemplaza con tu usuario)
git remote add origin https://github.com/whistlerian/Rocosidad.git

# Subir el código
git push -u origin main
```

### 4. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub: https://github.com/whistlerian/Rocosidad
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Pages**
4. En "Source", selecciona: **GitHub Actions**
5. Guarda los cambios

### 5. Activar el Workflow

El workflow se ejecutará automáticamente cuando hagas push, pero también puedes:

1. Ir a la pestaña **Actions** en tu repositorio
2. Seleccionar el workflow "Deploy static content to Pages"
3. Click en "Run workflow" para ejecutarlo manualmente

### 6. Verificar el Deploy

Después de 2-3 minutos, tu app estará disponible en:
**https://whistlerian.github.io/Rocosidad/**

## Configuración de la API de Google Gemini (Opcional)

Para que funcione la funcionalidad de consejos con IA:

### Opción 1: Variable de entorno local (desarrollo)

Crea un archivo `.env.local` en la raíz del proyecto:

```
VITE_GEMINI_API_KEY=tu-api-key-aqui
```

Y actualiza `vite.config.ts` para usar `VITE_` prefix:

```typescript
define: {
  'process.env.API_KEY': JSON.stringify(env.VITE_GEMINI_API_KEY),
}
```

### Opción 2: GitHub Secrets (producción)

1. Ve a tu repositorio en GitHub
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Nombre: `GEMINI_API_KEY`
5. Value: tu API key de Google

Luego actualiza `.github/workflows/deploy.yml` para pasar el secret:

```yaml
- name: Build
  env:
    VITE_GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
  run: npm run build
```

### Obtener API Key de Google

1. Ve a https://makersuite.google.com/app/apikey
2. Crea un proyecto si no tienes uno
3. Genera una API key
4. Cópiala y guárdala de forma segura

## Estructura del Proyecto

```
rocosidad-gym-tracker/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── components/                  # Componentes React
├── data/                        # Datos de rutinas
├── hooks/                       # Custom hooks
├── index.html                   # HTML principal (LIMPIO)
├── index.css                    # Estilos globales
├── index.jsx                    # Entry point
├── App.jsx                      # Componente principal
├── vite.config.ts              # Configuración de Vite
├── package.json                # Dependencias
├── manifest.json               # PWA manifest
├── service-worker.js           # Service worker para PWA
├── icon-192.png                # Icono PWA 192x192
├── icon-512.png                # Icono PWA 512x512
└── favicon.ico                 # Favicon
```

## Solución de Problemas

### El sitio no carga en GitHub Pages
- Verifica que el nombre del repositorio sea exactamente "Rocosidad"
- Asegúrate de que GitHub Pages esté configurado para usar GitHub Actions
- Revisa los logs en la pestaña Actions

### La app muestra errores 404
- Verifica que `base: '/Rocosidad/'` esté en `vite.config.ts`
- Asegúrate de que el build se completó correctamente

### Los iconos no aparecen
- Los iconos fueron generados automáticamente con PIL
- Si quieres personalizarlos, reemplaza `icon-192.png` e `icon-512.png`

### La funcionalidad de IA no funciona
- Asegúrate de haber configurado la API key de Gemini
- Revisa la consola del navegador para ver errores específicos
- La app funcionará perfectamente sin la API key, solo sin los consejos de IA

## Próximos Pasos

1. **Personaliza los iconos**: Reemplaza los iconos generados por diseños personalizados
2. **Añade más rutinas**: Edita los archivos en `/data` para agregar tus propias rutinas
3. **Mejora el PWA**: La app ya es una PWA básica, puedes mejorarla con más funcionalidades offline
4. **Analytics**: Considera añadir Google Analytics o similar para tracking

## Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Ver estado de git
git status

# Actualizar el sitio (después de cambios)
git add .
git commit -m "Descripción de cambios"
git push
```

¡Tu app está lista para funcionar en https://whistlerian.github.io/Rocosidad/! 💪
