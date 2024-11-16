# Backend II - Proyecto final

## Pre-entrega 1

Para esta pre-entrega desarrollé la lógica de un ecommerce (centrado en autorización y autenticación de usuarios). Se utilizaron tecnologías como bcrypt, JWT y Passport, entre otras.
Para iniciar la aplicación:

    Clonar el repositorio
    Crear archivo .env y completar con la info correspondiente (provista en la plataforma)
    Instalar dependencias 
    npm i
    Ejecutar la app
    npm run dev
    El servidor se levantará en el puerto 8080
    Ejecutar los endpoints en postman y/o navegador

### Estrategias de Passport:
**Register y login:**
Para el registro de usuario utilicé la estrategia de terceros con *Google* como proveedor de *credenciales*. En este caso si el usuario no existe creará uno en la base de datos. Si el usuario existe nos retornará los datos del usuario.
También implementé una estrategia local que recibe el email y password del usuario.
**JWT**:
Para mantener la sesión implementé la estrategia de *JWT* que guardará en una *cookie* los datos del usuario y que serán enviados en las peticiones próximas al servidor.

### Endpoints utilizados
**/register**
Este endpoint utiliza la estrategia local de passport para registrar usuario. Deberá incluirse la información del usuario en el *body* de la petición. Por ej:

    {
    
    "first_name":"userTest1",
    
    "last_name":"userTest1",
    
    "email":"userTest1@test.com",
    
    "password":"1233",
    
    "age":30,
    
    "role":"user"
    
    }

**/login**
Este endpoint utiliza la estrategia local de login configurada en Passport. Deberá proveerse el emai y la contraseña en el cuerpo de la petición. Ej:

    {
    
    "email":"userTest1@test.com",
    
    "password":"1233"
    
    }
**/logout**
Este endpoint *terminará* con la *sesión del usuario*. Cuando es llamado, tomará la cookie donde se almacena el *token del usuario* y la elimina.
**/current**
Este endpoint lee el *JWT* almacenado en la *cookie* y nos retorna los *datos del usuario*. Para este endpoint implementé un middleware de autorización. Si se ejecuta con un usuario de rol "admin", no se autorizará y saldrá error. Si el usuario es de categoria "user", entonces devolverá un estado 200 y el contenido.
**/google**
Este endpoint se recomienda ejecutarse en el navegador ya que redirigirá al sistema de inicio de sesión provisto por Google. Si el usuario no existe, se creará uno en la base de datos, pero si ya está registrado se retornarán los datos del usuario.