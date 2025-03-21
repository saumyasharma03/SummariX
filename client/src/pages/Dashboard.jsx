  import { useState, useEffect } from 'react';
  import { useVoiceVisualizer, VoiceVisualizer } from 'react-voice-visualizer';
  import axios from 'axios';
  import Result from './Result';

  const Dashboard = () => {
    const recorderControls = useVoiceVisualizer();
    const { startRecording, stopRecording, recordedBlob, error } = recorderControls;

    const [uploadStatus, setUploadStatus] = useState('idle');
    const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
    const [view, setView] = useState('assessment');
    const [processing, setProcessing] = useState(false);
    const [resultData, setResultData] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
      if (recordedBlob) {
        const audioURL = URL.createObjectURL(recordedBlob);
        setRecordedAudioUrl(audioURL);
      } else {
        setRecordedAudioUrl(null);
      }

      return () => URL.revokeObjectURL(recordedAudioUrl);
    }, [recordedBlob]);

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };

    const submitAudio = async () => {
      const formData = new FormData();
      
      if (selectedFile) {
        formData.append('audioFile', selectedFile);
      } else if (recordedBlob) {
        formData.append('audioFile', recordedBlob, 'recording.webm');
      } else {
        console.warn('No audio recorded or uploaded.');
        return;
      }

      setUploadStatus('uploading');

      try {
        const response = await axios.post('http://localhost:5000/submitmp3', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        console.log('✅ Upload successful:', response.data);
        setUploadStatus('success');
        setProcessing(true);

        setTimeout(() => {
          setProcessing(false);
          setResultData(response.data);
          setView('result');
        }, 2000);
      } catch (error) {
        console.error('❌ Error uploading audio:', error);
        setUploadStatus('error');
      }
    };

    return (
      <div className="bg-gradient-to-r from-purple-100 to-white min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-1/2">
          {view === 'assessment' ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-purple-700">Speech Assessment</h2>
              <div className="bg-gray-100 p-4 rounded-lg mt-4">
                <VoiceVisualizer controls={recorderControls} />
              </div>
              <label className="mt-4 block text-lg font-medium text-gray-700">OR Upload Audio File</label>
              <input 
                type="file" 
                accept="audio/*" 
                className="mt-2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full cursor-pointer" 
                onChange={handleFileChange} 
              />
              <button 
                onClick={submitAudio} 
                className="mt-6 bg-purple-600 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300">
                Submit Audio
              </button>
              {uploadStatus === 'uploading' && <p className="text-yellow-500 mt-2">Uploading audio...</p>}
              {uploadStatus === 'error' && <p className="text-red-500 mt-2">Error uploading audio.</p>}
              {uploadStatus === 'success' && <p className="text-green-500 mt-2">Audio uploaded successfully!</p>}
              {recordedAudioUrl && <audio controls src={recordedAudioUrl} className="mt-4 w-full"></audio>}
            </div>
          ) : processing ? (
            <div className="text-center text-gray-600">Processing, please wait...</div>
          ) : view === 'result' ? (
            <Result transcribedText={resultData?.transcribed_text} similarityScore={resultData?.similarity_score} sum_text={resultData?.summarized_text} />
          ) : null}
        </div>
      </div>
    );
  };

  export default Dashboard;