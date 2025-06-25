
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CreateCityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCity: (name: string, gradient: string) => void;
}

const CITY_GRADIENTS = [
  { name: 'Sunset Dreams', value: 'from-pink-400 via-purple-400 to-orange-300' },
  { name: 'Ocean Breeze', value: 'from-blue-400 via-cyan-300 to-teal-300' },
  { name: 'Forest Magic', value: 'from-green-400 via-emerald-300 to-lime-300' },
  { name: 'Cherry Blossom', value: 'from-pink-300 via-rose-300 to-red-300' },
  { name: 'Lavender Fields', value: 'from-purple-300 via-violet-300 to-indigo-300' },
  { name: 'Golden Hour', value: 'from-yellow-300 via-amber-300 to-orange-300' },
  { name: 'Mint Chocolate', value: 'from-green-300 via-teal-300 to-cyan-300' },
  { name: 'Cotton Candy', value: 'from-pink-200 via-purple-200 to-blue-200' },
];

const CreateCityModal = ({ isOpen, onClose, onCreateCity }: CreateCityModalProps) => {
  const [name, setName] = useState('');
  const [selectedGradient, setSelectedGradient] = useState(CITY_GRADIENTS[0].value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreateCity(name.trim(), selectedGradient);
      setName('');
      setSelectedGradient(CITY_GRADIENTS[0].value);
    }
  };

  const handleClose = () => {
    setName('');
    setSelectedGradient(CITY_GRADIENTS[0].value);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-fredoka">
            🏙️ Create Your Study City
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="cityName" className="text-lg font-semibold text-gray-700 font-comic-neue">
              Subject Name ✨
            </Label>
            <Input
              id="cityName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Mathematics, Psychology, Art..."
              className="w-full text-lg font-comic-neue border-2 border-pink-200 focus:border-purple-400 rounded-xl"
              autoFocus
            />
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-semibold text-gray-700 font-comic-neue">
              Choose Your City Theme 🎨
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {CITY_GRADIENTS.map((gradient) => (
                <button
                  key={gradient.value}
                  type="button"
                  onClick={() => setSelectedGradient(gradient.value)}
                  className={`w-full h-16 rounded-xl border-3 transition-all duration-300 hover:scale-105 bg-gradient-to-r ${gradient.value} ${
                    selectedGradient === gradient.value 
                      ? 'border-purple-500 ring-4 ring-purple-200 scale-105' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  title={gradient.name}
                >
                  <div className="text-white font-bold text-sm font-comic-neue drop-shadow-lg">
                    {gradient.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="font-comic-neue">
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!name.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-fredoka font-bold text-lg px-6"
            >
              Create City 🏗️
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCityModal;
