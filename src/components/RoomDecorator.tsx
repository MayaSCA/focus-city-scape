
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface RoomDecoratorProps {
  decorations: string[];
  availableDecorations: Array<{ id: string; name: string; cost: number }>;
  totalCoins: number;
  onPurchaseDecoration: (decorationId: string, cost: number) => void;
}

const DECORATION_POSITIONS = {
  plant: { x: 20, y: 70 },
  lamp: { x: 80, y: 30 },
  bookshelf: { x: 5, y: 10 },
  desk: { x: 60, y: 60 },
  poster: { x: 50, y: 15 },
  window: { x: 75, y: 10 },
  carpet: { x: 40, y: 80 },
  mirror: { x: 85, y: 50 },
};

const RoomDecorator = ({ 
  decorations, 
  availableDecorations, 
  totalCoins, 
  onPurchaseDecoration 
}: RoomDecoratorProps) => {
  const handlePurchase = (decoration: typeof availableDecorations[0]) => {
    if (totalCoins >= decoration.cost && !decorations.includes(decoration.id)) {
      onPurchaseDecoration(decoration.id, decoration.cost);
    }
  };

  return (
    <div className="space-y-6">
      {/* Room View */}
      <div className="bg-gradient-to-b from-blue-100 to-blue-50 rounded-lg p-6 relative h-64 border-2 border-blue-200">
        <div className="absolute inset-0 rounded-lg overflow-hidden">
          {/* Room background */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-200 to-amber-100 rounded-b-lg"></div>
          
          {/* Placed decorations */}
          {decorations.map(decorationId => {
            const decoration = availableDecorations.find(d => d.id === decorationId);
            const position = DECORATION_POSITIONS[decorationId as keyof typeof DECORATION_POSITIONS];
            
            if (!decoration || !position) return null;
            
            return (
              <div
                key={decorationId}
                className="absolute text-2xl transform transition-all duration-300 hover:scale-110"
                style={{ 
                  left: `${position.x}%`, 
                  top: `${position.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                title={decoration.name}
              >
                {decoration.name.split(' ')[0]}
              </div>
            );
          })}
          
          {/* Empty room message */}
          {decorations.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">🏠</div>
                <div className="text-sm font-comic-neue">Your room is empty!</div>
                <div className="text-xs text-gray-400">Purchase decorations to make it cozy</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Available Decorations */}
      <div className="space-y-4">
        <h3 className="text-white font-bold text-lg font-fredoka">Available Decorations:</h3>
        <div className="grid grid-cols-2 gap-3">
          {availableDecorations.map(decoration => {
            const isOwned = decorations.includes(decoration.id);
            const canAfford = totalCoins >= decoration.cost;
            
            return (
              <Button
                key={decoration.id}
                onClick={() => handlePurchase(decoration)}
                disabled={isOwned || !canAfford}
                className={`text-sm p-3 h-auto ${
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
                    {isOwned ? 'Owned ✓' : `${decoration.cost} coins`}
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
    </div>
  );
};

export default RoomDecorator;
