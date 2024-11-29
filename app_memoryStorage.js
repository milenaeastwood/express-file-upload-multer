import express from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({storage});
  
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile('/Users/milenaoswald/Documents/_WBS/Projekte/5_express/file_upload_multer/index.html');
});

app.post('/upload-profile-pic', upload.single('profile_pic'), (req, res) => {
    console.log(req.file);
    const imagePath = `./uploads/${req.file.filename}`;
    res.send(`<div><h2>Here's the picture:</h2><img src='${imagePath}'/></div>`)
  });

export default app;