
import { useState, useEffect } from 'react';
import { Pause, Play, Square, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface StudyTimerProps {
  cityName: string;
  cityGradient: string;
  goalMinutes: number;
  onComplete: (actualMinutes: number) => void;
  onCancel: () => void;
}

const StudyTimer = ({ cityName, cityGradient, goalMinutes, onComplete, onCancel }: StudyTimerProps) => {
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
    <div className={`min-h-screen bg-gradient-to-br ${cityGradient} flex items-center justify-center p-4`}>
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-lg border-0 shadow-2xl rounded-2xl">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div 
                  className={`w-4 h-4 rounded-full bg-gradient-to-r ${cityGradient} shadow-lg`}
                />
                <h1 className="text-xl font-bold text-gray-800 font-fredoka">{cityName}</h1>
              </div>
              <p className="text-sm text-gray-600 font-comic-neue">
                Goal: {goalMinutes} minutes 🎯
              </p>
            </div>

            {/* Timer Display */}
            <div className="space-y-6">
              <div className="text-6xl font-mono font-bold text-gray-800 font-fredoka">
                {formatTime(timeElapsed)}
              </div>
              
              {/* Progress Ring */}
              <div className="relative w-36 h-36 mx-auto">
                <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-pink-200"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke={goalMet ? '#10b981' : '#ec4899'}
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
                    <div className="text-3xl font-bold font-fredoka" style={{ color: goalMet ? '#10b981' : '#ec4899' }}>
                      {Math.round(progress)}%
                    </div>
                    {goalMet && (
                      <div className="text-green-600 text-sm font-bold font-comic-neue">Goal Met! 🎉</div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-3">
              <div className="text-sm text-gray-600 font-comic-neue">
                {currentMinutes} of {goalMinutes} minutes completed
              </div>
              {goalMet && (
                <div className="text-green-600 font-bold font-comic-neue text-lg">
                  🏆 Amazing work! Keep going for extra coins! ✨
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex gap-3 justify-center">
              <Button
                variant="outline"
                size="lg"
                onClick={onCancel}
                className="bg-white/70 font-comic-neue"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={toggleTimer}
                className="bg-white/70 font-comic-neue"
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
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-fredoka font-bold"
                disabled={currentMinutes < 1} // Minimum 1 minute to finish for testing
              >
                <Square className="w-4 h-4 mr-2" />
                Finish
              </Button>
            </div>

            {currentMinutes < 1 && (
              <p className="text-xs text-gray-500 font-comic-neue">
                Study for at least 1 minute to finish your session ⏰
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyTimer;
