
import { useState } from "react";
import { Home, Settings, DollarSign, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Mock recommended content
  const recommendedContent = [
    {
      title: "Spanish News: Technology Trends",
      description: "Learn tech vocabulary with current events",
      difficulty: "Intermediate",
      duration: "8 min read"
    },
    {
      title: "French Cooking Tutorial",
      description: "Master culinary terms while learning recipes",
      difficulty: "Beginner",
      duration: "12 min video"
    },
    {
      title: "German Business Podcast",
      description: "Professional vocabulary for workplace conversations",
      difficulty: "Advanced",
      duration: "25 min audio"
    }
  ];

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/analyze/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        console.log("Translation List:", data.analysis);
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error('There was an error sending the request!', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/dashboard"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-cyan-600"
              title="Dashboard"
            >
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">VORP</h1>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-cyan-600"
              title="Dashboard"
            >
              <Home size={20} />
            </Link>
            <Link
              to="/pricing"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-cyan-600"
              title="Pricing"
            >
              <DollarSign size={20} />
            </Link>
            <Link
              to="/settings"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-cyan-600"
              title="Settings"
            >
              <Settings size={20} />
            </Link>
            <Link
              to="/login"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-red-600"
              title="Logout"
            >
              <LogOut size={20} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Content Analysis Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Analyze Content for Language Learning
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform any content into personalized language learning material
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto mb-12">
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

        {/* Recommended Content Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-light text-gray-900 mb-2">
              Recommended Learning Content
            </h3>
            <p className="text-gray-600">
              Curated content tailored to your learning level
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {recommendedContent.map((item, index) => (
              <Card key={index} className="rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-200 cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      item.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {item.difficulty}
                    </span>
                    <span className="text-sm text-gray-500">{item.duration}</span>
                  </div>
                  <CardTitle className="text-lg text-gray-900">{item.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full rounded-lg">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
