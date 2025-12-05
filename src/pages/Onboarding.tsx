import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart3, Bell, Target, ArrowRight, Check } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Welcome to TradeIQ',
    description: 'Your intelligent trading companion powered by AI',
    icon: TrendingUp,
    content: 'TradeIQ analyzes market data, news, and on-chain metrics to provide you with actionable trading signals.',
  },
  {
    id: 2,
    title: 'Track Your Performance',
    description: 'Comprehensive analytics for better decisions',
    icon: BarChart3,
    content: 'Monitor your trading performance with detailed charts, win rates, and AI-powered insights.',
  },
  {
    id: 3,
    title: 'Smart Alerts',
    description: 'Never miss an opportunity',
    icon: Bell,
    content: 'Set up custom alerts for price movements, signal changes, and important market events.',
  },
  {
    id: 4,
    title: 'Ready to Trade',
    description: 'Your dashboard awaits',
    icon: Target,
    content: "You're all set! Head to your dashboard to start receiving trading signals and insights.",
  },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/', { replace: true });
    }
  };

  const handleSkip = () => {
    navigate('/', { replace: true });
  };

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg space-y-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">TradeIQ</span>
        </div>

        <Card className="border-border bg-card">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CurrentIcon className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">{steps[currentStep].title}</CardTitle>
            <CardDescription>{steps[currentStep].description}</CardDescription>
          </CardHeader>
          
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              {steps[currentStep].content}
            </p>
            
            {user && currentStep === 0 && (
              <p className="mt-4 text-foreground font-medium">
                Welcome, {user.fullName}! 👋
              </p>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            {/* Progress indicators */}
            <div className="flex justify-center gap-2 w-full">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'w-8 bg-primary'
                      : index < currentStep
                      ? 'w-2 bg-primary'
                      : 'w-2 bg-muted'
                  }`}
                />
              ))}
            </div>
            
            <div className="flex w-full gap-3">
              {currentStep < steps.length - 1 && (
                <Button variant="ghost" onClick={handleSkip} className="flex-1">
                  Skip
                </Button>
              )}
              <Button onClick={handleNext} className={currentStep < steps.length - 1 ? 'flex-1' : 'w-full'}>
                {currentStep < steps.length - 1 ? (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Go to Dashboard
                    <Check className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
