// import multer from "multer";
// import { v4 as uuid } from "uuid";

// const storage = multer.diskStorage({
//   destination(req, file, callback) {
//     callback(null, "uploads");
//   },
//   filename(req, file, callback) {
//     const id = uuid();
//     const extName = file.originalname.split(".").pop();
//     callback(null, `${id}.${extName}`);
//   },
// });

// export const singleUpload = multer({ storage }).single("photo");


import express from 'express';
import multer from 'multer';
import { v4 as uuid } from 'uuid';

const app = express();
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads");
  },
  filename(req, file, callback) {
    const id = uuid();
    const extName = file.originalname.split(".").pop();
    callback(null, `${id}.${extName}`);
  },
});

const upload = multer({ storage }).single("photo");

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      // Handle error
      return res.status(400).json({ error: err.message });
    }
    // File uploaded successfully
    res.status(200).json({ message: 'File uploaded successfully' });
  });
});

app.get('/download/:filename', (req, res) => {
  // Set expiration date 1 hour from now
  const expirationDate = new Date(Date.now() + 3600000);
  res.setHeader('Expires', expirationDate.toUTCString());
  
  const filename = req.params.filename;
  res.download(`uploads/${filename}`, filename, (err) => {
    if (err) {
      // Handle error
      return res.status(404).json({ error: 'File not found' });
    }
  });
});

