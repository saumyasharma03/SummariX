import { useState, useEffect } from 'react';
import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer';

import axios from 'axios';
import './Dashboard.css';
// import './App.css'; // Ensure you have basic styles

const Dashboard = () => {

  const sendFilePathToBackend = async (filePath) => {
    try {
      const response = await axios.post('http://localhost:3000/send_mp3_path', {
        filePath: filePath
      });

      console.log('Response from backend:', response.data);
      // Handle response as needed
    } catch (error) {
      console.error('Error sending file path:', error);
      // Handle error
    }
  };

  const recorderControls = useVoiceVisualizer();
  const { startRecording, stopRecording, recordedBlob, error } = recorderControls;

  const [isRecording, setIsRecording] = useState(false); // Track recording state
  const [uploadStatus, setUploadStatus] = useState('idle'); // Track upload progress
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null); // Store audio URL
  const [view, setView] = useState('userInfo');
  const [processing, setProcessing] = useState(false); // Track processing state
  const [resultData, setResultData] = useState({ score: 0, comments: '' }); // Store result data
  const userInfo = {
    name: 'John Doe',
    age: 30,
    email: 'johndoe@example.com',
    // Add more user information as needed
  };

  const startAssessment = () => {
    setView('assessment'); // Change view to assessment
  };

  useEffect(() => {
    // Create a temporary URL for the recorded audio (if any)
    if (recordedBlob) {
      const audioURL = URL.createObjectURL(recordedBlob);
      console.log(audioURL);
      setRecordedAudioUrl(audioURL);
    } else {
      setRecordedAudioUrl(null); // Clear URL when recording stops/clears
    }

    // Clean up the temporary URL when the component unmounts
    return () => URL.revokeObjectURL(recordedAudioUrl);
  }, [recordedBlob]);

  const submitAudio = async () => {
    if (!recordedBlob) {
      console.warn('No audio recorded yet. Please record audio before submitting.');
      return;
    }

    setUploadStatus('uploading'); // Indicate upload in progress

    const formData = new FormData();
    formData.append('audioFile', recordedBlob, 'recording.webm'); // Specify filename

    try {
      const response = await axios.post('http://localhost:5000/submitMp3', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Upload progress: ${percentCompleted}%`); // Optional progress indicator
        },
      });
      console.log('Upload successful:', response.data);
      setUploadStatus('success');
      setProcessing(true); // Start processing state

      // Simulate processing delay and then set the result data
      setTimeout(() => {
        setProcessing(false); // Stop processing state
        setResultData({ score: 85, comments: 'Good job!' }); // Example result data, replace with actual data from response
        setView('result'); // Navigate to result view
      }, 2000); // 2-3 seconds delay
    } catch (error) {
      console.error('Error uploading audio:', error);
      setUploadStatus('error'); // Indicate upload error
    }
  };

  let userData = localStorage.getItem("userData")
  userData = JSON.parse(userData);
  let language=userData.language;

  let text="";
  
    switch (language) {
      case 'hindi':
        text = 'यह नमूना पाठ है';
        break;
      case 'marathi':
        text = 'हे नमुना मजकूर आहे';
        break;
      case 'english':
      default:
        text = 'This is sample text';
    }

  return (
    <div className="Apph">
      
      <div className="App">
        {view === 'userInfo' ? (
          <div className='container'>
            <h1>STUDENT DETAILS</h1>
            <p>Name: {userData.studentName}</p>
            <p>Language: {userData.language}</p>
            <p>Grade: {userData.grade}</p>
            {/* Add more user information as needed */}
            <button onClick={startAssessment}>Start Assessment</button>
          </div>
        ) : view === 'assessment' ? (
          <div>
            <div className="App-header">
              <div className="mainText">{text}</div>
              <VoiceVisualizer controls={recorderControls} />
              <button onClick={submitAudio}>
                Submit Audio
              </button>
            </div>
            {uploadStatus === 'uploading' && <p>Uploading audio...</p>}
            {uploadStatus === 'error' && <p>Error uploading audio. Please try again.</p>}
            {uploadStatus === 'success' && <p>Audio uploaded successfully!</p>}

            {/* Optional Audio Preview (if supported by browser) */}
            {recordedAudioUrl && (
              <audio controls src={recordedAudioUrl}>
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        ) : processing ? (
          <div>
            <p>Processing, please wait...</p>
          </div>
        ) : view === 'result' ? (
         <h1>Hi</h1> // Use the Result component
        ) : null}
      </div>
      
    </div>
  );
};

export default Dashboard;
