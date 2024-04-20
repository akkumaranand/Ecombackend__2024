import multer from "multer";
import { v4 as uuid } from "uuid";
import fs from "fs";
import { Request, Response, NextFunction } from 'express'; // Importing types for req, res, and next

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads/temp"); // Save uploads temporarily in the 'uploads/temp' directory
  },
  filename(req, file, callback) {
    const id = uuid();
    const extName = file.originalname.split(".").pop();
    callback(null, `${id}.${extName}`);
  },
});

const upload = multer({ storage }).single("photo");
// const upload = multer({ storage }).single("photo");

// // Middleware to handle file upload
// export const singleUpload = (req, res, next) => {
//    upload(req, res, (err) => {
//     if (err) {
//       return res.status(500).json({ error: "Error uploading file" });
//     }
//     // Process the uploaded file here
    
//     // Cleanup: Delete the temporary file after processing
//     fs.unlink(req.file.path, (err) => {
//       if (err) {
//         console.error('Error deleting temporary file:', err);
//       }
//     });

//     next(); // Move to the next middleware or route handler
//   });
// };






// Middleware to handle file upload
export const singleUpload = (req: Request, res: Response, next: NextFunction) => {
   upload(req, res, (err: any) => {
    if (err) {
      return res.status(500).json({ error: "Error uploading file" });
    }
    // Process the uploaded file here
    
    // Cleanup: Delete the temporary file after processing
    fs.unlink(req.file.path, (err) => {
      if (err) {
        console.error('Error deleting temporary file:', err);
      }
    });

    next(); // Move to the next middleware or route handler
  });
}