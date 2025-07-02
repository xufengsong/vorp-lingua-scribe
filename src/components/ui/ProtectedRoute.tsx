
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContest';
import { useEffect } from "react"; // 1. IMPORT: Import the 'useEffect' hook from React.
import axiosInstance from "@/axiosInstance"; // 2. IMPORT: Import your newly created axios instance.

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // 3. FETCH CSRF TOKEN: This useEffect hook runs when the ProtectedRoute component
  // is mounted. It makes a silent GET request to your Django backend to get the
  // CSRF token cookie. This ensures the cookie is available before any protected
  // page tries to make a POST, PUT, or DELETE request.

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        await axiosInstance.get('/api/get-csrf-token/');
        console.log("CSRF cookie set.");
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };

    fetchCsrfToken();
  }, []); // The empty dependency array means this effect runs only once when the component first mounts.
  
  if (isLoading) {
    // return <div>Loading...</div>; // Or a more sophisticated loading spinner
    return(
      // <div className="min-h-screen flex items-center justify-center bg-gray-50">
      //   <div className="flex items-center space-x-2">
      //     <div className="w-6 h-6 border-2 border-cyan-600 border-t-transparent rounded-full animate-spin"></div>
      //     <span className="text-gray-600">Loading...</span>
      //   </div>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      // </div>
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