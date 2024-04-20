const express = require('express');
const mysql = require('mysql');
const path = require('path');

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 8080;

// Create a MySQL database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rinedi',
    database: 'minibrary'
});

// Connect to MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route to handle book search queries
app.get('/search', (req, res) => {
    const searchTerm = req.query.term;
    const query = `SELECT * FROM books WHERE title LIKE '%${searchTerm}%' OR author LIKE '%${searchTerm}%' OR genre LIKE '%${searchTerm}%'`;

    connection.query(query, (error, searchResults) => {
        if (error) {
            console.error('Error executing search query:', error);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(searchResults);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
