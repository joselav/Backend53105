# Entregable 9: Implementación del Sistema de Autenticación

Este entregable se centra en la implementación de un sistema de autenticación, incluyendo el hasheo de contraseñas utilizando bcrypt, la integración de Passport para gestionar el registro y el login, así como la adición del método de autenticación de GitHub a la vista de login. 

A continuación se detallan las implementaciones realizadas:

## Hasheo de Contraseñas con Bcrypt

Se ha implementado el hasheo de contraseñas utilizando la biblioteca bcrypt. Este proceso garantiza que las contraseñas de los usuarios se almacenen de forma segura en la base de datos, protegiendo así la información confidencial de los usuarios contra posibles ataques.

## Implementación de Passport

Se ha integrado Passport, una biblioteca de autenticación para Node.js, tanto para el registro como para el login de los usuarios. Las funcionalidades implementadas son las siguientes:

- **Registro:** Se ha creado una estrategia local de Passport para permitir que los usuarios se registren utilizando su correo electrónico y contraseña. Se ha realizado el hasheo de la contraseña antes de almacenarla en la base de datos.
- **Login:** Se ha configurado una estrategia local de Passport para permitir que los usuarios inicien sesión utilizando su correo electrónico y contraseña. Se ha verificado el hasheo de la contraseña almacenada en la base de datos antes de permitir el acceso.
- **Autenticación de GitHub:** Se ha agregado una estrategia de Passport para permitir que los usuarios inicien sesión utilizando su cuenta de GitHub. Al autenticarse con GitHub, se recopilan los datos básicos del perfil del usuario y se crea una cuenta si aún no existe.

## Integración del Método de Autenticación de GitHub
