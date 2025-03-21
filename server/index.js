import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import axios from 'axios';

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// Directory to store uploaded files
const uploadDir = '/home/saumya03/Downloads/summariX/SummariX/server/uploads';

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
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 10000000 } });

app.post('/submitmp3', upload.single('audioFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filePath = req.file.path; // Path of the uploaded file
  const expectedText = "this is the sample text"; // Hardcoded expected text for now

  console.log(`File uploaded: ${filePath}`);

  try {
    // Send file path & expected text to Flask
    const response = await axios.post('http://127.0.0.1:5001/process_audio', {
      audio_path: filePath,
      expected_text: expectedText
    });

    console.log("Response from Flask:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error(" Error calling Flask API:", error);
    res.status(500).json({ message: 'Error processing file', error: error.message });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});