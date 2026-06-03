import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export function Navigation() {
  const { user, logout, isAuthenticated } = useAuthStore();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl">🎓</span>
          <span className="text-xl font-bold">StudyNotes AI</span>
        </Link>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-gray-600">{user?.name}</span>
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
              <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
              <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}