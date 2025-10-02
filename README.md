# 🌳 Parques AR - Aplicación Web Interactiva

Una aplicación web moderna que permite explorar los parques del pueblo con tecnología de realidad aumentada.

## 🚀 Características

### 📱 Tres Pantallas Principales

1. **Pantalla de Inicio**
   - Interfaz de bienvenida con animaciones
   - Botón para cargar el sistema
   - Información sobre las características de la app

2. **Mapa Interactivo del Pueblo**
   - Mapa personalizado con vista aérea
   - 3 parques disponibles: Principal, Santafé y Recreativo
   - Marcadores interactivos con información emergente
   - Navegación intuitiva entre parques

3. **Detalles del Parque con Tótem 3D**
   - Información detallada de cada parque
   - Tótem 3D interactivo renderizado con Three.js
   - Funcionalidad de Realidad Aumentada
   - Simulación de cámara AR para escanear tótems físicos

### 🎯 Funcionalidades de AR

- **Activación de Cámara AR**: Botón para activar la experiencia de realidad aumentada
- **Interfaz de Escaneo**: Simulación de cámara con visor para localizar tótems físicos
- **Experiencia Inmersiva**: Los usuarios pueden "escanear" los tótems físicos en los parques reales

## 🛠️ Tecnologías Utilizadas

- **React 19.2.0**: Framework principal
- **React Router DOM**: Navegación entre pantallas
- **Three.js**: Renderizado 3D de los tótems
- **@react-three/fiber**: Integración de Three.js con React
- **@react-three/drei**: Componentes y utilidades 3D adicionales
- **CSS3**: Animaciones y estilos modernos con gradientes y efectos

## 🎨 Diseño y UX

- **Diseño Responsive**: Adaptable a dispositivos móviles y desktop
- **Animaciones Fluidas**: Transiciones suaves entre pantallas
- **Interfaz Moderna**: Gradientes, efectos de cristal (glassmorphism) y sombras
- **Accesibilidad**: Controles intuitivos y navegación clara

## 📦 Instalación y Uso

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd parques-ar-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar la aplicación**
   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   - La aplicación se abrirá automáticamente en `http://localhost:3000`

## 🗺️ Navegación de la Aplicación

### Flujo de Usuario

1. **Inicio** (`/`)
   - Pantalla de bienvenida
   - Clic en "ENTRAR AL SISTEMA" → Navega al mapa

2. **Mapa** (`/mapa`)
   - Visualización del pueblo con 3 parques
   - Clic en cualquier parque → Navega a detalles del parque

3. **Detalles del Parque** (`/parque/:parqueId`)
   - Información completa del parque
   - Tótem 3D interactivo
   - Botón "ACTIVAR REALIDAD AUMENTADA" → Abre simulador AR

### Parques Disponibles

- **Parque Principal** (`/parque/principal`)
  - 🌳 Más de 100 árboles centenarios
  - 🦋 Jardín de mariposas nativo
  - 🏃‍♂️ Senderos para caminar y trotar

- **Parque Santafé** (`/parque/santafe`)
  - 🌹 Jardín de rosas premiado
  - 🧘‍♀️ Área de yoga y meditación
  - 🦆 Laguna con patos y peces

- **Parque Recreativo** (`/parque/recreativo`)
  - ⚽ Canchas de fútbol y básquet
  - 🏊‍♂️ Piscina olímpica
  - 🎢 Juegos mecánicos

## 🎮 Controles del Tótem 3D

- **Rotar**: Arrastra con el mouse
- **Zoom**: Usa la rueda del mouse
- **Vista**: El tótem se puede observar desde todos los ángulos

## 📱 Funcionalidad AR

La aplicación simula una experiencia de realidad aumentada:

1. **Activación**: Toca el botón "ACTIVAR REALIDAD AUMENTADA"
2. **Simulación de Cámara**: Se abre una interfaz que simula la cámara del dispositivo
3. **Visor AR**: Muestra un visor con esquinas verdes para localizar el tótem
4. **Instrucciones**: Guía al usuario para apuntar hacia el tótem físico
5. **Experiencia Real**: En un entorno real, esto activaría la cámara para escanear tótems físicos

## 🎯 Concepto de Implementación Real

Esta aplicación está diseñada para funcionar con tótems físicos reales en los parques:

- Los tótems mostrados en 3D representan estructuras físicas que estarían instaladas en cada parque
- La funcionalidad AR permitiría escanear estos tótems reales con la cámara del dispositivo
- Al escanear, se mostrarían experiencias de realidad aumentada superpuestas sobre el tótem físico

## 🚀 Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm test`: Ejecuta las pruebas
- `npm run eject`: Expone la configuración de webpack (irreversible)

## 📱 Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge (versiones modernas)
- **Dispositivos**: Desktop, tablet y móvil
- **Resoluciones**: Responsive design desde 320px hasta 1920px+

## 🎨 Personalización

La aplicación es fácilmente personalizable:

- **Colores**: Modifica las variables CSS en los archivos de estilos
- **Parques**: Agrega nuevos parques editando el array en `ParkDetailScreen.js`
- **Tótems 3D**: Personaliza los modelos 3D en el componente `Totem3D`
- **Contenido**: Actualiza textos, imágenes y descripciones según tus necesidades

¡Disfruta explorando los parques con tecnología AR! 🌳📱✨