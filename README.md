# Sales example for MEAN
## How to install?
This application is developed in Node JS 4+, before to run the application you need to do:

	npm install

## Requerimiento:

1. Desarrollar un front web en angular que permita:
	* Pantalla 1 - ABC de clientes
	* Pantalla 2 - ABC de productos
	* Pantalla 3 - Realizar venta de n productos (que se dan de alta) aun cliente (que se dio de alta)
    * Pantalla 4 - Resumen de ventas realizadas a cada cliente.

2. Desarrollar el Backend en node que contenga:
	* Los servicios necesarios para que las pantallas funcionen.

### Puntos a considerar
Para el examen tradicional pero con el enfoque en la utilización de un API escrita en Node:

* Los módulos del frontend (artículos, clientes, etc.) deben consumir los servicios del API para las operaciones ABC (altas, bajas y cambios) y otras que se requieran.

* El API puede estar montada local o remotamente en un servidor con S.O. que más le convenga.

### Características mínimas:

* El API solo puede tener respuestas JSON
* Utilizar los principios REST, donde las peticiones HTTP (get, post, put, delete) tienen un significado específico.
* Validar las peticiones y devolver los errores en el JSON de respuesta.

### Adicionales y deseables:

* Utilizar autenticación basada en tokens (ej.- oAuth2)
* Utilizar algún Framework
* Utilizar códigos de estado HTTP en las respuestas de la API (ej.- 200, 400, 404, etc)