# InfoHoy — Plataforma Web de Noticias

Proyecto académico del módulo **Front-end** (Entrega 2 — Prototipo funcional).

## Descripción

Aplicación web tipo periódico donde los usuarios pueden explorar noticias de distintas
categorías (tecnología, educación, turismo, comercial), ver el detalle de cada una,
guardar favoritos, enviar un mensaje de contacto y gestionar noticias básicas (crear/eliminar).

## Estructura del proyecto

```
plataforma-noticias/
├── index.html            # Página de inicio (Home)
├── listado.html           # Catálogo de noticias con filtros
├── detalle.html            # Vista de detalle de una noticia
├── mis-favoritos.html      # Noticias guardadas en favoritos
├── contacto.html           # Formulario de contacto con validaciones
├── admin.html               # Mini CRUD: crear y eliminar noticias
├── css/
│   └── styles.css          # Estilos generales del sitio
├── js/
│   ├── main.js              # Menú responsive y utilidades comunes
│   ├── datos.js             # Capa de datos (JSON + localStorage / CRUD)
│   ├── favoritos.js         # Gestión de favoritos (localStorage)
│   ├── index.js              # Lógica de la página de inicio
│   ├── noticias.js           # Lógica del listado y filtros
│   ├── detalle.js            # Lógica de la vista de detalle
│   ├── mis-favoritos.js      # Lógica de la página de favoritos
│   ├── admin.js               # Lógica del Mini CRUD
│   └── contacto.js            # Validaciones del formulario de contacto
├── data/
│   └── noticias.json         # Datos base de las noticias
└── img/
    └── *.svg                  # Imágenes/ilustraciones del proyecto
```

## Tecnologías utilizadas

- HTML5 semántico
- CSS3 (variables, Flexbox, Grid, diseño responsive)
- JavaScript (ES6+, Fetch API, localStorage, sessionStorage)

## Funcionalidades implementadas

- Renderizado dinámico de noticias desde `data/noticias.json`
- Filtro de noticias por categoría
- Gestión de favoritos con `localStorage`
- Vista de detalle por noticia (`detalle.html?id=`)
- Formulario de contacto con validaciones (campos obligatorios y correo válido)
- Mini CRUD: creación y eliminación de noticias (persistido en `localStorage`)
- Diseño responsive (menú hamburguesa en dispositivos móviles)
