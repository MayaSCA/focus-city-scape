
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CityCard from '@/components/CityCard';
import CreateCityModal from '@/components/CreateCityModal';
import StudyTimer from '@/components/StudyTimer';

export interface City {
  id: string;
  name: string;
  color: string;
  buildings: Building[];
  totalCoins: number;
}

export interface Building {
  id: string;
  sessionDuration: number;
  goalDuration: number;
  completed: boolean;
  height: number;
  roomsUnlocked: number;
  decorations: string[];
}

const Index = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeStudySession, setActiveStudySession] = useState<{
    cityId: string;
    goalMinutes: number;
  } | null>(null);
  const [totalCoins, setTotalCoins] = useState(0);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCities = localStorage.getItem('studyCities');
    const savedCoins = localStorage.getItem('totalCoins');
    
    if (savedCities) {
      setCities(JSON.parse(savedCities));
    }
    if (savedCoins) {
      setTotalCoins(parseInt(savedCoins));
    }
  }, []);

  // Save data to localStorage whenever cities or coins change
  useEffect(() => {
    localStorage.setItem('studyCities', JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    localStorage.setItem('totalCoins', totalCoins.toString());
  }, [totalCoins]);

  const createCity = (name: string, color: string) => {
    const newCity: City = {
      id: Date.now().toString(),
      name,
      color,
      buildings: [],
      totalCoins: 0
    };
    setCities([...cities, newCity]);
    setIsCreateModalOpen(false);
  };

  const startStudySession = (cityId: string, goalMinutes: number) => {
    setActiveStudySession({ cityId, goalMinutes });
  };

  const completeStudySession = (cityId: string, actualMinutes: number, goalMinutes: number) => {
    const goalMet = actualMinutes >= goalMinutes;
    const coinsEarned = Math.floor(actualMinutes / 5) + (goalMet ? 10 : 0);
    
    const newBuilding: Building = {
      id: Date.now().toString(),
      sessionDuration: actualMinutes,
      goalDuration: goalMinutes,
      completed: goalMet,
      height: goalMet ? 100 : Math.max(30, (actualMinutes / goalMinutes) * 100),
      roomsUnlocked: goalMet ? Math.floor(actualMinutes / 30) : 0,
      decorations: []
    };

    setCities(cities.map(city => 
      city.id === cityId 
        ? { 
            ...city, 
            buildings: [...city.buildings, newBuilding],
            totalCoins: city.totalCoins + coinsEarned
          }
        : city
    ));
    
    setTotalCoins(totalCoins + coinsEarned);
    setActiveStudySession(null);
  };

  if (activeStudySession) {
    const city = cities.find(c => c.id === activeStudySession.cityId);
    return (
      <StudyTimer
        cityName={city?.name || ''}
        cityColor={city?.color || '#3b82f6'}
        goalMinutes={activeStudySession.goalMinutes}
        onComplete={(actualMinutes) => 
          completeStudySession(activeStudySession.cityId, actualMinutes, activeStudySession.goalMinutes)
        }
        onCancel={() => setActiveStudySession(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Study City
              </h1>
              <p className="text-gray-600 text-sm">Build your knowledge, one session at a time</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full font-semibold">
                💰 {totalCoins} coins
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cities.length === 0 ? (
          // Welcome Screen
          <div className="text-center py-20">
            <div className="max-w-2xl mx-auto">
              <div className="text-8xl mb-8">🏙️</div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Welcome to Study City!
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform your study sessions into a thriving virtual city. 
                Each subject becomes a city, and every focused study session builds a new building.
              </p>
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First City
              </Button>
            </div>
          </div>
        ) : (
          // Cities Grid
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Your Study Cities</h2>
                <p className="text-gray-600">
                  {cities.length} {cities.length === 1 ? 'city' : 'cities'} • {cities.reduce((total, city) => total + city.buildings.length, 0)} buildings built
                </p>
              </div>
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                New City
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cities.map(city => (
                <CityCard 
                  key={city.id} 
                  city={city} 
                  onStartStudy={(goalMinutes) => startStudySession(city.id, goalMinutes)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <CreateCityModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateCity={createCity}
      />
    </div>
  );
};

export default Index;
