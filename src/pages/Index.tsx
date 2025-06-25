
import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CityCard from '@/components/CityCard';
import CreateCityModal from '@/components/CreateCityModal';
import StudyTimer from '@/components/StudyTimer';
import CityView3D from '@/components/CityView3D';

export interface City {
  id: string;
  name: string;
  gradient: string;
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
  buildingType: 'residential' | 'office' | 'entertainment' | 'park';
}

const Index = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeStudySession, setActiveStudySession] = useState<{
    cityId: string;
    goalMinutes: number;
  } | null>(null);
  const [viewingCity, setViewingCity] = useState<string | null>(null);
  const [totalCoins, setTotalCoins] = useState(0);
  const [totalStudyHours, setTotalStudyHours] = useState(0);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedCities = localStorage.getItem('studyCities');
    const savedCoins = localStorage.getItem('totalCoins');
    const savedHours = localStorage.getItem('totalStudyHours');
    
    if (savedCities) {
      setCities(JSON.parse(savedCities));
    }
    if (savedCoins) {
      setTotalCoins(parseInt(savedCoins));
    }
    if (savedHours) {
      setTotalStudyHours(parseFloat(savedHours));
    }
  }, []);

  // Save data to localStorage whenever cities, coins, or hours change
  useEffect(() => {
    localStorage.setItem('studyCities', JSON.stringify(cities));
  }, [cities]);

  useEffect(() => {
    localStorage.setItem('totalCoins', totalCoins.toString());
  }, [totalCoins]);

  useEffect(() => {
    localStorage.setItem('totalStudyHours', totalStudyHours.toString());
  }, [totalStudyHours]);

  const createCity = (name: string, gradient: string) => {
    const newCity: City = {
      id: Date.now().toString(),
      name,
      gradient,
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
    const hoursStudied = actualMinutes / 60;
    
    const newBuilding: Building = {
      id: Date.now().toString(),
      sessionDuration: actualMinutes,
      goalDuration: goalMinutes,
      completed: goalMet,
      height: goalMet ? 100 : Math.max(30, (actualMinutes / goalMinutes) * 100),
      roomsUnlocked: goalMet ? Math.floor(actualMinutes / 30) : 0,
      decorations: [],
      buildingType: 'residential'
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
    setTotalStudyHours(prev => prev + hoursStudied);
    setActiveStudySession(null);
  };

  const deleteCity = (cityId: string) => {
    setCities(cities.filter(city => city.id !== cityId));
  };

  const purchaseDecoration = (buildingId: string, decorationId: string, cost: number) => {
    if (totalCoins >= cost) {
      setCities(cities.map(city => ({
        ...city,
        buildings: city.buildings.map(building => 
          building.id === buildingId 
            ? { ...building, decorations: [...building.decorations, decorationId] }
            : building
        )
      })));
      setTotalCoins(totalCoins - cost);
    }
  };

  if (viewingCity) {
    const city = cities.find(c => c.id === viewingCity);
    if (city) {
      return (
        <CityView3D
          city={city}
          totalCoins={totalCoins}
          onBack={() => setViewingCity(null)}
          onPurchaseDecoration={purchaseDecoration}
        />
      );
    }
  }

  if (activeStudySession) {
    const city = cities.find(c => c.id === activeStudySession.cityId);
    return (
      <StudyTimer
        cityName={city?.name || ''}
        cityGradient={city?.gradient || 'from-blue-400 to-purple-400'}
        goalMinutes={activeStudySession.goalMinutes}
        onComplete={(actualMinutes) => 
          completeStudySession(activeStudySession.cityId, actualMinutes, activeStudySession.goalMinutes)
        }
        onCancel={() => setActiveStudySession(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b-2 border-pink-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent font-fredoka">
                Study City ✨
              </h1>
              <p className="text-gray-600 text-sm font-comic-neue">Build your knowledge, one adorable session at a time! 🏗️💕</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full font-bold font-fredoka shadow-lg">
                💰 {totalCoins} coins
              </div>
              
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-2 rounded-full font-bold font-fredoka shadow-lg">
                ⏰ {Math.floor(totalStudyHours * 60)}min studied
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
              <div className="text-9xl mb-8">🏙️✨</div>
              <h2 className="text-5xl font-bold text-gray-800 mb-6 font-fredoka">
                Welcome to Study City!
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed font-comic-neue">
                Transform your study sessions into the cutest virtual city ever! 
                Each subject becomes a magical city with adorable buildings that grow as you study! 🌈
              </p>
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-fredoka text-lg"
                size="lg"
              >
                <Plus className="w-6 h-6 mr-3" />
                Create Your First Magical City! ✨
              </Button>
            </div>
          </div>
        ) : (
          // Cities Grid
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 font-fredoka">Your Study Cities 🏙️</h2>
                <p className="text-gray-600 font-comic-neue text-lg">
                  {cities.length} magical {cities.length === 1 ? 'city' : 'cities'} • {cities.reduce((total, city) => total + city.buildings.length, 0)} adorable buildings built! 
                </p>
              </div>
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 font-fredoka font-bold text-lg rounded-xl shadow-lg"
                size="lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                New City ✨
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cities.map(city => (
                <CityCard 
                  key={city.id} 
                  city={city} 
                  onStartStudy={(goalMinutes) => startStudySession(city.id, goalMinutes)}
                  onViewCity={() => setViewingCity(city.id)}
                  onDeleteCity={() => deleteCity(city.id)}
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
