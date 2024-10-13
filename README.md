# Galton Board Frontend

Este proyecto es el frontend de una aplicación React que visualiza el comportamiento de un **Galton Board**, el cual es simulado y gestionado en el backend. La aplicación frontend se comunica con el backend para obtener el estado actual de las simulaciones y mostrar la distribución de bolas en los contenedores en tiempo real.

## Tecnologías Utilizadas

- **React**: Framework de JavaScript para la construcción de interfaces de usuario.
- **Webpack**: Empaquetador de módulos que compila el código de React.
- **Babel**: Compilador de JavaScript que permite usar la sintaxis moderna de ES6+ y JSX.
- **Styled Components**: Para manejar estilos en componentes de React.
- **Axios**: Cliente HTTP para realizar solicitudes al backend.
- **React Router DOM**: Para manejar el enrutamiento dentro de la aplicación React.
- **Chart.js** y **React-Chartjs-2**: Para visualizar gráficas de los datos del Galton Board.

## Requisitos

Para ejecutar el frontend necesitas tener instalados:

- **Node.js** (versión recomendada: 14+)
- **npm** (gestor de paquetes incluido con Node.js)

## Instalación

1. Clona el repositorio del frontend en tu máquina local:
   
   ```bash
   git clone https://github.com/tu-usuario/frontend-galton.git

## Estructura del Proyecto
- **src/**: Contiene el código fuente del proyecto.
- **components/**: Componentes reutilizables de React, como la visualización de la distribución.
- **pages/**: Páginas principales de la aplicación.
- **services/**: Funciones para interactuar con la API, como las llamadas a Axios para obtener los datos del backend.
- **App.js**: Punto de entrada principal de la aplicación React.
- **index.js**: Archivo de arranque de la aplicación que renderiza el componente raíz en el DOM.

##  Relación entre Frontend y Backend 
### Backend 
El backend, desarrollado en Spring Boot, expone una API REST que proporciona la información de las simulaciones del Galton Board. Cada simulación tiene un estado (en proceso o finalizada) y una distribución actual de las bolas en los contenedores.

### Frontend
El frontend, construido con React, consume la API para obtener el estado y los datos de distribución de las simulaciones. Los datos se representan visualmente en la interfaz usando componentes personalizados como DistribucionTexto.
