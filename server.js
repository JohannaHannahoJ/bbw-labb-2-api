const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3500

app.use(cors());
app.use(express.json()); // middleware som skickar jsondata som body så att servern kan läsa JSON från requests

// Skapa routes för api:et
// endpoint
app.get('/api', (req, res) => {
    res.json({message: "CV API is running"});
});

// select all workexperiences
app.get('/api/workexperience', (req, res) => {
    res.json({message: "Get workexperiences"});
});

// create new workexperience
app.post('/api/workexperience', (req, res) => {
    res.json({message: "Workexperience added"});
});

// update
app.put('/api/workexperience/:id', (req, res) => {
    res.json({message: "Workexperience uppdated: " + req.params.id});
});

// delete
app.delete('/api/workexperience/:id', (req, res) => {
    res.json({message: "Workexperience deleted: " + req.params.id});
});

// --
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});