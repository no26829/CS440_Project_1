
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock database
let mockDB = {
  pets: {}, // Stores pet states
  users: {} // Could store user data
};

// Mock API service
export const api = {
  // Pet operations
  async adoptPet(userId, petType) {
    await delay(500); // Simulate network delay
    
    const newPet = {
      id: Date.now().toString(),
      type: petType,
      happiness: 50,
      energy: 100,
      isSleeping: false,
      lastFed: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };

    // Store in mock DB
    if (!mockDB.pets[userId]) {
      mockDB.pets[userId] = [];
    }
    mockDB.pets[userId].push(newPet);

    return newPet;
  },

  async getPetState(userId, petId) {
    await delay(300);
    const userPets = mockDB.pets[userId] || [];
    return userPets.find(pet => pet.id === petId);
  },

  async updatePetState(userId, petId, updates) {
    await delay(300);
    const userPets = mockDB.pets[userId] || [];
    const petIndex = userPets.findIndex(pet => pet.id === petId);
    
    if (petIndex >= 0) {
      mockDB.pets[userId][petIndex] = {
        ...mockDB.pets[userId][petIndex],
        ...updates
      };
      return mockDB.pets[userId][petIndex];
    }
    throw new Error('Pet not found');
  },

  // User operations
  async login(username, password) {
    await delay(500);
    // Mock authentication
    const userId = `user_${Date.now()}`;
    return { userId, username };
  },

  async getUserPets(userId) {
    await delay(300);
    return mockDB.pets[userId] || [];
  }
};
