# Heroes REST API

The Rest API provides 2 endpoints, `/heroes` and `/powers`. The followings operations are availables:

```javascript
GET '/heroes'         Get all Heroes
POST '/heroes'        Create a Hero
PATCH '/heroes/:id'   Update a Hero
GET '/heroes/:id'     Get a Hero by Id
DELETE '/heroes/:id'  Delete a hero by Id

GET '/powers'         Get all Powers
POST '/powers'        Create a Power
PATCH '/powers/:id'   Update a Power
GET '/powers/:id'     Get a Power by Id
DELETE '/powers/:id'  Delete a Power by Id
```

## Usage

To run the API execute the following commands:

```bash
npm i                 Install NPM dependencies
npm run start         Run the API
npm run start:dev     Optionally, run the API in development mode.
```

## Data Structure

The Data is stored in the `database` directory in the application root directory.

```json
// Hero Entity
{
  "id": number,
  "name": string,
  "alias": string,
  "power": number,    // Power Entity Id
  "createdAt": string,
  "updatedAt": string
},

// Power Entity
{
  "id": number,
  "name": string,
  "createdAt": string,
  "updatedAt": string
}
```
