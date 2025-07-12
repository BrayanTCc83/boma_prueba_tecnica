# BOMA Prueba Técnica
Mi prueba técnica para desarrollador full stack en BOMA.

# Database
Dentro de la carpeta database se encuentran 2 archivos SQL, [tables.sql](./database/tables.sql) y [users.sql](./database/users.sql). El primero crea las tablas necesarias para el funcionamiento de la aplicación, en este caso users, mientras que el segundo contiene ejemplos de usuarios generados aleatoriamente vía [mockaroo](https://www.mockaroo.com) para poder realizar las pruebas del funcionamiento de la aplicación.

> [!Important]
> La implementación está realizada en PostgreSQL, así que es necesario tenerlo instalado antes de continuar.

Para ejecutar los comandos puede usarse la terminal con el cliente de psql o bien desde la interfaz de PgAdmin4, es necesario crear la base de datos y ejecutar posteriormente ambos scripts.

> createdb -U postgres boma_prueba

Con este comando creamos la base de datos desde la terminal.

> createdb -U postgres -h localhost -p 5432 boma_prueba

Con este segundo lo que hacemos es conectarnos a la base de datos (para probar que haya sido correcta la creación).

> psql -U postgres -d boma_prueba -f tables.sql
>
> psql -U postgres -d boma_prueba -f users.sql

Finalmente estos dos comandos permiten realizar la creación de las tablas y la inserción de los datos de prueba.

# Backend
Para ejecutar el backend es necesario configurar el proyecto correctamente. Para ello, desde la terminal dirijase a la carpeta de backend y:

1) __Configure:__ el archivo de variables de entorno _.env_ necesario para el correcto funcionamiento del proyecto, la configuración recomendada es la siguiente:

> PORT=3000
>
> SITE=http://localhost:3001 o la url del frontend
>
> TOKEN_SECRET=ccb7047b961d4fb9ea1045a29b5a74a37032ba42ca14e91fb675912190c57472e32a8c7d846aabfbea0210938d3bd1d920b1de4927722fb3a197d9c409f63211
>
> PG_HOST=host
>
> PG_PORT=puerto
>
> PG_USER=usuario de postgresql
>
> PG_PASSWORD=contraseña
>
> PG_DATABASE=nombre de la base de datos

2) __Ejecute:__
> npm install

Permite instalar todas las dependencias necesarias (asumiendo que estamos en modo de desarrollo).

3) __Ejecute:__
> npm run dev

Inicia el servidor en modo de desarrollo con las configuraciones indicadas en el archivo _.env_, abriendolo en el puerto específicado en este archivo.

> [!Important]
> Para hacer pruebas es posible acceder a la suite de [postman](https://lua888-2766.postman.co/workspace/Team-Workspace~bcb10a78-cf52-47c2-85b3-d2a40895c01c/collection/31846549-b6c0fe21-6586-4c19-bdc0-b89089e4b616?action=share&creator=31846549&active-environment=31846549-ddc78465-772f-4b9d-8b2d-c7dec2153b59) donde esta toda la configuración o importar la colección desde la carpeta de database.

# Frontend
Para ejecutar el frontend es necesario configurar el proyecto correctamente. Para ello, desde la terminal dirijase a la carpeta de frontend y:

1) __Configure:__ el archivo de variables de entorno _.env_ necesario para el correcto funcionamiento del proyecto, la configuración recomendada es la siguiente:

> VITE_PORT=3001
>
> VITE_API_URL=http://localhost:300

2) __Ejecute:__
> npm install

Permite instalar todas las dependencias necesarias (asumiendo que estamos en modo de desarrollo).

3) __Ejecute:__
> npm run dev

Inicia el servidor en modo de desarrollo con las configuraciones indicadas en el archivo _.env_, abriendolo en el puerto específicado en este archivo.

> [!Note]
> Sí desea solamente instalar dependencias de producción agregue la flag __--omit=dev__ en los comandos de instalación:
>
> npm install --omit=dev