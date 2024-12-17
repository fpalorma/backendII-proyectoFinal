# Backend II - Proyecto final

## Entrega final

### Modificaciones:

 - Se creó el elemento ticket, que contiene un id creado por Mongo, un code generado con la libreria uuid, purchase_datetime paara indicar el momento de la compra, amount para calcular la cantidad y purchaser que contiene la información del cliente que realizó la compra.
 - Se crearon los DTO para manejar datos de productos y de usuarios evitando enviar información sensible o innecesaria al cliente.
 - Se implementó el middleware de auth para evitar que los usuarios que no tengan el rango de administrador pudieran editar, crear o eliminar productos. Ahora solo el usuario podrá agregar productos a su carrito.
 - Se creó una ruta especial para finalizar la compra "/purchase". Esta ruta corrobora si el producto en carrito tiene el suficiente stock en la base de datos y aprueba la compra. En el caso de que uno o más productos no tengan stock, los almacenará en un array permitiendo que el producto pueda permanecer en el carrito en el caso de que en un hipotético futuro se agreguen más stocks del producto en cuestión.
 - Optimización de variables de entorno: unifiqué las variables de entorno en un solo archivo env.config para evitar que Node tenga que entrar al process de cada variable por separado.
 - Utilicé el seed visto en clase para popular la base de datos con productos.
 - Implementé patrones de diseño como Repository para separar la lógica de negocio de la lógica de los DAO. Creé controllers y servicios dejando los DAO con las funciones base del CRUD

## Pre-entrega 1

Para esta pre-entrega desarrollé la lógica de un ecommerce (centrado en autorización y autenticación de usuarios). Se utilizaron tecnologías como bcrypt, JWT y Passport, entre otras.
Para iniciar la aplicación:

    Clonar el repositorio
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
    
    "password":"123",
    
    "age":30,
    
    "role":"user"
    
    }

**/login**
Este endpoint utiliza la estrategia local de login configurada en Passport. Deberá proveerse el email y la contraseña en el cuerpo de la petición. Ej:
	
    //Para el caso del usuario de rango user:
    {
    
    "email":"userTest1@test.com",
    
    "password":"123"
    
    }
    //Para el caso del usuario de rango admin:
     {
    
    "email":"adminTest1@test.com",
    
    "password":"123"
    
    }
**/logout**
Este endpoint *terminará* con la *sesión del usuario*. Cuando es llamado, tomará la cookie donde se almacena el *token del usuario* y la elimina.
**/current**
Este endpoint lee el *JWT* almacenado en la *cookie* y nos retorna los *datos del usuario*. Para este endpoint implementé un middleware de autorización. Si se ejecuta con un usuario de rol "admin", no se autorizará y saldrá error. Si el usuario es de categoria "user", entonces devolverá un estado 200 y el contenido.
**/google**
Este endpoint se recomienda ejecutarse en el navegador ya que redirigirá al sistema de inicio de sesión provisto por Google. Si el usuario no existe, se creará uno en la base de datos, pero si ya está registrado se retornarán los datos del usuario.