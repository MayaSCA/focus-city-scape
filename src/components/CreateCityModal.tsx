
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
  onCreateCity: (name: string, color: string) => void;
}

const CITY_COLORS = [
  { name: 'Ocean Blue', value: '#0ea5e9' },
  { name: 'Forest Green', value: '#10b981' },
  { name: 'Sunset Orange', value: '#f59e0b' },
  { name: 'Royal Purple', value: '#8b5cf6' },
  { name: 'Rose Pink', value: '#ec4899' },
  { name: 'Coral Red', value: '#ef4444' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Indigo', value: '#6366f1' },
];

const CreateCityModal = ({ isOpen, onClose, onCreateCity }: CreateCityModalProps) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(CITY_COLORS[0].value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreateCity(name.trim(), selectedColor);
      setName('');
      setSelectedColor(CITY_COLORS[0].value);
    }
  };

  const handleClose = () => {
    setName('');
    setSelectedColor(CITY_COLORS[0].value);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Create New Study City
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="cityName" className="text-sm font-medium text-gray-700">
              Subject Name
            </Label>
            <Input
              id="cityName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Mathematics, Psychology, Biology..."
              className="w-full"
              autoFocus
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
              City Color
            </Label>
            <div className="grid grid-cols-4 gap-3">
              {CITY_COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-full h-12 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    selectedColor === color.value 
                      ? 'border-gray-400 ring-2 ring-gray-300' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!name.trim()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Create City
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCityModal;
