
import { useState } from 'react';
import { Play, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { City } from '@/pages/Index';
import StartStudyModal from './StartStudyModal';

interface CityCardProps {
  city: City;
  onStartStudy: (goalMinutes: number) => void;
  onViewCity: () => void;
  onDeleteCity: () => void;
}

const CityCard = ({ city, onStartStudy, onViewCity, onDeleteCity }: CityCardProps) => {
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);

  const completedBuildings = city.buildings.filter(b => b.completed).length;
  const totalBuildings = city.buildings.length;
  const totalStudyTime = city.buildings.reduce((total, building) => total + building.sessionDuration, 0);

  return (
    <>
      <Card className={`bg-gradient-to-br ${city.gradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden`}>
        <CardHeader className="relative">
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onDeleteCity}
              className="text-white/70 hover:text-white hover:bg-white/20 p-1 h-8 w-8"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <CardTitle className="text-2xl font-bold text-white drop-shadow-lg font-fredoka">
            {city.name}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-white font-bold text-lg font-fredoka">{totalBuildings}</div>
              <div className="text-white/80 text-sm font-comic-neue">Buildings</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-white font-bold text-lg font-fredoka">{city.totalCoins}</div>
              <div className="text-white/80 text-sm font-comic-neue">Coins</div>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-white/90 text-sm font-comic-neue">
              <span>Completed Sessions</span>
              <span>{completedBuildings}/{totalBuildings}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{ width: totalBuildings > 0 ? `${(completedBuildings / totalBuildings) * 100}%` : '0%' }}
              />
            </div>
          </div>

          {/* Study Time */}
          <div className="text-center">
            <Badge className="bg-white/20 text-white font-comic-neue">
              ⏰ {Math.floor(totalStudyTime / 60)}h {totalStudyTime % 60}m studied
            </Badge>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button 
              onClick={() => setIsStartModalOpen(true)}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white font-bold font-fredoka"
              size="sm"
            >
              <Play className="w-4 h-4 mr-2" />
              Study
            </Button>
            <Button 
              onClick={onViewCity}
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-comic-neue"
              size="sm"
            >
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
          </div>
        </CardContent>
      </Card>

      <StartStudyModal
        isOpen={isStartModalOpen}
        onClose={() => setIsStartModalOpen(false)}
        cityName={city.name}
        cityGradient={city.gradient}
        onStartStudy={onStartStudy}
      />
    </>
  );
};

export default CityCard;
