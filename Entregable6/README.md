# Entregable6: Integración de WebSocket, Handlebars y MongoDB

Este sexto entregable del curso de Backend se centra en la integración de WebSocket, Handlebars y MongoDB en un servidor Node.js utilizando Express. Además de las funcionalidades previamente establecidas, este proyecto ha sido extendido para incluir la lógica de persistencia de datos utilizando MongoDB y Mongoose, así como la implementación de un chat en tiempo real que guarda sus mensajes en la base de datos.

## Configuración del servidor

El servidor se configura para integrar el motor de plantillas Handlebars y se instala un servidor de Socket.io para habilitar la comunicación en tiempo real. Además, se implementa la lógica necesaria para la conexión y manejo de la base de datos MongoDB utilizando Mongoose.

## Modelo de persistencia de Mongo y Mongoose

Se agrega el modelo de persistencia de Mongo y Mongoose al proyecto, creando una base de datos llamada "ecommerce" en MongoDB Atlas y sus respectivas colecciones: "carts", "messages" y "products", junto con sus esquemas correspondientes. Se crea una carpeta "models" para albergar estos esquemas, siguiendo la estructura establecida en la clase.

## Vista "home.handlebars" y "realTimeProducts.handlebars"

Las vistas previamente establecidas, "home.handlebars" y "realTimeProducts.handlebars", se mantienen y se actualizan según sea necesario para integrar la lógica de persistencia de datos utilizando MongoDB y Mongoose.

## Implementación del chat en tiempo real

Se añade una nueva vista en Handlebars llamada "chat.handlebars", que permite la implementación de un chat en tiempo real. Los mensajes enviados a través del chat se guardan en la colección "messages" de MongoDB en el formato {user: correoDelUsuario, message: mensaje del usuario}, utilizando la lógica implementada con Mongoose.

## Actualización en tiempo real del chat

Gracias a la integración de WebSocket, los mensajes enviados en el chat se actualizan dinámicamente en la vista "chat.handlebars" sin necesidad de recargar la página, proporcionando una experiencia de chat en tiempo real.

## Corroboración de la integridad del proyecto

Se asegura que todas las funcionalidades del proyecto, incluyendo la gestión de productos, el chat en tiempo real y la persistencia de datos en MongoDB, funcionen correctamente y mantengan la coherencia y estabilidad del sistema.

