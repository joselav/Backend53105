# Entregable 4 - Desarrollo de Servidor Node.js y Express

Este cuarto entregable del curso de Backend consiste en el desarrollo de un servidor basado en Node.js y Express que escuche en el puerto 8080 y disponga de dos grupos de rutas: `/products` y `/carts`. Cada grupo de rutas estará implementado con el router de Express y seguirá las siguientes especificaciones:

## Grupo de Rutas `/products`

El manejo de productos estará configurado en el router `/api/products/` con las siguientes rutas:

- **Ruta GET `/`:** Esta ruta lista todos los productos de la base, incluyendo la limitación proporcionada por el parámetro de consulta `limit`.

- **Ruta GET `/:pid`:** Esta ruta trae solo el producto con el id proporcionado.

- **Ruta POST `/`:** Esta ruta agrega un nuevo producto con los siguientes campos:
  - `id`: Número o Cadena (autogenerado)
  - `title`: Cadena
  - `description`: Cadena
  - `code`: Cadena
  - `price`: Número
  - `status`: Booleano (true por defecto)
  - `stock`: Número
  - `category`: Cadena
  - `thumbnails`: Array de Cadenas (rutas de imágenes)
  (Nota: Todos los campos son obligatorios excepto `thumbnails`)

- **Ruta PUT `/:pid`:** Esta ruta actualiza un producto por los campos enviados desde el cuerpo de la solicitud, manteniendo el `id` intacto.

- **Ruta DELETE `/:pid`:** Esta ruta elimina el producto con el id indicado.

## Grupo de Rutas `/carts`

El manejo de carritos estará configurado en el router `/api/carts/` con las siguientes rutas:

- **Ruta POST `/`:** Esta ruta crea un nuevo carrito con la siguiente estructura:
  - `Id`: Número o Cadena (autogenerado)
  - `products`: Array que contiene objetos representando cada producto.

- **Ruta GET `/:cid`:** Esta ruta lista los productos que pertenecen al carrito con el parámetro `cid` proporcionado.

- **Ruta POST `/:cid/product/:pid`:** Esta ruta agrega el producto al arreglo `products` del carrito seleccionado, incrementando el campo `quantity` si el producto ya existe en el carrito.

---

Este entregable amplía las capacidades del servidor al permitir la gestión de productos y carritos con múltiples operaciones CRUD definidas en las rutas especificadas.

