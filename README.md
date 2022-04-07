# Rest API Adeudos
---
## Problema a resolver
La comunidad de "El palomar " queriere saber cual es el adeudo de Administracion por domicilio, esto se expresa de manera anual en una vista de una aplicación y un sitio web. Este microservicio debe pintar el Mes, Monto del Adeudo y Estado [Pendiente, Pagado, Atrasado]. Los usuarios pueden ver varios meses al mismo tiempo. 

#### Casos de uso
* Los usuarios podrán registrarse y acceder a sus sesiones en la api.
* Los usuarios podrán consultar los adeudos relacionados a sus cuentas.

---
## Iniciar proyecto
Para iniciar el proyecto en su computador es necesario que tenga instalado [docker](http://https://www.docker.com/get-started/ "docker") y [docker compose](https://docs.docker.com/compose/install/ "docker compose"); 20.10.14 es la versión de docker sobre las que se crearon las imagenes. 

Seguido de eso, se moverá al directorio del repositorio y ejecutará los siguientes comandos para construir las imagenes del servicio principal y el micro servicio:

Del servicio maestro:

`docker build -t node-mc-dev -f build/development.Dockerfile .`

Del micro servicio:

`docker build -t node-mc-dev -f build/mc.dev.Dockerfile .`

Por último sólo deberá ejecutar docker compose:

`docker-compose up`

Y listo, ahora tiene la aplicación escuchando en `http://localhost:3000/`

---

## Documentación
La documentación de la rest api puede ser consultada desde el mismo proyecto en la ruta:
`http://localhost:3000/api-docs/`

---
## Arquitectura
El proyecto cuenta con dos servicios, con sus respectivas bases de datos en mongoDB. El servicio *app* , es el servicio maestro. Este se encarga de la autenticación y registro de usuarios. El microservicio *microservice*  es el encargado de crear y listar adeudos; depende del servicio maestro.

```yaml
services:
    app: 
        image: node-app-dev
        environment:
            - API_PORT=3000
            - MONGO_URL=mongodb://db:27017/appStorage
            - JWT_SECRET=123123
            - MC_URL=http://microservice:3001
        depends_on:
            - db
            - microservice
        ports:
            - "3000:3000"
        volumes:
            - .:/usr/src
    db:
        image: mongo:4.4.13

    microservice:
        image: node-mc-dev
        environment:
            - PORT=3001
            - MONGO_URL=mongodb://microservice-db:27017/debts
            - JWT_SECRET=123123
        depends_on:
            - microservice-db
        volumes:
            - ./debts-microservice:/usr/src
    microservice-db:
        image: mongo:4.4.13
```
