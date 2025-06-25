
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
import RoomDecorator from './RoomDecorator';

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`sm:max-w-2xl bg-gradient-to-br ${cityGradient} border-0`}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white drop-shadow-lg font-fredoka">
            🏠 Decorate Your Room
          </DialogTitle>
          <div className="text-center text-white/90 font-comic-neue">
            {building.sessionDuration}min session • {building.completed ? 'Complete ✓' : 'Incomplete ⚠️'}
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          <RoomDecorator
            decorations={building.decorations}
            availableDecorations={DECORATIONS}
            totalCoins={totalCoins}
            onPurchaseDecoration={onPurchaseDecoration}
          />

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
