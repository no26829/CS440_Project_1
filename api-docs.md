# API Documentation

## Version: 1.0
Base URL: `https://your-api-domain.com/api`

---

## Endpoints

### 1. Get All Pets
- Endpoint: `GET /Pet`
- Description: Retrieves a list of all pets in the database.
- Response Example:
  ```json
  [
    {
      "id": 1,
      "name": "Buddy",
      "type": "dog",
      "hunger": 5
    }
  ]

Status Codes:
200 OK – Successfully retrieved pet
404 Not Found – Pet not found



2. Get Pet by ID
Endpoint: GET /Pet/{id}
Description: Retrieves details of a specific pet by ID.
Response Example:

{
  "id": 1,
  "name": "Buddy",
  "type": "dog",
  "hunger": 5
}


Status Codes:
200 OK – Successfully retrieved pet
404 Not Found – Pet not found


Status Codes:
200 OK – Successfully retrieved pet
404 Not Found – Pet not found

{
  "name": "Buddy",
  "type": "dog",
  "hunger": 5
}

