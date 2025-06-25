
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface StartStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  cityName: string;
  cityColor: string;
  onStartStudy: (goalMinutes: number) => void;
}

const StartStudyModal = ({ isOpen, onClose, cityName, cityColor, onStartStudy }: StartStudyModalProps) => {
  const [goalMinutes, setGoalMinutes] = useState([45]);

  const handleStart = () => {
    onStartStudy(goalMinutes[0]);
  };

  const getRewardPreview = (minutes: number) => {
    const baseCoins = Math.floor(minutes / 5);
    const bonusCoins = 10;
    const totalCoins = baseCoins + bonusCoins;
    const rooms = Math.floor(minutes / 30);
    
    return { totalCoins, rooms };
  };

  const reward = getRewardPreview(goalMinutes[0]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800 flex items-center gap-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: cityColor }}
            />
            Study Session: {cityName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">
              Study Goal: {goalMinutes[0]} minutes
            </Label>
            <Slider
              value={goalMinutes}
              onValueChange={setGoalMinutes}
              max={180}
              min={30}
              step={15}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>30 min</span>
              <span>3 hours</span>
            </div>
          </div>

          {/* Reward Preview */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-800 mb-2">If you complete this session:</h3>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-yellow-600">💰</span>
                <span className="text-gray-700">Earn {reward.totalCoins} coins</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-blue-600">🏢</span>
                <span className="text-gray-700">Build a new full-height building</span>
              </div>
              {reward.rooms > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-purple-600">🏠</span>
                  <span className="text-gray-700">Unlock {reward.rooms} room{reward.rooms > 1 ? 's' : ''} to decorate</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <p className="text-sm text-orange-800">
              <strong>⚠️ Remember:</strong> If you don't meet your goal, your building will be shorter - a gentle reminder to stay focused next time!
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleStart}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-medium"
            >
              Start Studying
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StartStudyModal;
