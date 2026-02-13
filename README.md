# My Investor Test 🏦

Este proyecto es una aplicación de gestión de inversiones construida con **Next.js**, enfocada en la mantenibilidad, escalabilidad y una experiencia de usuario fluida.

## 🚀 Cómo correr el proyecto localmente

Para comenzar a trabajar con el proyecto en tu entorno local, sigue estos pasos:

1. **Instalar dependencias:**

   ```bash
   npm install
   ```

2. **Ejecutar el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

   El proyecto estará disponible en [http://localhost:4000](http://localhost:4000).

3. **Construir para producción:**

   ```bash
   npm run build
   ```

4. **Iniciar en modo producción:**
   ```bash
   npm run start
   ```

## 🧪 Pruebas E2E (Playwright)

Para asegurar el correcto funcionamiento de los flujos críticos (Compra, Venta, Traspaso), se han implementado tests de extremo a extremo:

1. **Ejecutar todos los tests:**

   ```bash
   npm run test:e2e
   ```

2. **Ejecutar con interfaz de usuario (UI Mode):**
   ```bash
   npm run test:e2e:ui
   ```

## 🛠️ Decisiones técnicas tomadas

Para garantizar un código limpio y escalable, se han tomado las siguientes decisiones de arquitectura y herramientas:

- **Screaming Architecture:** La estructura del proyecto está organizada por funcionalidades (`features`), lo que permite que el propósito de la aplicación sea evidente desde el primer vistazo al sistema de archivos.
- **Atomic Design:** Implementado en la carpeta `components` (Atoms, Molecules, Organisms) para fomentar la reutilización de componentes y la consistencia visual.
- **Vanilla Extract:** Utilizado para el tipado de estilos en tiempo de compilación, ofreciendo la potencia de CSS-in-JS con rendimiento de CSS nativo.
- **React Hook Form:** Para una gestión eficiente y performante de los formularios.
- **TanStack Query (React Query):** Empleado para la gestión del estado de las peticiones asíncronas, facilitando el cacheo de datos y la implementación de actualizaciones optimistas (_optimistic updates_).

## ✨ Funcionalidades implementadas

La aplicación permite realizar las operaciones principales de un gestor de fondos:

- ✅ **Listado de fondos:** Visualización completa de los fondos disponibles.
- ✅ **Acción de comprar un fondo:** Flujo de adquisición de nuevos activos.
- ✅ **Detalle del portafolio:** Resumen detallado de las inversiones actuales.
- ✅ **Acción de vender un fondo:** Gestión de desinversión de activos.
- ✅ **Acción de traspasar un fondo:** Movimiento de capital entre diferentes fondos.

## 📈 Qué mejoraría con más tiempo

Aunque el núcleo de la aplicación es sólido, con más tiempo se podrían abordar los siguientes puntos:

- **Responsive Mobile-First:** Refinar la interfaz para asegurar una experiencia óptima en dispositivos móviles antes que en escritorio.
- **Accesibilidad (A11y):** Implementar mejoras siguiendo las pautas WCAG para asegurar que la aplicación sea utilizable por todos.
- **Testing Unitario:** Hacer los tests unitarios y mejorar los de integración para asegurar la robustez a largo plazo.
