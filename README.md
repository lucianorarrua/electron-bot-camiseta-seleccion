# Bot camiseta de 3 estrellas

El proyecto fué generado utilizando [Electron React Boilerplate](https://electron-react-boilerplate.js.org/).
Este bot está desarrollado en [Electron](https://www.electronjs.org/). 
La interfaz está desarrollada en [React](https://reactjs.org) con [chakra](https://chakra-ui.com/).

## ¿Que hace?

Cada cierto tiempo consulta la API de adidas para ver si hay disponibilidad de la camiseta. 

Una barra era decrementando hasta llegar a cero, en ese momento realizará una consulta.

Si no hay disponibilidad, no muestra nada.

En caso que exista disponibilidad de los talles de interés, comenzará a emitir un sonido y mostrará en pantalla los detalles para cada variante disponible.

### Requisitos

1. [Node.js](https://nodejs.org/en/) 

### ¿Como levantar el bot en desarrollo?

1. Instalar dependencias con `npm i`.
2. Ejecutar
```bash
npm start
```

## ¿Como genero un ejecutable?

Ejecutar
```bash
npm run package
```

Esto creará un ejecutable dentro de la carpeta `release/build` en la raíz del proyecto.
