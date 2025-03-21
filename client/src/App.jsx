import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import IndexPage from './pages/IndexPage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {
  return (
    <>
    
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    <Footer/>
    </Router>
    </>
  );
}

export default App;