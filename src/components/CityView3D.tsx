
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { City, Building } from '@/pages/Index';

interface CityView3DProps {
  city: City;
  onBack: () => void;
}

const CityView3D = ({ city, onBack }: CityView3DProps) => {
  const getBuildingType = (building: Building) => {
    if (building.sessionDuration >= 120) return 'skyscraper';
    if (building.sessionDuration >= 60) return 'office';
    if (building.completed) return 'house';
    return 'small';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${city.gradient} p-4`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            onClick={onBack}
            variant="outline"
            className="bg-white/80 backdrop-blur-sm font-comic-neue"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cities
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg font-fredoka">
              {city.name} City View
            </h1>
            <p className="text-white/80 font-comic-neue">
              {city.buildings.length} buildings • {city.totalCoins} coins
            </p>
          </div>

          <div></div>
        </div>

        {/* City View */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-8">
            <div className="relative w-full h-96 overflow-hidden rounded-xl bg-gradient-to-b from-sky-200 to-green-200">
              {city.buildings.length === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <div className="text-6xl mb-4">🏗️</div>
                    <div className="text-xl font-fredoka">No buildings yet!</div>
                    <div className="text-sm font-comic-neue">Start studying to build your city</div>
                  </div>
                </div>
              ) : (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-end justify-center gap-2 h-full w-full max-w-4xl">
                  {/* Ground plane */}
                  <div className="absolute bottom-0 left-0 right-0 h-4 bg-green-400 rounded-b-xl"></div>
                  
                  {/* Buildings */}
                  {city.buildings.map((building, index) => {
                    const type = getBuildingType(building);
                    const height = Math.max(40, building.height * 2);
                    const width = type === 'skyscraper' ? 32 : type === 'office' ? 24 : 20;
                    
                    return (
                      <div
                        key={building.id}
                        className={`relative transition-all duration-700 hover:scale-110 group ${
                          building.completed 
                            ? 'bg-gradient-to-t from-blue-500 to-blue-300' 
                            : 'bg-gradient-to-t from-gray-400 to-gray-300'
                        } rounded-t-lg shadow-lg`}
                        style={{ 
                          height: `${height}px`,
                          width: `${width}px`,
                          animationDelay: `${index * 200}ms`,
                        }}
                        title={`${building.sessionDuration}min session ${building.completed ? '✓' : '⚠️'}`}
                      >
                        {/* Hover tooltip */}
                        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-xs px-2 py-1 rounded font-comic-neue whitespace-nowrap">
                          {building.sessionDuration}min • {building.completed ? 'Complete' : 'Incomplete'}
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Parks and decorations */}
                  {city.buildings.filter(b => b.completed).length > 3 && (
                    <div className="absolute bottom-4 right-4 text-3xl animate-bounce">
                      🌳
                    </div>
                  )}
                  {city.buildings.filter(b => b.completed).length > 5 && (
                    <div className="absolute bottom-4 left-4 text-3xl animate-bounce" style={{ animationDelay: '0.5s' }}>
                      🎠
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* City Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">🏢</div>
              <div className="text-white text-lg font-bold font-fredoka">{city.buildings.length}</div>
              <div className="text-white/80 text-sm font-comic-neue">Buildings</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">✅</div>
              <div className="text-white text-lg font-bold font-fredoka">{city.buildings.filter(b => b.completed).length}</div>
              <div className="text-white/80 text-sm font-comic-neue">Completed</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-white text-lg font-bold font-fredoka">{city.totalCoins}</div>
              <div className="text-white/80 text-sm font-comic-neue">Coins</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">⏰</div>
              <div className="text-white text-lg font-bold font-fredoka">
                {Math.floor(city.buildings.reduce((total, b) => total + b.sessionDuration, 0) / 60)}h
              </div>
              <div className="text-white/80 text-sm font-comic-neue">Total Study</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CityView3D;
