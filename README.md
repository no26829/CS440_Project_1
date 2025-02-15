# CS440 Project 1

## Description
The Virtual Pet System is a full-stack web application designed to simulate the experience of taking care of a virtual pet. Users can interact with their pets through a frontend interface, viewing pet details and performing actions such as feeding to maintain their well-being. The system includes a React.js frontend for an interactive user experience, an Express.js backend to manage API requests, and a PostgreSQL database to store pet-related data.

This project demonstrates key software engineering concepts, including frontend-backend communication, database integration, and RESTful API development. The backend exposes endpoints that allow users to fetch pet data and update pet statuses, ensuring a dynamic and engaging user experience.

## Technologies Used

## Overview:

- **Frontend:** React.js  
- **Backend:** Express.js
- **Database:** PostgreSQL  
- **Hosting:** GitHub

  ## Project Structure:

To deploy frontend:

# Create new Vite project
npm create vite@latest virtual-pet -- --template react

# Navigate to project directory
cd virtual-pet

# Install required dependencies
npm install lucide-react    # For icons

npm install @vitejs/plugin-react -D  # For Vite React plugin

# Install base dependencies (should be automatic with create-vite)
npm install react react-dom

To test backend:
# To start server
node server.js

# Test the endpoints
GET http://localhost:5000/api/pets

# To feed pet and decrease hunger level (number is pet ID)
PUT http://localhost:5000/api/pets/feed/1
