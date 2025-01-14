    // import { useState, useEffect } from 'react';
    // import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer';
    // import axios from 'axios';

    // import './App.css'; // Ensure you have basic styles

    // const App = () => {
    //   const recorderControls = useVoiceVisualizer();
    //   const { startRecording, stopRecording, recordedBlob, error } = recorderControls;

    //   const [isRecording, setIsRecording] = useState(false); // Track recording state
    //   const [uploadStatus, setUploadStatus] = useState('idle'); // Track upload progress
    //   const [recordedAudioUrl, setRecordedAudioUrl] = useState(null); // Store audio URL

    //   useEffect(() => {
    //     // Create a temporary URL for the recorded audio (if any)
    //     if (recordedBlob) {
    //       const audioURL = URL.createObjectURL(recordedBlob);
    //       console.log(audioURL);
    //       setRecordedAudioUrl(audioURL);
    //     } else {
          
    //       setRecordedAudioUrl(null); // Clear URL when recording stops/clears
    //     }

    //     // Clean up the temporary URL when the component unmounts
    //     return () => URL.revokeObjectURL(recordedAudioUrl);
    //   }, [recordedBlob]);

    //   const submitAudio = async () => {
    //     if (!recordedBlob) {
    //       console.warn('No audio recorded yet. Please record audio before submitting.');
    //       return;
    //     }

    //     setUploadStatus('uploading'); // Indicate upload in progress

    //     const formData = new FormData();
    //     formData.append('audioFile', recordedBlob, 'recording.webm'); // Specify filename

    //     try {
    //       const response = await axios.post('http://localhost:5000/submitMp3', formData, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data',
    //         },
    //         onUploadProgress: (progressEvent) => {
    //           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //           console.log(`Upload progress: ${percentCompleted}%`); // Optional progress indicator
    //         },
    //       });
    //       console.log('Upload successful:', response.data);
    //       setUploadStatus('success');
    //     } catch (error) {
    //       console.error('Error uploading audio:', error);
    //       setUploadStatus('error'); // Indicate upload error
    //     }
    //   };

    //   return (
    //     <div className="App">
    //       <header className="App-header">
    //         <h1>Voice Recorder</h1>
    //         <button onClick={() => { setIsRecording(true); startRecording(); }} disabled={isRecording}>
    //           Start Recording
    //         </button>
    //         <button onClick={() => { setIsRecording(false); stopRecording(); }} disabled={!isRecording}>
    //           Stop Recording
    //         </button>
    //         <VoiceVisualizer controls={recorderControls} />
    //       </header>
    //       <button onClick={submitAudio} >
    //         Submit Audio
    //       </button>
    //       {uploadStatus === 'uploading' && <p>Uploading audio...</p>}
    //       {uploadStatus === 'error' && <p>Error uploading audio. Please try again.</p>}
    //       {uploadStatus === 'success' && <p>Audio uploaded successfully!</p>}

    //       {/* Optional Audio Preview (if supported by browser) */}
    //       {recordedAudioUrl && (
    //         <audio controls src={recordedAudioUrl}>
    //           Your browser does not support the audio element.
    //         </audio>
    //       )}
    //     </div>
    //   );
    // };

    // export default App;

    import React from 'react'
    import {BrowserRouter, Routes, Route} from 'react-router-dom';
    import IndexPage from './Pages/IndexPage.js'
    import Dashboard from './Pages/Dashboard.js'
    // import './App.css'
    const App = () => {
      return (
        <>
        <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<IndexPage/>}/> */}
          <Route path="/Dashboard" element={<Dashboard/>}/>
        </Routes>
        </BrowserRouter>
        </>
      )
    }

    export default App


