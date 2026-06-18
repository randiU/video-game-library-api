## Future OAuth Setup

OAuth will be added later using:

- express-session
- connect-mongo
- passport
- passport-google-oauth20

When OAuth is added, server.js will need:

- session middleware
- MongoStore session storage
- passport.initialize()
- passport.session()
- /auth routes

Required future environment variables:

- SESSION_SECRET
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- GOOGLE_CALLBACK_URL