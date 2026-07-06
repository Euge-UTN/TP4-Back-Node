## TP4 - Back Node: Registros de gastos

## Descripción

Este trabajo práctico consiste en el desarrollo de una API REST utilizando Node.js y Express para gestionar un registro de gastos personales. La aplicación permite consultar, agregar, modificar y eliminar gastos, además de obtener el listado de categorías disponibles y realizar búsquedas por categoría.
Los datos se almacenan en memoria mediante arrays, por lo que no se utiliza una base de datos. 

## Funcionalidades

La API permite obtener el listado completo de gastos, consultar un gasto por su ID, agregar nuevos gastos, modificar gastos existentes y eliminarlos. También permite filtrar los gastos por categoría y obtener un resumen con el total gastado y el gasto de mayor monto. Además, cuenta con un endpoint para consultar todas las categorías disponibles.

Al agregar un gasto se realizan distintas validaciones. Se verifica que los campos **descripcion** y **monto** estén presentes, que el monto sea un número mayor a cero, que la categoría exista y, en caso contrario, se asigna automáticamente la categoría **"Otro"**. También se genera un ID único para cada gasto y, si no se envía una fecha, se asigna la fecha actual.
Si se intenta acceder a una ruta que no existe, la API responde con un error 404 en formato JSON.

## Ejecución del proyecto

Para ejecutar la aplicación es necesario instalar las dependencias con:

```bash
npm install
```

Luego el servidor puede iniciarse con:

```bash
npm start
```

o, si se desea utilizar Nodemon para reiniciar automáticamente el servidor ante cambios en el código:

```bash
npm run dev
```

El servidor se ejecuta en el puerto definido en el archivo `.env` o, en caso de no existir, utiliza el puerto 3001.

## Conceptos aplicados

En este trabajo se aplicaron los siguientes conceptos: la creación de un servidor con Express, el uso de Express Router para organizar las rutas, la utilización de middleware como `express.json()`, `morgan`, `cors` y `dotenv`, el manejo de requests y responses, la implementación de una API REST, el uso de códigos de estado HTTP y la validación de datos recibidos en las peticiones.
