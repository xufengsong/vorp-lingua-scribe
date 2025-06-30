
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContest';

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // return <div>Loading...</div>; // Or a more sophisticated loading spinner
    return(
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected component
  return <Outlet />;

  // If not loading, check if the user is authenticated.
  // If they are, show the child route (Outlet). Otherwise, redirect to login.
  // return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;