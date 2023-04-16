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
 * components:
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
 *              username: Nombre Random
 *              password: ContraseñaRandom
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
 *              password: ContraseñaRandom
 *      /:
 *          type: object
 *          properties:
 *              pregunta:
 *                  type: string
 *                  description: pregunta del usuario
 *          required:
 *              - pregunta
 *          example:
 *              pregunta: Como te llamas?
 */


/**
 * @swagger
 * /api//:
 *  post:
 *      summary: Pregunta del usuario
 *      tags: [Pregunta]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas//'
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
 * /api/registrar_usuario:
 *  post:
 *      summary: Registrar Usuarionode
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
 * /api/login:
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
 * /api/logout:
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


//  Codigo de prueba para ver si funciona la creacion de la cookie

// router.get('/logout', (req, res) => {
//     console.log(req.cookies.token)
//     if (!req.cookies.token) {
//         return res.send('No hay usuario con sesión iniciada.');
//     }
//     else {
//         res.send(`El usuario esta conectado`)
//     }
// })

router.post('/upload', imagenController.cargarImagen);






router.get('/getImage', imagenController.getImagen);

module.exports = router;
