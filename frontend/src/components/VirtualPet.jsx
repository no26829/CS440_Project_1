import { useState, useEffect } from 'react';
import { Heart, Cookie, Moon } from 'lucide-react';
import PetSprite from './PetSprites';

// Configuration for different pet types and their sprites
const PETS = {
  cat: {
    name: "Cat",
    sprites: {
      happy: '/sprites/cat/happy.png',
      sad: '/sprites/cat/sad.png',
      sleeping: '/sprites/cat/sleeping.png'
    }
  },
  dog: {
    name: "Dog",
    sprites: {
      happy: '/sprites/dog/happy.png',
      sad: '/sprites/dog/sad.png',
      sleeping: '/sprites/dog/sleeping.png'
    }
  },
  rabbit: {
    name: "Rabbit",
    sprites: {
      happy: '/sprites/rabbit/happy.png',
      sad: '/sprites/rabbit/sad.png',
      sleeping: '/sprites/rabbit/sleeping.png'
    }
  }
};

const VirtualPet = () => {
  // State management
  const [selectedPet, setSelectedPet] = useState(null);  // Currently selected pet type
  const [petName, setPetName] = useState('');           // Pet's name (unused currently)
  const [happiness, setHappiness] = useState(50);       // Happiness level (0-100)
  const [energy, setEnergy] = useState(100);            // Energy level (0-100)
  const [isSleeping, setIsSleeping] = useState(false);  // Sleep state

  // Determine pet's current state based on stats
  const getPetState = () => {
    if (isSleeping) return 'sleeping';
    if (happiness < 30 || energy < 30) return 'sad';
    return 'happy';
  };

  // Timer effect to decrease stats over time
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isSleeping) {
        // Decrease stats if pet is awake
        setEnergy(prev => Math.max(0, prev - 2));
        setHappiness(prev => Math.max(0, prev - 1));
      } else {
        // Recover energy while sleeping
        setEnergy(prev => Math.min(100, prev + 5));
      }
    }, 3000);

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, [isSleeping]);

  // Pet interaction functions
  const adoptPet = (petType) => {
    setSelectedPet(petType);
    setHappiness(50);
    setEnergy(100);
    setIsSleeping(false);
  };

  const feed = () => {
    setHappiness(prev => Math.min(100, prev + 10));
    setEnergy(prev => Math.min(100, prev + 20));
  };

  const play = () => {
    if (energy >= 10) {
      setHappiness(prev => Math.min(100, prev + 15));
      setEnergy(prev => Math.max(0, prev - 10));
    }
  };

  const toggleSleep = () => {
    setIsSleeping(!isSleeping);
  };

  // Render pet selection screen if no pet is selected
  if (!selectedPet) {
    return (
      // Pet selection UI
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-8">Virtual Pets</h1>
          <h2 className="text-xl text-center mb-6">Choose a pet to adopt:</h2>
          <div className="grid grid-cols-1 gap-4">
            {Object.entries(PETS).map(([petType, pet]) => (
              <button
                key={petType}
                onClick={() => adoptPet(petType)}
                className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center"
              >
                Adopt {pet.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render main pet care interface
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Virtual Pets</h1>
        <h2 className="text-xl text-center mb-4">{PETS[selectedPet].name}</h2>
        
        {/* Pet sprite display */}
        <div className="flex justify-center mb-8">
          <PetSprite 
            state={getPetState()} 
            sprites={PETS[selectedPet].sprites}
          />
        </div>

        {/* Status bars */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="font-medium">Happiness:</span>
            <div className="w-48 bg-gray-200 rounded-full h-4">
              <div 
                className="bg-pink-500 rounded-full h-4 transition-all duration-300"
                style={{ width: `${happiness}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium">Energy:</span>
            <div className="w-48 bg-gray-200 rounded-full h-4">
              <div 
                className="bg-yellow-500 rounded-full h-4 transition-all duration-300"
                style={{ width: `${energy}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={feed}
            disabled={isSleeping}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            <Cookie className="mr-2" /> Feed
          </button>
          <button
            onClick={play}
            disabled={isSleeping || energy < 10}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            <Heart className="mr-2" /> Play
          </button>
          <button
            onClick={toggleSleep}
            className="flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            <Moon className="mr-2" /> {isSleeping ? 'Wake' : 'Sleep'}
          </button>
        </div>

        {/* Return to pet selection */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setSelectedPet(null)}
            className="text-blue-500 hover:text-blue-600"
          >
            Choose Different Pet
          </button>
        </div>
      </div>
    </div>
  );
};

export default VirtualPet;