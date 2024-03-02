# Entregable5 WebSocket y Handlebars

Este quinto entregable del curso de Backend se enfoca en la integración de WebSocket y Handlebars en un servidor Node.js utilizando Express. La aplicación implementa las siguientes funcionalidades:

## Configuración del servidor

El servidor se configura para integrar el motor de plantillas Handlebars y se instala un servidor de Socket.io para habilitar la comunicación en tiempo real.

## Vista "home.handlebars"

Se crea una vista llamada "home.handlebars" que muestra una lista de todos los productos agregados hasta el momento.

## Vista "realTimeProducts.handlebars"

Se implementa una vista denominada "realTimeProducts.handlebars", accesible a través de la ruta "/realtimeproducts" en el router de vistas. Esta vista también muestra una lista de productos, pero utiliza websockets para actualizar automáticamente la lista cada vez que se crea o elimina un producto.

## Actualización en tiempo real

Gracias a la implementación de websockets, la lista de productos en la vista "realTimeProducts.handlebars" se actualiza dinámicamente cada vez que se realiza una acción de creación o eliminación de productos.

## Integración con HTTP y Websockets

Se proporciona un formulario simple en la vista "realTimeProducts.handlebars" para la creación y eliminación de productos. Este formulario permite enviar contenido a través de websockets en lugar de HTTP, asegurando una actualización en tiempo real de la lista de productos.

---

Este entregable cumple con las consignas establecidas al configurar adecuadamente el servidor, implementar las vistas requeridas y asegurar la actualización en tiempo real de la lista de productos utilizando websockets.
