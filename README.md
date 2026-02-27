# 🐰 Bunnies Club 👖

¡Bienvenido a **Bunnies Club**! Una plataforma interactiva diseñada por y para fans de **NewJeans**. Este proyecto combina una estética **Neo-Brutalista** vibrante con herramientas funcionales para que los Bunnies puedan crear, compartir y disfrutar de contenido exclusivo del grupo.

## ✨ Características Principales

- **🎨 Editor de Photocard**: Herramienta personalizada para crear y personalizar tus propias photocards de NewJeans. Recorta, ajusta y exporta tus creaciones con facilidad.
- **🏠 Dashboard Dinámico**: Un hub centralizado para acceder rápidamente a todas las secciones del club.
- **💬 Foro de la Comunidad**: Espacio dedicado para que los fans interactúen y compartan noticias.
- **🎵 Sección de Música**: Reproductor y visualización de la discografía del grupo.
- **🛍️ Tienda y Coleccionables**: Explora merchandising y objetos virtuales.
- **🎮 Quiz Interactivo**: Descubre qué integrante de NewJeans eres con nuestro test personalizado.
- **👤 Perfiles de Usuario**: Personaliza tu identidad dentro del club con integración de Firebase.

## 🛠️ Stack Tecnológico

Este proyecto utiliza tecnologías de vanguardia para garantizar una experiencia fluida y moderna:

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Lógica**: [React 19](https://react.dev/) con TypeScript.
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/) (Diseño Neo-Brutalista).
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/) para micro-interacciones suaves.
- **Backend**: [Firebase](https://firebase.google.com/) para autenticación y base de datos en tiempo real.
- **Herramientas de Exportación**: `html2canvas`, `jspdf` y `modern-screenshot` para el generador de photocards.
- **Calidad de Código**: [Biome](https://biomejs.dev/) para linting y formateo ultrarrápido.

## 🚀 Instalación y Desarrollo

Sigue estos pasos para ejecutar el proyecto localmente:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/Yisuscrist72/bunnies-club.git
   cd bunnies-club
   ```

2. **Instala las dependencias**:
   ```bash
   pnpm install
   # o
   npm install
   ```

3. **Configura las variables de entorno**:
   Crea un archivo `.env.local` basado en `.env.local.example` y añade tus credenciales de Firebase.

4. **Inicia el servidor de desarrollo**:
   ```bash
   pnpm dev
   ```

5. **Abre el navegador**:
   Visita `http://localhost:3000` para ver el resultado.

## 📁 Estructura del Proyecto

```text
src/
├── app/          # Rutas y páginas principales (Editor, Foro, etc.)
├── components/   # Componentes siguiendo Atomic Design (Atoms, Molecules, Organisms)
├── context/      # Estados globales de la aplicación
├── lib/          # Utilidades y configuración de servicios (Firebase)
└── public/       # Recursos estáticos (Imágenes, fuentes, etc.)
```

## 📸 Capturas

*(Próximamente...)*

---

Desarrollado con ❤️ por un Bunny para Bunnies. 🐰✨
