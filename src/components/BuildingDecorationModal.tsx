
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Building } from '@/pages/Index';

interface BuildingDecorationModalProps {
  isOpen: boolean;
  onClose: () => void;
  building: Building | null;
  cityGradient: string;
  totalCoins: number;
  onPurchaseDecoration: (decorationId: string, cost: number) => void;
}

const DECORATIONS = [
  { id: 'plant', name: '🌱 Plant', cost: 5 },
  { id: 'lamp', name: '💡 Lamp', cost: 8 },
  { id: 'bookshelf', name: '📚 Bookshelf', cost: 12 },
  { id: 'desk', name: '🪑 Desk', cost: 15 },
  { id: 'poster', name: '🖼️ Poster', cost: 10 },
  { id: 'window', name: '🪟 Window', cost: 20 },
  { id: 'carpet', name: '🟫 Carpet', cost: 18 },
  { id: 'mirror', name: '🪞 Mirror', cost: 25 },
];

const BuildingDecorationModal = ({ 
  isOpen, 
  onClose, 
  building, 
  cityGradient, 
  totalCoins,
  onPurchaseDecoration 
}: BuildingDecorationModalProps) => {
  if (!building) return null;

  const handlePurchase = (decoration: typeof DECORATIONS[0]) => {
    if (totalCoins >= decoration.cost && !building.decorations.includes(decoration.id)) {
      onPurchaseDecoration(decoration.id, decoration.cost);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-md bg-gradient-to-br ${cityGradient} border-0`}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white drop-shadow-lg font-fredoka">
            🏢 Decorate Building
          </DialogTitle>
          <div className="text-center text-white/90 font-comic-neue">
            {building.sessionDuration}min session • {building.completed ? 'Complete ✓' : 'Incomplete ⚠️'}
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Current Decorations */}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-white font-bold mb-2 font-fredoka">Current Decorations:</h3>
            <div className="flex flex-wrap gap-2">
              {building.decorations.length > 0 ? (
                building.decorations.map(decorationId => {
                  const decoration = DECORATIONS.find(d => d.id === decorationId);
                  return decoration ? (
                    <Badge key={decorationId} className="bg-white/30 text-white font-comic-neue">
                      {decoration.name}
                    </Badge>
                  ) : null;
                })
              ) : (
                <div className="text-white/70 text-sm font-comic-neue">No decorations yet</div>
              )}
            </div>
          </div>

          {/* Available Decorations */}
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <h3 className="text-white font-bold mb-2 font-fredoka">Available Decorations:</h3>
            <div className="grid grid-cols-2 gap-2">
              {DECORATIONS.map(decoration => {
                const isOwned = building.decorations.includes(decoration.id);
                const canAfford = totalCoins >= decoration.cost;
                
                return (
                  <Button
                    key={decoration.id}
                    onClick={() => handlePurchase(decoration)}
                    disabled={isOwned || !canAfford}
                    className={`text-sm p-2 h-auto ${
                      isOwned 
                        ? 'bg-green-500/50 text-white cursor-not-allowed' 
                        : canAfford
                        ? 'bg-white/20 hover:bg-white/30 text-white'
                        : 'bg-gray-500/50 text-white/50 cursor-not-allowed'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-comic-neue">{decoration.name}</div>
                      <div className="text-xs">
                        {isOwned ? 'Owned' : `${decoration.cost} coins`}
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Coins Display */}
          <div className="text-center">
            <Badge className="bg-yellow-400 text-yellow-900 font-bold font-fredoka">
              💰 {totalCoins} coins available
            </Badge>
          </div>

          <div className="flex justify-end pt-4">
            <Button 
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 text-white font-comic-neue"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuildingDecorationModal;
