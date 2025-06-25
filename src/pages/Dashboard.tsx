
import { useState } from "react";
import { Home, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Dashboard = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    setIsLoading(true);
    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      console.log("Content submitted:", content);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">VORP</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-cyan-600"
              title="Dashboard"
            >
              <Home size={20} />
            </Link>
            <Link
              to="/settings"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-cyan-600"
              title="Settings"
            >
              <Settings size={20} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Analyze Content for Language Learning
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform any content into personalized language learning material
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto">
          <div className="space-y-6">
            <div>
              <Textarea
                placeholder="Paste text, news URL, or YouTube URL here… and we'll analyze the content for language learning."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[120px] resize-none border-gray-300 focus:border-cyan-500 focus:ring-cyan-500 rounded-xl text-base"
              />
            </div>
            
            <Button
              onClick={handleSubmit}
              disabled={!content.trim() || isLoading}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl py-3 text-base font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing...</span>
                </div>
              ) : (
                "Analyze Content"
              )}
            </Button>
            
            <p className="text-sm text-gray-500 text-center">
              We support plain text, news articles, and YouTube links.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
