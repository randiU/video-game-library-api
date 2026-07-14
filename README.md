# Video Game Library & Review API

## Project Overview

Video Game Library & Review API is a Node.js, Express, and MongoDB backend for browsing video games, genres, and platforms. Users can sign in with Google OAuth, save games to a personal library, and create reviews for games in the catalog.

## Live Links

- GitHub repository: https://github.com/randiU/video-game-library-api
- Render deployment: https://video-game-library-api-2rcc.onrender.com
- Swagger API docs: https://video-game-library-api-2rcc.onrender.com/api-docs

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Swagger and swagger-ui-express
- Google OAuth
- Passport
- express-session
- connect-mongo
- Jest
- Supertest

## Project Structure

- `config/` contains MongoDB connection setup and Passport OAuth configuration.
- `controllers/` contains the route handler logic for each resource.
- `middleware/` contains authentication and shared error-handling middleware.
- `models/` contains the Mongoose schemas for each collection.
- `routes/` contains the Express route definitions and route grouping.
- `swagger/` contains the OpenAPI documentation source.
- `tests/` contains Jest and Supertest API tests.

## Collections / Models

The API uses the following MongoDB collections:

- `games`
- `genres`
- `platforms`
- `users`
- `reviews`
- `userLibrary`

The `games` collection satisfies the 7+ fields requirement. Its schema includes fields such as:

- `title`
- `description`
- `developer`
- `publisher`
- `releaseYear`
- `genre`
- `platforms`
- `playerCount`
- `multiplayer`
- `ageRating`
- `gameStyle`
- `averageRating`

## Main API Routes

- `/games` supports GET, POST, PUT, and DELETE.
- `/genres` supports GET, POST, PUT, and DELETE.
- `/platforms` supports GET, POST, PUT, and DELETE.
- `/reviews` supports GET, POST, PUT, and DELETE.
- `/library` supports GET, POST, PUT, and DELETE.
- `/users` supports GET, POST, PUT, and DELETE.
- `/auth` provides Google OAuth login, callback, status, and logout routes.

## OAuth Authentication

Google OAuth is implemented in this project using:

- express-session
- connect-mongo
- passport
- passport-google-oauth20

Authentication routes:

- `GET /auth/google`
- `GET /auth/google/callback`
- `GET /auth/status`
- `GET /auth/logout`

Protected routes require users to be logged in before performing user-specific actions such as creating reviews, updating or deleting reviews, and adding games to a personal library.

## Environment Variables

Use `.env.example` as the source of truth for local configuration.

- `PORT`
- `MONGODB_URI`
- `SESSION_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL`

Local development callback URL:

```text
http://localhost:8080/auth/google/callback
```

Render deployment callback URL:

```text
https://video-game-library-api-2rcc.onrender.com/auth/google/callback
```

## Setup Instructions

```bash
git clone https://github.com/randiU/video-game-library-api.git
cd video-game-library-api
npm install
```

Create a `.env` file based on `.env.example`, then start the server:

```bash
npm run dev
```

Or run the production start script:

```bash
npm start
```

## API Documentation

Swagger UI is available locally at:

```text
http://localhost:8080/api-docs
```

Swagger UI is deployed at:

```text
https://video-game-library-api-2rcc.onrender.com/api-docs
```

Swagger can be used as a REST client through the "Try it out" feature. For Google login, open `/auth/google` directly in the browser so the OAuth redirect flow can complete normally.

## Testing

This project uses Jest and Supertest for API testing.

```bash
npm test
```

Tests cover API routes, validation and error cases, and protected routes that should return unauthorized responses when the user is not logged in.

## Validation and Error Handling

Routes include validation and error handling for:

- missing required fields
- invalid enum values
- invalid MongoDB ObjectIds
- records not found
- server errors

## Team Contributions

- Randi: setup, games, genres, platforms
- Jerry: reviews and user library
- Landon: OAuth and Google login
- Chase: Jest testing