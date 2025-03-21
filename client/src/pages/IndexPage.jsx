import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <div className="bg-gradient-to-r from-purple-100 to-white min-h-screen flex flex-col items-center justify-center text-center px-6">
      {/* Hero Section */}
      <div className="max-w-3xl text-center mt-10">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">SummariX</h1>
        <h2 className="text-4xl font-extrabold text-gray-900">Boost productivity with <span className="text-purple-600">AI notetaker</span></h2>
        <p className="mt-4 text-gray-700">Automatically convert your meetings, interviews, or recordings into searchable text with SummariX. Transcribe, edit, summarize, and collaborate in a single workflow.</p>
        <Link to="/dashboard" className="mt-6 inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-800">Start for Free →</Link>
      </div>

      {/* Features */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900">🎙️ Speech-to-Text</h3>
          <p className="text-gray-600 mt-2">Convert audio recordings into text and summarize effortlessly.</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900">📄 Text Summarization</h3>
          <p className="text-gray-600 mt-2">Get key takeaways from lengthy articles and reports.</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="text-xl font-bold text-gray-900">🌎 Multi-Language Support</h3>
          <p className="text-gray-600 mt-2">Translate transcripts into different languages.</p>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="mt-10 py-6 text-gray-600">
        <p>© 2024 SummariX. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default IndexPage;