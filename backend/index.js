import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';

// Initialize express app
const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Directory to store uploaded files
const uploadDir = 'C:/Users/DELL/OneDrive/文件/summ/backend/uploads';

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Filename will include timestamp to avoid collisions
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // 10MB file size limit
});

// Endpoint to handle audio file upload
app.post('/submitmp3', upload.single('audioFile'), (req, res) => {
  if (!req.file) {
    // No file uploaded
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Log the uploaded file details
  console.log('Uploaded file:', req.file);

  // Respond with a success message and the file information
  res.json({
    message: 'File uploaded successfully',
    file: req.file,
  });
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
