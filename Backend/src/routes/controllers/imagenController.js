const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');
const { usuario } = require('../../models/user');

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.KEY_CLOUD,
    api_secret: process.env.KEY_SECRET,
});

const storage = multer.diskStorage({
    destination: './',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
});

const cargarImagen = (req, res) => {
    upload.fields([{ name: 'image', maxCount: 1 }])(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        try {
            // Retrieve uploaded files from request object
            const image = req.files.image ? req.files.image[0] : undefined;
            const { username } = req.body;
            console.log(username);

            if (image) {
                const response = await cloudinary.uploader.upload(image.path, {
                    folder: 'images',
                });
                res.status(201).json({
                    image: {
                        public_id: response.public_id,
                        url: response.secure_url,
                    },
                });
                fs.unlinkSync(image.path);
                await usuario.update(
                    { fotoPerfil: `${response.secure_url}` },
                    {
                        where: {
                            username: `${username}`,
                        },
                    }
                );
            } else {
                res.status(400).json({ error: 'No se envió ningún archivo' });
            }
        } catch {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
};

const getImagen= async (req,res)=>{
    const { correo } = req.body;
    try {
        const cloudinary = await usuario.findOne(
            {
                where:
                    { correo: correo }
            })
        res.status(200).json({
            image: {
                url: cloudinary.fotoPerfil,
            },
        });
    } catch (error) {
        res.status(404).json({
            error: "Usuario no encontrado",
        })
    }

}

module.exports.imagenController = {
    cargarImagen,
    getImagen
};
