import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "../axiosInstance"

// Define the shape of your user data
interface User {
  username: string;
  email: string;
  // Add any other fields you get from your API
  kownwords?: string[];
  motherLanguage?: string,
  targetLanguage?: string,
  fluncyLevel?: string,
}

// Define what the context will provide
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean; // We'll use this instead of checking for a token
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // 2. USE AXIOS: Switched from fetch to axiosInstance. It automatically includes credentials.
        const response = await axiosInstance.get('/api/user_profile_view/');
        // For axios, the response data is in the `data` property.
        setUser(response.data);
      } catch (error) {
        // Axios automatically throws an error for non-2xx responses (like 401),
        // so we just need to catch it.
        console.error("No active session found.", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []);

  // Before making the login request, fetch CSRF token
  const fetchCSRFToken = async () => {
    try {
      await axiosInstance.get('/api/get-csrf-token/');
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };

  const login = async (credentials: any) => {
    setIsLoading(true);
    try {

      await fetchCSRFToken();
      // 3. USE AXIOS FOR LOGIN: Switched from fetch. Axios handles JSON stringifying automatically.
      await axiosInstance.post('/api/login/', credentials);

      // THE FIX: Wait for a very short moment to ensure the browser
      // has processed and saved the sessionid cookie from the previous request.
      await new Promise(resolve => setTimeout(resolve, 100)); // 50ms delay

      // 4. USE AXIOS FOR PROFILE: Since login was successful, fetch the user's profile.
      const profileResponse = await axiosInstance.get('/api/user_profile_view/');
      setUser(profileResponse.data);
      toast({ title: "Welcome back!" });
      navigate('/dashboard');

    } catch (error: any) {
      // 5. IMPROVED ERROR HANDLING: Axios provides detailed error objects.
      const errorMessage = error.response?.data?.error || 'Invalid credentials or server error.';
      toast({ title: "Login Failed", description: errorMessage, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // 6. USE AXIOS FOR LOGOUT
      await axiosInstance.post('/api/logout/');
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUser(null);
      window.location.href = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};