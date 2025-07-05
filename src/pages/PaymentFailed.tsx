
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Settings, X } from "lucide-react";

const PaymentFailed = () => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    console.log("Redirecting to payment page...");
    navigate("/payment");
  };

  const handleContactSupport = () => {
    console.log("Opening support contact...");
    // Could open email client or navigate to support page
    window.location.href = "mailto:support@vorp.com";
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
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full text-center space-y-8">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center animate-scale-in">
              <X size={40} className="text-red-600" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-3xl font-light text-gray-900">
              Payment Failed
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              We couldn't process your payment. Please check your payment details and try again, or contact support if the issue persists.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleTryAgain}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl py-3 text-base font-medium transition-all duration-200"
            >
              Try Again
            </Button>
            
            <Button
              onClick={handleContactSupport}
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-3 text-base font-medium transition-all duration-200"
            >
              Contact Support
            </Button>
          </div>

          {/* Optional Footer */}
          <div className="pt-8">
            <p className="text-sm text-gray-400">
              <Link to="/" className="text-cyan-600 hover:text-cyan-700 underline">Return to Home</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentFailed;
