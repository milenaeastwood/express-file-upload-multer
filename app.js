import express from 'express';
import path from 'express';
import multer from 'multer';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })

const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 512,
        fieldNameSize: 200
    },
});
  

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('/Users/milenaoswald/Documents/_WBS/Projekte/5_express/file_upload_multer/index.html');
});

app.post('/upload-profile-pic', upload.single('profile_pic'), (req, res) => {
    console.log(req.file);
    res.send(`<div><h2>Here's the picture:</h2><img src='uploads/${req.file.filename}'/></div>`)
  });

export default app;