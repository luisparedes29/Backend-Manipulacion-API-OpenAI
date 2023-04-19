const express = require("express");
const router = express.Router();
const crearRespuesta = require("./controllers/rest-controller");
const { registroController } = require("./controllers/registroController");
const { loginValidator } = require("../validators/loginValidator");
const { registroValidator } = require("../validators/registroValidator");
const { imagenController}= require("./controllers/imagenController")
const authToken = require("./controllers/JWTAuthController");

/**
 * @swagger
 *  components:
 *  securitySchemes: 
 *      bearerAuth: 
 *           type: http 
 *           scheme: bearer
 *           bearerFormat: JWT
 *  schemas:
 *      usuario:
 *          type: object
 *          properties:
 *              correo:
 *                  type: string
 *                  description: correo del usuario
 *              username:
 *                  type: string
 *                  description: username del usuario
 *              password:
 *                  type: string
 *                  description: conttraseña del usuario
 *          required:
 *              - correo
 *              - username
 *              - password
 *          example:
 *              correo: correoejemplo@gmail.com
 *              username: Nombrerandom
 *              password: C0ntras3na
 *      login:
 *          type: object
 *          properties:
 *              correo:
 *                  type: string
 *                  description: correo del usuario
 *              password:
 *                  type: string
 *                  description: conttraseña del usuario
 *          required:
 *              - correo
 *              - password
 *          example:
 *              correo: correoejemplo@gmail.com
 *              password: C0ntras3na
 *      respuesta:
 *          type: object
 *          properties:
 *              pregunta:
 *                  type: string
 *                  description: pregunta del usuario
 *          required:
 *              - pregunta
 *          example:
 *              pregunta: Como te llamas?
 *      upload:
 *          type: object
 *          properties:
 *              image:
 *                  type: string
 *                  description: imagen del usuario
 *              username:
 *                  type: string
 *                  description: username del usuario
 *          required:
 *              - image
 *              - username
 *          example:
 *              image: https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png
 *              username: Nombrerandom
 *      getImage:
 *          type: object
 *          properties:
 *              correo:
 *                  type: string
 *                  description: correo del usuario
 *          required:
 *              - correo
 *          example:
 *              correo: correoejemplo@gmail.com
 */


/**
 * @swagger
 * /:
 *  post:
 *      summary: Pregunta del usuario
 *      tags: [Pregunta]
 *      security:
 *       - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/respuesta'
 *      responses:
 *          200:
 *              description: Pregunta exitosa.
 *          400:
 *              description: Ha cometido un error.
 */

// Crear una ruta POST que recibe una pregunta en el cuerpo y genera una respuesta con tu modelo personalizado
router.post("/", authToken, async (req, res) => {
    await crearRespuesta(req, res);
});


/**
 * @swagger
 * /registrar_usuario:
 *  post:
 *      summary: Registrar Usuario
 *      tags: [Registrar]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/usuario'
 *      responses:
 *          201:
 *              description: Nuevo Usuario Creado!
 *          409:
 *              description: Ya existe una cuenta con este correo!
 *          500:
 *              description: Ocurrió un error al registrar al usuario!
 */

router.post('/registrar_usuario', registroValidator, registroController.registrarUsuario);


/**
 * @swagger
 * /login:
 *  post:
 *      summary: Entrar a la Sesión
 *      tags: [Login]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/login'
 *      responses:
 *          200:
 *              description: El inicio de sesión ha sido exitoso. Bienvenido!
 *          401:
 *              description: El usuario no está registrado. Por favor, regístrese para poder accede!
 *          500:
 *              description: Ha ocurrido un error en el inicio de sesión. Por favor inténtelo de nuevo más tarde!
 */


router.post('/login', loginValidator, registroController.inicioSesion);


/**
 * @swagger
 * /logout:
 *  post:
 *      summary: Salir de la Sesión
 *      tags: [Logout]
 *      responses:
 *          200:
 *              description: La sesión se ha cerrado exitosamente.
 *          400:
 *              description: No se puede cerrar sesión porque no hay un usuario con sesión iniciada.
 *          500:
 *              description: Ocurrió un error al cerrar la sesión.
 */

router.post('/logout', registroController.cerrarSesion);


/**
 * @swagger
 * /upload:
 *  post:
 *      summary: Foto de perfil del Usuario
 *      tags: [Foto]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/upload'
 *      responses:
 *          400:
 *              description: No se envió ningún archivo.
 *          500:
 *              description: Internal Server Error.
 */

router.post('/upload', imagenController.cargarImagen);



/**
 * @swagger
 * /getImage:
 *  post:
 *      summary: Get Image
 *      tags: [Obtener]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/getImage'
 *      responses:
 *          200:
 *              description: La imagen ha sido encontrada!.
 *          404:
 *              description: Usuario no encontrado.
 */

router.post('/getImage', imagenController.getImagen);

module.exports = router;
