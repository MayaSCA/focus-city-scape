
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
  cityGradient: string;
  onStartStudy: (goalMinutes: number) => void;
}

const StartStudyModal = ({ isOpen, onClose, cityName, cityGradient, onStartStudy }: StartStudyModalProps) => {
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
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800 flex items-center gap-3 font-fredoka">
            <div 
              className={`w-6 h-6 rounded-full bg-gradient-to-r ${cityGradient} shadow-lg`}
            />
            Study Session: {cityName} 📚
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-gray-700 font-comic-neue">
              Study Goal: {goalMinutes[0]} minutes ⏰
            </Label>
            <Slider
              value={goalMinutes}
              onValueChange={setGoalMinutes}
              max={180}
              min={1}
              step={15}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 font-comic-neue">
              <span>1 min</span>
              <span>3 hours</span>
            </div>
          </div>

          {/* Reward Preview */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-xl p-4">
            <h3 className="font-bold text-gray-800 mb-3 font-fredoka text-lg">🎁 Study Rewards:</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-comic-neue">
                <span className="text-2xl">💰</span>
                <span className="text-gray-700 font-semibold">Earn {reward.totalCoins} coins</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-comic-neue">
                <span className="text-2xl">🏢</span>
                <span className="text-gray-700 font-semibold">Build a beautiful new structure</span>
              </div>
              {reward.rooms > 0 && (
                <div className="flex items-center gap-2 text-sm font-comic-neue">
                  <span className="text-2xl">🏠</span>
                  <span className="text-gray-700 font-semibold">Unlock {reward.rooms} decoration space{reward.rooms > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-100 to-pink-100 border-2 border-orange-300 rounded-xl p-4">
            <p className="text-sm text-orange-800 font-comic-neue">
              <strong>⚠️ Remember:</strong> Short buildings are cute too, but tall ones unlock more goodies! 🎈
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="font-comic-neue">
              Cancel
            </Button>
            <Button 
              onClick={handleStart}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 font-fredoka font-bold text-lg px-6"
            >
              Start Studying! 🚀
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StartStudyModal;
