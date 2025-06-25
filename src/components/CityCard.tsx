
import { useState } from 'react';
import { Play, Eye, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { City } from '@/pages/Index';
import StartStudyModal from './StartStudyModal';

interface CityCardProps {
  city: City;
  onStartStudy: (goalMinutes: number) => void;
}

const CityCard = ({ city, onStartStudy }: CityCardProps) => {
  const [isStartStudyOpen, setIsStartStudyOpen] = useState(false);
  
  const completedBuildings = city.buildings.filter(b => b.completed).length;
  const totalRooms = city.buildings.reduce((total, building) => total + building.roomsUnlocked, 0);

  return (
    <>
      <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0 bg-white/60 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full shadow-sm"
                style={{ backgroundColor: city.color }}
              />
              <CardTitle className="text-lg font-semibold text-gray-800">
                {city.name}
              </CardTitle>
            </div>
            <Badge 
              variant="secondary" 
              className="bg-yellow-100 text-yellow-800 border-yellow-200"
            >
              <Coins className="w-3 h-3 mr-1" />
              {city.totalCoins}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* City Skyline Visualization */}
          <div className="h-32 bg-gradient-to-b from-blue-100 to-green-100 rounded-lg p-4 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1">
              {city.buildings.length === 0 ? (
                <div className="text-center text-gray-500 text-sm absolute inset-0 flex items-center justify-center">
                  <div>
                    <div className="text-2xl mb-1">🏗️</div>
                    <div>No buildings yet</div>
                  </div>
                </div>
              ) : (
                city.buildings.slice(0, 8).map((building, index) => (
                  <div
                    key={building.id}
                    className={`w-6 rounded-t-sm transition-all duration-500 ${
                      building.completed 
                        ? 'bg-gradient-to-t from-blue-400 to-blue-500' 
                        : 'bg-gradient-to-t from-gray-300 to-gray-400'
                    }`}
                    style={{ 
                      height: `${Math.max(20, building.height * 0.8)}px`,
                      animationDelay: `${index * 100}ms`
                    }}
                    title={`${building.sessionDuration}min session ${building.completed ? '✓' : '⚠️'}`}
                  />
                ))
              )}
              {city.buildings.length > 8 && (
                <div className="text-xs text-gray-500 ml-2 flex items-end pb-1">
                  +{city.buildings.length - 8}
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white/50 rounded-lg p-3">
              <div className="text-lg font-bold text-gray-800">{city.buildings.length}</div>
              <div className="text-xs text-gray-600">Buildings</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="text-lg font-bold text-green-600">{completedBuildings}</div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="text-lg font-bold text-purple-600">{totalRooms}</div>
              <div className="text-xs text-gray-600">Rooms</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsStartStudyOpen(true)}
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium"
            >
              <Play className="w-4 h-4 mr-2" />
              Study
            </Button>
            <Button 
              variant="outline" 
              className="bg-white/50 hover:bg-white/80 border-gray-200"
              disabled={totalRooms === 0}
            >
              <Eye className="w-4 h-4 mr-2" />
              Rooms
            </Button>
          </div>
        </CardContent>
      </Card>

      <StartStudyModal
        isOpen={isStartStudyOpen}
        onClose={() => setIsStartStudyOpen(false)}
        cityName={city.name}
        cityColor={city.color}
        onStartStudy={onStartStudy}
      />
    </>
  );
};

export default CityCard;
