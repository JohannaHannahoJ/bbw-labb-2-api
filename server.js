const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3500

app.use(cors());

// Skapa routes för api:et
app.get('/api', (req, res) => {
    res.json({message: "Welcome to my API"});
});

app.get('/api/users', (req, res) => {
    res.json({message: "Get users"});
});

app.post('/api/users', (req, res) => {
    res.json({message: "User added"});
});

app.put('/api/users/:id', (req, res) => {
    res.json({message: "User uppdated: " + req.params.id});
});

app.delete('/api/users/:id', (req, res) => {
    res.json({message: "User deleted: " + req.params.id});
});

// --
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});