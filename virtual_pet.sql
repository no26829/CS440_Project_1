-- create database
CREATE DATABASE virtual_pet;

-- create pets table
CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    hungerLevel INTEGER DEFAULT 5
);

-- insert mock pet data
INSERT INTO pets (name, type, hungerLevel) 
VALUES 
('Fuzzy', 'ferret', 5),
('Nibbles', 'hamster', 3),
('Spiky', 'hedgehog', 4);
