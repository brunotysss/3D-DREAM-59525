# 📱 eCommerce App - React Native

¡Bienvenido a **eCommerce App**! 🚀  
Este proyecto es una aplicación móvil de comercio electrónico desarrollada con **React Native**, diseñada para ofrecer una experiencia de usuario fluida y optimizada en dispositivos móviles.

---

## 🛠️ Tecnologías utilizadas

- **React Native**: Framework principal para el desarrollo.
- **Expo**: Plataforma para el desarrollo rápido.
- **Redux Toolkit**: Para la gestión del estado global.
- **React Navigation**: Manejo de la navegación entre pantallas y pestañas.
- **Firebase Authentication**: Para registro e inicio de sesión.
- **Firebase Cloud Functions**: Para la geocodificación y otras funcionalidades en la nube.
- **Firebase Firestore**: Base de datos en tiempo real para almacenar datos.
- **Google Maps API**: Para visualización de mapas interactivos.

---

## 🚀 Características principales

- **Pantalla de Categorías**: Navega por productos organizados en diferentes categorías.
- **Catálogo de Productos**: Consulta una lista completa de productos con imágenes, descripciones y precios.
- **Detalle del Producto**: Visualiza información detallada de cada producto.
- **Carrito de Compras**: Añade, elimina y actualiza productos en tu carrito.
- **Historial de Pedidos**: Revisa tus compras realizadas en una pantalla dedicada.
- **Perfil de Usuario**: Gestiona y edita tu información personal.
- **Geocodificación**: Usa Cloud Functions de Firebase para obtener ubicaciones y direcciones.
- **Navegación por Pestañas**:
  - Pantalla principal del eCommerce.
  - Carrito de compras.
  - Historial de recibos.
  - Perfil del usuario.
  - Mapa interactivo.
- **Autenticación con Firebase**: Regístrate e inicia sesión usando Firebase Authentication.

---

## 📂 Estructura del proyecto

```plaintext
├── assets/                 # Recursos estáticos como imágenes e íconos
├── src/
│   ├── app/
│   │   └── store.js        # Configuración de Redux Toolkit
│   ├── components/         # Componentes reutilizables
│   ├── data/               # Datos estáticos o simulados
│   ├── db/                 # Conexión con Firestore
│   ├── hooks/              # Custom hooks
│   ├── navigation/         # Configuración de React Navigation
│   ├── screens/            # Pantallas principales
│   │   ├── auth/           # Pantallas de autenticación (Login y Registro)
│   │   ├── my-places/      # Pantallas como productos, carrito, recibos
│   ├── services/           # Lógica para Firebase y funciones externas
│   ├── utils/              # Funciones y helpers reutilizables
│   ├── validations/        # Esquemas de validación
├── App.js                  # Punto de entrada principal
├── package.json            # Dependencias del proyecto
└── .env                    # Variables de entorno (API keys, etc.)
