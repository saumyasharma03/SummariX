import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900 text-white py-4 px-10 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">SummariX</h1>
      <div>
        <Link to="/dashboard" className="bg-purple-600 hover:bg-purple-800 text-white px-6 py-2 rounded-lg">
          Start for Free
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;