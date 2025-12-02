const multer = require('multer');
const path = require('path');
const fs = require('fs');

// S'assurer que les dossiers existent
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Dossier de stockage
  },
  filename: function (req, file, cb) {
    // Nom unique : timestamp + extension originale
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const fileFilter = (req, file, cb) => {
  // Accepter seulement images et audio
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('audio/')) {
    cb(null, true);
  } else {
    cb(new Error('Format de fichier non supporté (Audio ou Image uniquement)'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;