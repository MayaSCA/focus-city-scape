
import { useState, useEffect } from 'react';
import { Pause, Play, Square, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface StudyTimerProps {
  cityName: string;
  cityColor: string;
  goalMinutes: number;
  onComplete: (actualMinutes: number) => void;
  onCancel: () => void;
}

const StudyTimer = ({ cityName, cityColor, goalMinutes, onComplete, onCancel }: StudyTimerProps) => {
  const [timeElapsed, setTimeElapsed] = useState(0); // in seconds
  const [isRunning, setIsRunning] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && !isCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isCompleted]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const minutes = timeElapsed / 60;
    return Math.min(100, (minutes / goalMinutes) * 100);
  };

  const handleFinish = () => {
    const actualMinutes = Math.floor(timeElapsed / 60);
    setIsCompleted(true);
    setIsRunning(false);
    onComplete(actualMinutes);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const progress = getProgress();
  const currentMinutes = Math.floor(timeElapsed / 60);
  const goalMet = currentMinutes >= goalMinutes;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: cityColor }}
                />
                <h1 className="text-lg font-semibold text-gray-800">{cityName}</h1>
              </div>
              <p className="text-sm text-gray-600">
                Goal: {goalMinutes} minutes
              </p>
            </div>

            {/* Timer Display */}
            <div className="space-y-4">
              <div className="text-6xl font-mono font-bold text-gray-800">
                {formatTime(timeElapsed)}
              </div>
              
              {/* Progress Ring */}
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke={goalMet ? '#10b981' : cityColor}
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - progress / 100)}`}
                    className="transition-all duration-500 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: goalMet ? '#10b981' : cityColor }}>
                      {Math.round(progress)}%
                    </div>
                    {goalMet && (
                      <div className="text-green-600 text-xs font-medium">Goal Met! 🎉</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <div className="text-sm text-gray-600">
                {currentMinutes} of {goalMinutes} minutes completed
              </div>
              {goalMet && (
                <div className="text-green-600 font-medium">
                  🏆 Excellent work! Keep going to earn more coins!
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={onCancel}
                className="bg-white/50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={toggleTimer}
                className="bg-white/50"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </>
                )}
              </Button>
              
              <Button
                size="lg"
                onClick={handleFinish}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                disabled={currentMinutes < 5} // Minimum 5 minutes to finish
              >
                <Square className="w-4 h-4 mr-2" />
                Finish
              </Button>
            </div>

            {currentMinutes < 5 && (
              <p className="text-xs text-gray-500">
                Study for at least 5 minutes to finish your session
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyTimer;
