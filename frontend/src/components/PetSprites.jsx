import React from 'react';

// PetSprite component handles rendering different pet states
export const PetSprite = ({ state, sprites }) => {

  const baseStyle = "w-32 h-32 transition-all duration-300";
  
  
  if (!sprites) {
    switch (state) {
      case 'happy':
        // CSS-based happy sprite (fallback)
        return (
          <div className={`${baseStyle} bg-blue-500 rounded-full`}>
            <div className="relative">
              <div className="absolute top-8 left-6 w-4 h-4 bg-white rounded-full"></div>
              <div className="absolute top-8 right-6 w-4 h-4 bg-white rounded-full"></div>
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-white rounded-full"></div>
            </div>
          </div>
        );
      case 'sad':
        // CSS-based sad sprite (fallback)
        return (
          <div className={`${baseStyle} bg-gray-400 rounded-full`}>
            <div className="relative">
              <div className="absolute top-8 left-6 w-4 h-4 bg-white rounded-full"></div>
              <div className="absolute top-8 right-6 w-4 h-4 bg-white rounded-full"></div>
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        );
      case 'sleeping':
        // CSS-based sleeping sprite (fallback)
        return (
          <div className={`${baseStyle} bg-purple-400 rounded-full`}>
            <div className="relative">
              <div className="absolute top-8 left-6 w-4 h-1 bg-white rounded-full"></div>
              <div className="absolute top-8 right-6 w-4 h-1 bg-white rounded-full"></div>
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-white rounded-full"></div>
              <div className="absolute top-4 right-4 text-yellow-300">zzz</div>
            </div>
          </div>
        );
    }
  }

  // Render Png
  return (
    <img 
      src={sprites[state]} 
      alt={`Pet ${state}`}
      className={`${baseStyle} object-contain`}
    />
  );
};

export default PetSprite;
