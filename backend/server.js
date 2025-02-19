// require express
require('dotenv').config(); 
const express = require('express');
const { Client } = require('pg'); // import PostgreSQL client
const app = express();
const PORT = 5000;

// PostgreSQL connection setup
const client = new Client({
    user: 'your_username', // replace with your PostgreSQL username (e.g., 'postgres')
    host: 'localhost',
    database: 'virtual_pet', // name your databasethis
    password: 'your_password', // replace with your PostgreSQL password 
    port: 5432,
});

// error handling for log connection
client.connect()
    .then(() => {
        console.log('Connected to the PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to the database', err);
        process.exit(1);
    });

app.use(express.json()); // Middleware to parse JSON data

// test route to verify server is running
app.get('/', (req, res) => {
    res.send('Welcome to the Virtual Pet API!');
});

// get all pets from PostgreSQL
app.get('/api/pets', (req, res) => {
    client.query('SELECT * FROM pets', (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving pets');
            return;
        }
        res.json(result.rows); // return the rows of pets from the database
    });
});

// feed a pet (update hunger level)
app.put('/api/pets/feed/:id', (req, res) => {
  // convert the pet ID from string to integer
  const petId = parseInt(req.params.id); 

  // log the pet ID
  console.log('Feeding Pet with ID:', petId); 

  // select pet from id
  client.query('SELECT * FROM pets WHERE id = $1', [petId], (err, result) => {
      if (err || result.rows.length === 0) {
          console.error('Pet not found or error with SELECT query:', err); // Log any error
          res.status(404).send('Pet not found');
          return;
      }

      const pet = result.rows[0];

      // log current hunger level
      console.log('Current Hunger Level:', pet.hungerLevel); 

      // decrease hunger level
      const updatedHunger = Math.max(0, pet.hungerLevel - 1); 

      // log updated hunger level
      console.log('Updated Hunger Level:', updatedHunger); 

      client.query(
        'UPDATE pets SET "hungerLevel" = $1 WHERE id = $2 RETURNING *',
        [updatedHunger, petId],
        (err, updatedResult) => {
          // error feeding pet
            if (err) {
                console.error('Error with UPDATE query:', err);
                res.status(500).send('Error feeding pet');
                return;
            }
            // update pet stats
            console.log('Pet after feeding:', updatedResult.rows[0]);
            res.json(updatedResult.rows[0]);
        }
    );    
  });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
