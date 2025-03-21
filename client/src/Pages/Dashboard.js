import { useState, useEffect } from 'react';
import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer';
import axios from 'axios';
import Result from './Result'; // Import the Result component
import './Dashboard.css';

const Dashboard = () => {
  const recorderControls = useVoiceVisualizer();
  const { startRecording, stopRecording, recordedBlob, error } = recorderControls;

  const [isRecording, setIsRecording] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('idle');
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [view, setView] = useState('userInfo');
  const [processing, setProcessing] = useState(false);
  const [resultData, setResultData] = useState(null); // Store API response

  const startAssessment = () => {
    setView('assessment'); // Switch to assessment mode
  };

  useEffect(() => {
    if (recordedBlob) {
      const audioURL = URL.createObjectURL(recordedBlob);
      setRecordedAudioUrl(audioURL);
    } else {
      setRecordedAudioUrl(null);
    }

    return () => URL.revokeObjectURL(recordedAudioUrl);
  }, [recordedBlob]);

  const submitAudio = async () => {
    if (!recordedBlob) {
      console.warn('No audio recorded yet.');
      return;
    }

    setUploadStatus('uploading');

    const formData = new FormData();
    formData.append('audioFile', recordedBlob, 'recording.webm');

    try {
      const response = await axios.post('http://localhost:5000/submitmp3', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('✅ Upload successful:', response.data);
      setUploadStatus('success');
      setProcessing(true);

      // Store the API response and switch to the result view
      setTimeout(() => {
        setProcessing(false);
        setResultData(response.data); // Save result
        setView('result'); // Switch to result view
      }, 2000);
    } catch (error) {
      console.error('❌ Error uploading audio:', error);
      setUploadStatus('error');
    }
  };

  return (
    <div className="Apph">
      <div className="App">
        {view === 'userInfo' ? (
          <div className='container'>
            <h1>STUDENT DETAILS</h1>
            <p>Name:</p>
            <p>Language:</p>
            <p>Grade:</p>
            <button onClick={startAssessment}>Start Assessment</button>
          </div>
        ) : view === 'assessment' ? (
          <div>
            <div className="App-header">
              <div className="mainText">This is the sample text</div>
              <VoiceVisualizer controls={recorderControls} />
              <button onClick={submitAudio}>Submit Audio</button>
            </div>
            {uploadStatus === 'uploading' && <p>Uploading audio...</p>}
            {uploadStatus === 'error' && <p>Error uploading audio.</p>}
            {uploadStatus === 'success' && <p>Audio uploaded successfully!</p>}
            {recordedAudioUrl && <audio controls src={recordedAudioUrl}></audio>}
          </div>
        ) : processing ? (
          <div><p>Processing, please wait...</p></div>
        ) : view === 'result' ? (
          <Result transcribedText={resultData?.transcribed_text} similarityScore={resultData?.similarity_score} />
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;