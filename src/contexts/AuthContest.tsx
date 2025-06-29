import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

// Define the shape of your user data
interface User {
  username: string;
  email: string;
  // Add any other fields you get from your API
  kownwords: string[];
  password: string;
  motherLanguage: string,
  targetLanguage: string,
  fluncyLevel: string,
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

  // This useEffect will run when the app first loads to check
  // if the user already has a valid session cookie.
  useEffect(() => {
    const checkUserSession = async () => {
      try {
        // We directly call the profile view. If the user has a valid sessionid cookie,
        // this request will succeed and return the user's data.
        const response = await fetch('http://127.0.0.1:8000/api/user_profile_view/',
          {credentials: 'include'},
        );

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // If the request fails (e.g., 401 Unauthorized), it means there's no active session.
          setUser(null);
        }
      } catch (error) {
        // This can happen if the backend is down.
        console.error("Failed to check user session", error);
        setUser(null);
      } finally {
        // We're done checking, so we can stop showing a loading state.
        setIsLoading(false);
      }
    };

    checkUserSession();
  }, []); // The empty dependency array means this runs only once on mount.

  // This is the function that gets called from your Login page.
  // `credentials` is just an object like { email: "...", password: "..." }
  const login = async (credentials: any) => {
    setIsLoading(true);
    try {
      // Step 1: Call the login endpoint.
      // Django will authenticate and set the sessionid cookie on the browser automatically.
      const loginResponse = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include',
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.error || 'Invalid credentials');
      }

      // Step 2: Since login was successful, immediately fetch the user's full profile data.
      const profileResponse = await fetch('http://127.0.0.1:8000/api/user_profile_view/',
        {credentials: 'include'}
      );
      if (profileResponse.ok) {
        const userData = await profileResponse.json();
        setUser(userData); // Set the user in our context
        toast({ title: "Welcome back!" });
        navigate('/dashboard'); // Navigate to the dashboard
      } else {
         throw new Error('Could not fetch user profile after login.');
      }

    } catch (error) {
      toast({ title: "Login Failed", description: String(error), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
        await fetch('http://127.0.0.1:8000/api/logout/', { method: 'POST', credentials: 'include'});
    } catch (error) {
        console.error("Logout failed", error);
    } finally {
        setUser(null);
        // We don't need to manage localStorage anymore.
        // Django's logout view will have cleared the session cookie.
        // navigate('/login');
        window.location.href = '/login'
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