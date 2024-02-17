# Entregable 3 - Desarrollo de Servidor Express

Este tercer entregable se enfoca en el desarrollo de un servidor basado en Express para gestionar consultas a un archivo de productos utilizando la clase ProductManager con persistencia de archivos. A continuación se detallan los aspectos implementados:

## Desarrollo del Servidor Express

El servidor Express se encuentra implementado en el archivo `app.js`, el cual importa la clase `ProductManager` existente para interactuar con el archivo de productos.

### Estructura del Proyecto

El proyecto sigue la siguiente estructura de carpetas:


- **controllers:** Contiene la clase `ProductManager.js`, la cual se encarga de gestionar la lógica relacionada con los productos.

- **models:** Contiene el archivo `products.json`, el cual almacena los datos de los productos.

### Endpoints Implementados:

- **Ruta `/products`:** Esta ruta permite leer el archivo de productos (`products.json`) ubicado en `src/models/`, utilizando la clase `ProductManager` ubicada en `src/controllers/`. Devuelve los productos dentro de un objeto, con la posibilidad de especificar un límite de resultados mediante el parámetro de consulta `limit`.

- **Ruta `/products/:pid`:** Esta ruta recibe el parámetro `pid` (product Id) a través de `req.params`, y devuelve únicamente el producto solicitado en lugar de todos los productos.

## Aspectos a tener en cuenta

- Se ha utilizado la clase `ProductManager` ubicada en `src/controllers/` para gestionar los productos con persistencia de archivos.
- Los productos se encuentran almacenados en el archivo `products.json` ubicado en `src/models/`.
- El servidor Express implementado proporciona endpoints para consultar los productos de manera eficiente y precisa.
- La implementación de estos endpoints garantiza una gestión adecuada de los productos y una respuesta acorde a las solicitudes realizadas por los clientes.

## Uso del Servidor Express

Para ejecutar el servidor Express y comenzar a gestionar consultas a los productos, se debe ejecutar el archivo `app.js` utilizando Node.js. Una vez iniciado el servidor, se puede acceder a los endpoints mencionados para interactuar con los datos de los productos.

## Conclusiones

El desarrollo de este servidor Express amplía las capacidades de la clase `ProductManager`, permitiendo una interacción más dinámica y flexible con los datos de productos mediante endpoints específicos. Esto facilita la integración del backend con aplicaciones cliente y mejora la experiencia general del usuario al interactuar con la plataforma.
