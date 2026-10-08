# InfoHoy — Plataforma Web de Noticias (Angular)

Entrega 3 del proyecto académico del módulo Front-end. Migración de la aplicación
"InfoHoy" (Entrega 2, HTML/CSS/JS) a Angular, usando componentes standalone,
Angular Router, Reactive Forms y HttpClient.

## Requisitos

- Node.js 18+ (recomendado 20 o 22)
- Angular CLI (`npm install -g @angular/cli`)

## Instalación

```bash
npm install
```

## Ejecutar en modo desarrollo

```bash
npm start
```

Abre http://localhost:4200

## Generar build de producción

```bash
npm run build
```

El resultado queda en `dist/infohoy-angular/browser`, listo para desplegar en
cualquier hosting estático (Netlify, Vercel, GitHub Pages).

## Estructura del proyecto

```
src/app/
├── app.component.ts          Componente raíz (header + router-outlet + footer)
├── app.routes.ts              Definición de rutas
├── app.config.ts               Configuración de providers (HttpClient, Router)
├── core/
│   ├── models/noticia.model.ts     Interfaz Noticia
│   └── services/
│       ├── noticias.service.ts      Datos + Mini CRUD (HttpClient + localStorage)
│       └── favoritos.service.ts     Gestión de favoritos (Signals + localStorage)
├── components/
│   ├── header/                      Encabezado con navegación
│   ├── footer/                      Pie de página
│   └── noticia-card/                Tarjeta de noticia reutilizable (@Input/@Output)
└── pages/
    ├── home/                        Página de inicio
    ├── listado/                     Catálogo con filtros
    ├── detalle/                     Vista de detalle (ruta con parámetro :id)
    ├── contacto/                    Formulario con Reactive Forms
    ├── mis-favoritos/                Noticias guardadas en favoritos
    └── admin/                        Mini CRUD (crear/eliminar noticias)

public/assets/
├── data/noticias.json           Datos base de las noticias
└── img/                          Imágenes del proyecto
```

## Enrutamiento

La aplicación usa **hash routing** (`/#/ruta`) para que funcione sin configuración
adicional en cualquier hosting estático gratuito, incluyendo GitHub Pages.

## Despliegue

### Netlify (recomendado, el más simple)
1. Ejecutar `npm run build`.
2. Entrar a https://app.netlify.com/drop y arrastrar la carpeta `dist/infohoy-angular/browser`.
3. Netlify entrega una URL pública al instante.

### Vercel
1. Crear cuenta en https://vercel.com
2. Conectar el repositorio de GitHub/GitLab.
3. Build command: `npm run build` — Output directory: `dist/infohoy-angular/browser`

### GitHub Pages
1. `npm run build`
2. Subir el contenido de `dist/infohoy-angular/browser` a la rama `gh-pages`.
3. Activar GitHub Pages en Settings → Pages → rama `gh-pages`.

## Tecnologías

- Angular 18 (standalone components)
- Angular Router (hash location strategy)
- Reactive Forms
- HttpClient
- Signals (gestión de favoritos)
- CSS3 (reutilizado de la Entrega 2, sin frameworks adicionales)
