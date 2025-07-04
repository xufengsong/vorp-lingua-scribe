
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContest";
import axiosInstance from "../axiosInstance"



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  // const { toast } = useToast();
  const { login, isLoading } = useAuth(); // Use the context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
    


    // if (!email || !password) {
    //   toast({
    //     title: "Missing Information",
    //     description: "Please enter both email and password.",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    // const login_info = {"email": email, "password": password};

    // try {
    //   const response = await fetch('http://127.0.0.1:8000/api/login/', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(login_info),
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     console.log("Success:", data);
    //     toast({
    //       title: "Welcome to VORP!",
    //       description: "You've successfully logged in.",
    //     });
    //     navigate("/dashboard");
        
    //   } else {
    //     console.error("Error:", data);
    //     toast({
    //       title: "Login Failed",
    //       description: "Invalid email or password.",
    //       variant: "destructive",
    //     });
    //   }
    // } catch (error) {
    //   console.error('There was an error sending the request!', error);
    //   toast({
    //     title: "Connection Error",
    //     description: "Unable to connect to server.",
    //     variant: "destructive",
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-blue-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">VORP</h1>
          <p className="text-gray-600">Welcome back to your language learning journey</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl py-3 text-base font-medium transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="text-cyan-600 hover:text-cyan-700 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
