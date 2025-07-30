# 🍽️ Restaurant System

Este es un sistema web desarrollado con **React** para la gestión operativa y visualización de datos en restaurantes. El proyecto está orientado a mejorar la eficiencia administrativa, el manejo de pedidos y la exportación de datos.

## 🚀 Tecnologías utilizadas

- **React** — Librería principal para el desarrollo de la interfaz.
- **React Router** — Para la navegación entre páginas.
- **Context API / Redux (si aplica)** — Para el manejo de estado global.
- **Fetch / Axios** — Para llamadas a la API (si aplica).
- **CSS Modules / Tailwind / Styled Components** — Para los estilos (ajustar según tu setup).
- **Git + GitHub** — Para control de versiones y colaboración.

## ✅ Funcionalidades principales

- 🔐 **Autenticación de usuarios**: inicio de sesión y control de accesos.
- 📋 **Gestión de menús y productos**: CRUD completo para el contenido del restaurante.
- 🧾 **Exportación de datos**: generación y descarga de reportes de ventas o inventario.
- 📊 **Panel de estadísticas**: visualización gráfica de datos (ventas, pedidos, etc.).
- 🛒 **Gestión de pedidos**: seguimiento y administración de órdenes en tiempo real.
- 🧑‍🍳 **Roles de usuario**: separación de funcionalidades entre admin, mesero, cocina, etc.
- 🌐 **Interfaz responsive**: adaptada a móviles, tablets y escritorio.

## 🧰 Instalación y ejecución

1. Clona el repositorio:

   git clone git@github.com:Giovani2108/restaurantSystem.git  
   cd restaurantSystem

2. Instala las dependencias:

   npm install

3. Ejecuta el proyecto en modo desarrollo:

   npm run dev

4. Abre en el navegador:

   http://localhost:3000

> ⚠️ Asegúrate de tener instalado Node.js y un entorno configurado para React.

## 📁 Estructura del proyecto (resumen)

restaurantSystem/  
│  
├── src/  
│   ├── components/       # Componentes reutilizables  
│   ├── pages/            # Vistas/páginas principales  
│   ├── services/         # Lógica para conectar con APIs  
│   ├── context/          # Manejo de estado global  
│   ├── assets/           # Imágenes, íconos, etc.  
│   └── App.jsx           # Componente raíz  
│  
├── public/               # Archivos estáticos  
├── .gitignore  
├── package.json  
└── README.md

## 🔒 Conexión SSH (para colaborar)

Este repositorio está configurado para ser accedido vía **SSH**. Asegúrate de tener tu clave pública agregada a GitHub y de tener permisos correctos en tu archivo `~/.ssh/config`.

## ✍️ Autor

**Giovani2108**  
GitHub: [@Giovani2108](https://github.com/Giovani2108)

## 📜 Licencia

Este proyecto está licenciado bajo los términos que el autor defina. *(Puedes añadir MIT, GPL, etc. si corresponde)*
