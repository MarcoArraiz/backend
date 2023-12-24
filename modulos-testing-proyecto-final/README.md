# **Módulos de testing para proyecto final**
### Premisas
- [x]Se implementó el script usersupertest que hace testing de las siguientes funciones:
    1. ruta api/users metodo post
    2. solicitar datos de usuarios mediante GET en /users/email/:email
    3. actualizar usuario mediante PUT en /users/:id
    4. iniciar sesion con post a traves de /sessions/login.
    5. consultar datos de usuario a traves de GET en sessions/current
    6. eliminar usuario mediante DELETE en /users/:id

- [x]Se implementó el script productssupertest que hace testing de las siguientes funciones:
    1. iniciar sesion con post a traves de /sessions/login
    2.crear un producto mediante post
    3. actualizar producto mediante PUT en /products/:id
    4. obtener un producto por id
    5.Eliminar el producto creado con DELETE en /products/:id

- [x]Se implementó el script cartssupertest que hace testing de las siguientes funciones:
    1. crear un cart mediante post
    2. agregar un producto a un cart mediante PUT en /carts/:cid/products/:pid
    3. eliminar cart mediante DELETE en /carts/:id

# **Documentar API**

✓ Se implementó Swagger para disonibilizar en el endpoint http://localhost:4000/apidocs/#/ la documentación de las rutas de API Carts, Users, Products y Sessions