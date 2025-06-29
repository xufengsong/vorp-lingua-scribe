
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "Basic content analysis",
      "5 analyses per day",
      "Community support",
      "Basic vocabulary tracking"
    ],
    buttonText: "Get Started",
    popular: false,
    variant: "outline" as const
  },
  {
    name: "Pro",
    price: "$25",
    description: "Most popular for serious learners",
    features: [
      "Unlimited content analysis",
      "Advanced AI recommendations",
      "Progress tracking & analytics",
      "Priority support",
      "Custom learning paths",
      "Export learning materials"
    ],
    buttonText: "Choose Pro",
    popular: true,
    variant: "default" as const
  },
  {
    name: "Premium",
    price: "$40",
    description: "Complete language learning suite",
    features: [
      "Everything in Pro",
      "1-on-1 tutoring sessions",
      "Advanced speech recognition",
      "Personalized curriculum",
      "Offline mode access",
      "Premium content library",
      "White-glove onboarding"
    ],
    buttonText: "Choose Premium",
    popular: false,
    variant: "default" as const
  }
];

const Pricing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handlePlanSelect = async (planName: string) => {
    setIsLoading(planName);
    
    if (planName === "Free") {
      setTimeout(() => {
        setIsLoading(null);
        toast({
          title: "Welcome to VORP Free!",
          description: "You can start learning immediately.",
        });
        navigate("/dashboard");
      }, 1000);
    } else {
      // Simulate payment flow
      setTimeout(() => {
        setIsLoading(null);
        toast({
          title: "Payment Required",
          description: `Redirecting to payment for ${planName} plan...`,
        });
        // In real app, redirect to payment processor
        navigate("/payment");
      }, 1500);
    }
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
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Choose Your Learning Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan to accelerate your language learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative rounded-2xl border transition-all duration-200 hover:shadow-lg ${
                plan.popular 
                  ? 'border-cyan-500 shadow-lg ring-2 ring-cyan-200' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-cyan-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-6 pt-8">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {plan.name}
                </CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.price !== "$0" && <span className="text-gray-600">/month</span>}
                </div>
                <CardDescription className="text-gray-600 mt-2">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-cyan-100 rounded-full flex items-center justify-center mt-0.5">
                        <svg className="w-3 h-3 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handlePlanSelect(plan.name)}
                  disabled={isLoading === plan.name}
                  variant={plan.variant}
                  className={`w-full rounded-xl py-3 text-base font-medium transition-all duration-200 ${
                    plan.popular 
                      ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
                      : plan.name === 'Free'
                      ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      : 'bg-gray-900 hover:bg-gray-800 text-white'
                  }`}
                >
                  {isLoading === plan.name ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    plan.buttonText
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            All plans include a 14-day free trial. Cancel anytime.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Pricing;
