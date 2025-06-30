
import { useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { Home, Settings as SettingsIcon, User, LogOut, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContest";

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    profilePicture: null as File | null
  });

  // Fetch user profile data when the component mounts
  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     setIsLoading(true);
  //     try {
  //       // You'll likely need to send a token for authentication
  //       const token = localStorage.getItem('authToken'); // Example: get token from local storage
  //       if (!token) {
  //         navigate("/login");
  //         return;
  //       }

  //       const response = await fetch('http://127.0.0.1:8000/api/user_profile_view/', {
  //         method: 'GET', // Typically, you use GET to retrieve data
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Authorization': `Bearer ${token}`, // Send the token for authentication
  //         },
  //       });

  //       const data = await response.json();

  //       if (response.ok) {
  //         console.log("Success:", data);
  //         setProfileData({
  //           ...profileData,
  //           username: data.username,
  //           email: data.email,
  //         });
  //       } else {
  //         console.error("Error:", data);
  //         // Handle error, e.g., show a toast message
  //         toast({
  //           title: "Error",
  //           description: "Failed to fetch profile data.",
  //           variant: "destructive",
  //         });
  //       }
  //     } catch (error) {
  //       console.error('There was an error sending the request!', error);
  //       toast({
  //           title: "Error",
  //           description: "An unexpected error occurred.",
  //           variant: "destructive",
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchProfileData();
  // }, [navigate, toast]); // Dependencies for the useEffect hook




  // Mock learning data
  const learningStats = {
    recentContent: [
      { title: "Spanish News Article: Climate Change", date: "2 hours ago", type: "Article" },
      { title: "French YouTube: Cooking Tutorial", date: "1 day ago", type: "Video" },
      { title: "German Podcast: Technology Trends", date: "3 days ago", type: "Audio" }
    ],
    totalHours: 47,
    vocabularyWords: 1247
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API update
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    }, 1000);
  };

  const handleLogout = async () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    // Simulate logout
    await logout();
    // setTimeout(() => navigate("/login"), 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileData({...profileData, profilePicture: file});
      toast({
        title: "Photo Selected",
        description: "Profile picture updated successfully.",
      });
    }
  };

  if (!user) {
    // return <div>Loading...</div>;
    return (
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
    );
  }


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
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600 hover:text-cyan-600"
              title="Dashboard"
            >
              <Home size={20} />
            </Link>
            <Link
              to="/settings"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-cyan-600"
              title="Settings"
            >
              <SettingsIcon size={20} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-light text-gray-900 mb-4">Settings</h2>
          <p className="text-lg text-gray-600">
            Manage your account and learning preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User size={16} />
              <span>User Profile</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center space-x-2">
              <SettingsIcon size={16} />
              <span>Account</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card className="rounded-2xl border border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User size={20} />
                  <span>Basic Information</span>
                </CardTitle>
                <CardDescription>
                  Update your personal information and profile settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                        {profileData.profilePicture ? (
                          <img 
                            src={URL.createObjectURL(profileData.profilePicture)} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User size={32} className="text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="profilePicture" className="cursor-pointer">
                        <div className="flex items-center space-x-2 text-sm text-cyan-600 hover:text-cyan-700">
                          <Camera size={16} />
                          <span>Change Photo</span>
                        </div>
                      </Label>
                      <Input
                        id="profilePicture"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                        Username
                      </Label>
                      <Input
                        id="username"
                        type="text"
                        value={profileData.username}
                        onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                        className="rounded-xl border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        className="rounded-xl border-gray-300 focus:border-cyan-500 focus:ring-cyan-500"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl px-6 py-2 transition-all duration-200"
                  >
                    {isLoading ? "Updating..." : "Update Profile"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-gray-200">
              <CardHeader>
                <CardTitle>Learning History</CardTitle>
                <CardDescription>
                  Track your progress and recent activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-cyan-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-cyan-600">{learningStats.totalHours}</div>
                    <div className="text-sm text-gray-600">Total Hours</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{learningStats.vocabularyWords}</div>
                    <div className="text-sm text-gray-600">Words Learned</div>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{learningStats.recentContent.length}</div>
                    <div className="text-sm text-gray-600">Recent Items</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Recently Watched Content</h4>
                  <div className="space-y-2">
                    {learningStats.recentContent.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-gray-900 text-sm">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.type} • {item.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card className="rounded-2xl border border-gray-200">
              <CardHeader>
                <CardTitle className="text-red-600">Account Actions</CardTitle>
                <CardDescription>
                  Manage your account settings and logout
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border border-red-200 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Logout</h4>
                      <p className="text-sm text-gray-600">
                        Sign out of your VORP account on this device
                      </p>
                    </div>
                    <Button
                      onClick={handleLogout}
                      variant="destructive"
                      className="rounded-xl"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Upgrade Plan</h4>
                      <p className="text-sm text-gray-600">
                        Access premium features and unlimited content
                      </p>
                    </div>
                    <Button
                      onClick={() => navigate("/pricing")}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl"
                    >
                      View Plans
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;

// https://vorp.onrender.com/vocabulary-test/