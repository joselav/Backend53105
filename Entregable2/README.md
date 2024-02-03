## Entregable 2 - Curso de Backend

Este segundo entregable del curso de Backend implementa la clase `ProductManager`, diseñada para gestionar múltiples productos y administrarlos en persistencia de archivos utilizando FileSystem, siguiendo las siguientes consignas:

### Funcionalidades Implementadas:

1. **Clase ProductManager**: Se ha creado una clase denominada `ProductManager` que facilita la gestión de productos en un archivo utilizando FileSystem.

2. **Persistencia de archivos**: La clase `ProductManager` maneja la persistencia de productos utilizando FileSystem. Se proporciona una ruta de archivo en el constructor (`this.path`) para especificar la ubicación del archivo de datos.

3. **Formato de objetos**: Los objetos de producto se guardan en el archivo en un formato específico, incluyendo propiedades como `id`, `title`, `description`, `price`, `thumbnail`, `code`, y `stock`.

4. **Método `addProduct`**: Permite agregar un nuevo producto al archivo de datos, asignándole un `id` autoincrementable.

5. **Método `getProducts`**: Permite leer el archivo de productos y devolver todos los productos en formato de arreglo.

6. **Método `getProductById`**: Permite buscar un producto por su `id` en el archivo de datos y devolverlo en formato objeto.

7. **Método `updateProduct`**: Permite actualizar un producto existente en el archivo de datos, manteniendo su `id` intacto.

8. **Método `deleteProduct`**: Permite eliminar un producto por su `id` del archivo de datos.

### Implementación con FileSystem:

La clase `ProductManager` ha sido diseñada para gestionar productos de manera eficiente utilizando FileSystem. Esto permite una persistencia de datos confiable y escalable, garantizando una gestión adecuada de los productos en un entorno de aplicación real.

