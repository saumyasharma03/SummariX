# SummariX - AI-Powered Speech-to-Text Summarization & Translation

SummariX is an innovative **AI-powered speech-to-text and summarization tool** that allows users to **record or upload audio**, **transcribe speech into text**, and **generate concise summaries or translations** based on user needs.

Designed for **efficiency and accuracy**, SummariX leverages **cutting-edge NLP models** to streamline meeting minutes, lecture notes, audiobook translations, and much more!

---

## ✨ **Salient Features**
✔ **🎙️ Live Speech Recording & Upload Support**  
   - Users can **record audio in real time** or **upload pre-recorded files** for processing.  

✔ **📝 High-Accuracy Speech-to-Text Conversion**  
   - Uses **Hugging Face Models** to transcribe audio with high fidelity.  

✔ **🔍 AI-Powered Summarization & Translation**  
   - Generates **concise summaries** or **translated versions** of audio transcripts.  

✔ **⚡ Advanced Text Similarity Analysis**  
   - Uses **spaCy's `en_core_web_sm` model** to compare text and check similarity scores.  

✔ **🌍 Multiple Use Cases**  
   - 📌 **Meeting Minutes Generation**  
   - 📌 **Lecture Summarization**  
   - 📌 **Audiobook Transcription & Translation**  
   - 📌 **Podcast Highlights Extraction**  
   - 📌 **Interview & Research Documentation**  

✔ **🚀 User-Friendly Interface**  
   - Available as a **web application (MERN stack)** for a seamless experience.  

✔ **🔧 Flexible & Extensible**  
   - Can be customized for **different speech models** or **additional NLP features**.  

---

## 🛠️ **Tech Stack**
SummariX is built using a **MERN (MongoDB, Express.js, React.js, Node.js) stack**, integrated with **powerful AI models** for speech and text processing.

### **📌 Backend**
- **Node.js & Express.js** (for API & File Handling)
- **Flask (Python API)** (for NLP Processing)
- **MongoDB** (for storing processed data)

### **📌 Frontend**
- **React.js** (for an interactive UI)
- **React Voice Visualizer** (for real-time audio recording)

### **📌 AI & NLP Models**
- **Hugging Face API: facebook/wav2vec2-base-960h** (for Speech-to-Text conversion)
- **Spacy Model: en_core_web_sm** (for summarization)
---

## 🎯 **How It Works**
1️⃣ **Record or Upload Audio** 🎙️  
2️⃣ **AI Transcribes Speech to Text** 🔡  
3️⃣ **SummariX Summarizes or Translates the Text** 📝  
4️⃣ **View Results & Use as Needed!** ✅  

---

## 🚀 **Installation & Setup**
### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/saumyasharma03/SummariX.git
cd SummariX
```

### **2️⃣ Install Dependencies**
#### **Backend (Express & Flask)**
```bash
cd server
npm install
cd ../ML
pip install -r requirements.txt
```

#### **Frontend (React)**
```bash
cd frontend
npm install
```

### **3️⃣ Run the Application**
#### **Start Backend (Express)**
```bash
cd server
npm start
```

#### **Start ML API (Flask)**
```bash
cd ML
source venv/bin/activate  # Activate virtual environment (Linux/Mac)
venv\Scripts\activate     # (Windows)
python flask_server.py
```

#### **Start Frontend (React)**
```bash
cd frontend
npm start
```

Now, visit **`http://localhost:5173`** in your browser! 🎉  

### **🚀 Start Summarizing Smarter with SummariX Today!**
---
This project is licensed under the **MIT License**.

