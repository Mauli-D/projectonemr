// Our Express app module
const express = require('express');
const app = express();

// Import our Page Routes
const pageRoutes = require('./routes/pages');
const booksRoutes = require('./routes/books');
const publicationsRoutes = require('./routes/publications');
const authorsRoutes = require('./routes/authors');
const sessionsRoutes = require('./routes/sessions');

// Register our Page Routes with our app
app.use('/', pageRoutes);
app.use('/books', booksRoutes);
app.use('/publications', publicationsRoutes);
app.use('/authors', authorsRoutes);
app.use('/', sessionsRoutes);



//Export the changes
module.exports = app;