# README - Entregable #1 - Curso de Backend

## Descripción

Este proyecto corresponde al primer entregable del curso de Backend en la comisión número #53105. En este entregable, se debe crear una clase `ProductManager` que gestione un conjunto de productos según las siguientes especificaciones:

## Especificaciones

- La clase `ProductManager` debe gestionar un conjunto de productos.
- El constructor de la clase debe inicializar la propiedad `products` como un arreglo vacío.
- Cada producto gestionado debe tener las siguientes propiedades obligatorias:
  - `title`
  - `description`
  - `price`
  - `thumbnail`
  - `code` (no debe repetirse)
  - `stock`
- La clase debe tener un método `addProduct` que:
  - Agregue un producto al arreglo `products`.
  - Verifique que el código del producto no se repita y que todos los campos obligatorios estén presentes.
  - Incremente automáticamente el id del producto.
- La clase debe tener un método `getProducts` que devuelva todos los productos creados hasta el momento.
- La clase debe tener un método `getProductById` que:
  - Busque en el arreglo de productos el producto que coincida con el id ingresado.
  - En caso de no coincidir con ningún producto, muestre un mensaje de error "NotFound" en la consola.

## Uso

Para utilizar la clase `ProductManager`, sigue estos pasos:

1. Crea una instancia de la clase `ProductManager`.
2. Utiliza el método `addProduct` para agregar productos.
3. Utiliza el método `getProducts` para obtener todos los productos.
4. Utiliza el método `getProductById` para buscar un producto por su id.