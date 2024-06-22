# Entregable 8: Implementación del Sistema de Login

Este entregable se centra en ajustar nuestro servidor principal para trabajar con un sistema de login, así como en implementar funcionalidades adicionales como roles de usuario y logout. A continuación se detalla la implementación realizada:

## Implementación del Sistema de Login

Se han agregado las siguientes funcionalidades para el sistema de login:

- Se ha creado un formulario de login que permite a los usuarios autenticarse con su correo electrónico y contraseña.
- Se han implementado las rutas de router para procesar el registro y el login.
- Una vez completado el login con éxito, se realiza la redirección directamente a la vista de productos.

## Mensaje de Bienvenida en la Vista de Productos

En la vista de productos, se ha agregado un mensaje de bienvenida que muestra los datos del usuario autenticado. Esto proporciona una experiencia personalizada al usuario al acceder a la plataforma.

## Sistema de Roles

Se ha implementado un sistema de roles para distinguir entre usuarios regulares y administradores. Las características de los roles son las siguientes:

- Si el correo electrónico utilizado para el login es adminCoder@coder.com y la contraseña es adminCod3r123, se asignará al usuario de la sesión el rol de administrador.
- Todos los usuarios que no sean administradores tendrán el rol de "usuario".

## Implementación del Botón de Logout

Se ha añadido un botón de "logout" que permite a los usuarios cerrar sesión. Al hacer clic en este botón, la sesión del usuario se destruye y se redirige a la vista de login, proporcionando así una forma segura de salir de la plataforma.

Con estas implementaciones, nuestro servidor principal ahora es capaz de gestionar de manera segura el acceso de los usuarios, asignar roles y proporcionar una experiencia personalizada basada en el estado de autenticación.
