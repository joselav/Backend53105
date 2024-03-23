# Segunda Entrega - Entregable 7: Seguimiento de Requerimientos Específicos

Este segundo entregable del Entregable 7 se enfoca en cumplir con las nuevas consignas establecidas, las cuales incluyen la modificación del método GET / para permitir consultas avanzadas de productos, así como la implementación de nuevos endpoints en el router de carts. A continuación se detalla la implementación realizada:

## Modificación del método GET /

El método GET / ahora permite recibir parámetros opcionales en la consulta para realizar búsquedas más avanzadas y obtener resultados paginados. Los parámetros incluyen limit, page, sort y query, permitiendo así la personalización de la consulta de productos. Se puede buscar por categoría o disponibilidad, y se puede ordenar ascendente o descendentemente por precio.

El objeto devuelto por este método sigue un formato específico que incluye información sobre el estado de la solicitud, los productos solicitados, el total de páginas disponibles, así como enlaces directos a la página anterior y siguiente cuando corresponda.

## Implementación de nuevos endpoints en el router de carts

Se agregan nuevos endpoints al router de carts para mejorar la gestión de carritos. Estos incluyen:

- DELETE api/carts/:cid/products/:pid: Elimina un producto específico del carrito.
- PUT api/carts/:cid: Actualiza el carrito con un arreglo de productos.
- PUT api/carts/:cid/products/:pid: Actualiza la cantidad de ejemplares de un producto en el carrito.
- DELETE api/carts/:cid: Elimina todos los productos del carrito.

Para el modelo de Carts, se modifica la propiedad products para que los IDs de los productos hagan referencia al modelo de Products. Además, se ajusta la ruta /:cid para que al traer todos los productos, se incluyan los detalles completos mediante un "populate".

## Creación de nuevas vistas

Se crea una vista en el router de views '/products' para visualizar todos los productos con su respectiva paginación. Cada producto mostrado ofrece la opción de ver más detalles o agregarlo directamente al carrito. Además, se agrega una vista en '/carts/:cid' para visualizar un carrito específico, mostrando solo los productos que pertenecen a dicho carrito.

