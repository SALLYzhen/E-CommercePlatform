import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

// before we even create our routes, we need to describe 
// where we want our image to go, which storage we want to use.
// We could use Amazon buckets or disk storage, which is what I want.
  const storage = multer.diskStorage({
    destination(req, file, cb) { //cb is the callback
      cb(null, 'uploads/'); //null for error, the second is where we actually want our uploads to go
    },
    filename(req, file, cb) { //describe how our file names to be formatted.
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });

  function fileFilter(req, file, cb) {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);
  
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Images only!'), false);
    }
  }
  
  const upload = multer({ storage, fileFilter });
  const uploadSingleImage = upload.single('image');
  
  router.post('/', (req, res) => {
    uploadSingleImage(req, res, function (err) {
      if (err) {
        res.status(400).send({ message: err.message });
      }
  
      res.status(200).send({
        message: 'Image uploaded successfully',
        image: `/${req.file.path}`,
      });
    });
  });

export default router;