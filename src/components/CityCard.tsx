
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
  onViewCity: () => void;
}

const CityCard = ({ city, onStartStudy, onViewCity }: CityCardProps) => {
  const [isStartStudyOpen, setIsStartStudyOpen] = useState(false);
  
  const completedBuildings = city.buildings.filter(b => b.completed).length;
  const totalRooms = city.buildings.reduce((total, building) => total + building.roomsUnlocked, 0);

  return (
    <>
      <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border-0 bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className={`w-6 h-6 rounded-full shadow-lg bg-gradient-to-r ${city.gradient}`}
              />
              <CardTitle className="text-xl font-bold text-gray-800 font-fredoka">
                {city.name}
              </CardTitle>
            </div>
            <Badge 
              variant="secondary" 
              className="bg-gradient-to-r from-yellow-200 to-orange-200 text-orange-800 border-orange-300 font-comic-neue"
            >
              <Coins className="w-3 h-3 mr-1" />
              {city.totalCoins}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* City Skyline Visualization */}
          <div className={`h-40 bg-gradient-to-b from-sky-200 to-green-200 rounded-xl p-4 relative overflow-hidden shadow-inner`}>
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1">
              {city.buildings.length === 0 ? (
                <div className="text-center text-gray-600 text-sm absolute inset-0 flex items-center justify-center">
                  <div>
                    <div className="text-4xl mb-2">🏗️</div>
                    <div className="font-comic-neue font-semibold">Ready to build!</div>
                  </div>
                </div>
              ) : (
                city.buildings.slice(0, 10).map((building, index) => {
                  const height = Math.max(25, building.height * 0.9);
                  const buildingType = building.sessionDuration >= 60 ? '🏢' : building.completed ? '🏠' : '🏘️';
                  
                  return (
                    <div key={building.id} className="relative group">
                      <div
                        className={`w-7 rounded-t-lg transition-all duration-700 shadow-lg ${
                          building.completed 
                            ? 'bg-gradient-to-t from-blue-500 to-blue-300' 
                            : 'bg-gradient-to-t from-gray-400 to-gray-300'
                        }`}
                        style={{ 
                          height: `${height}px`,
                          animationDelay: `${index * 100}ms`
                        }}
                        title={`${building.sessionDuration}min session ${building.completed ? '✓' : '⚠️'}`}
                      />
                      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        {buildingType}
                      </div>
                    </div>
                  );
                })
              )}
              {city.buildings.length > 10 && (
                <div className="text-xs text-gray-600 ml-2 flex items-end pb-1 font-comic-neue">
                  +{city.buildings.length - 10} more
                </div>
              )}
            </div>
            
            {/* Decorative elements */}
            {completedBuildings > 3 && (
              <div className="absolute bottom-1 right-2 text-lg animate-bounce">🌳</div>
            )}
            {completedBuildings > 5 && (
              <div className="absolute bottom-1 left-2 text-lg animate-bounce" style={{ animationDelay: '0.5s' }}>🎠</div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-gradient-to-br from-white/60 to-white/40 rounded-xl p-3 backdrop-blur-sm">
              <div className="text-xl font-bold text-gray-800 font-fredoka">{city.buildings.length}</div>
              <div className="text-xs text-gray-600 font-comic-neue">Buildings</div>
            </div>
            <div className="bg-gradient-to-br from-green-100/60 to-green-100/40 rounded-xl p-3 backdrop-blur-sm">
              <div className="text-xl font-bold text-green-600 font-fredoka">{completedBuildings}</div>
              <div className="text-xs text-gray-600 font-comic-neue">Completed</div>
            </div>
            <div className="bg-gradient-to-br from-purple-100/60 to-purple-100/40 rounded-xl p-3 backdrop-blur-sm">
              <div className="text-xl font-bold text-purple-600 font-fredoka">{totalRooms}</div>
              <div className="text-xs text-gray-600 font-comic-neue">Rooms</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsStartStudyOpen(true)}
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold font-comic-neue rounded-xl"
            >
              <Play className="w-4 h-4 mr-2" />
              Study
            </Button>
            <Button 
              onClick={onViewCity}
              variant="outline" 
              className="bg-white/60 hover:bg-white/80 border-2 border-purple-200 hover:border-purple-400 font-comic-neue rounded-xl"
            >
              <Eye className="w-4 h-4 mr-2" />
              View City
            </Button>
          </div>
        </CardContent>
      </Card>

      <StartStudyModal
        isOpen={isStartStudyOpen}
        onClose={() => setIsStartStudyOpen(false)}
        cityName={city.name}
        cityGradient={city.gradient}
        onStartStudy={onStartStudy}
      />
    </>
  );
};

export default CityCard;
