const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 3500

//Anslutningsinställningar
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cv",
    charset: "utf8mb4"
});

connection.connect((err) => {
    if (err) {
        console.log("Connection failed: " + err);
        return;
    }
    console.log("Connected to database.");
});

app.use(cors());
app.use(express.json()); // middleware som gör så att servern kan läsa JSON från requests

// Skapa routes för api:et
// endpoint
app.get('/api', (req, res) => {
    res.json({ message: "CV API is running" });
});

// select all workexperiences
app.get('/api/workexperience', (req, res) => {
    connection.query("SELECT * FROM workexperience", (err, results) => {
        if (err) {
            res.status(500).json({ error: "Something went wrong: " + err });
            return;
        }

        res.json(results);
    });
});

// create new workexperience
app.post('/api/workexperience', (req, res) => {
    let company_name = req.body.company_name;
    let job_title = req.body.job_title;
    let location = req.body.location;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let description = req.body.description;

    //error handling
    let errors = {
        message: "",
        details: "",
        https_response: {

        }
    }

    if (!company_name || !job_title || !start_date || !description) {
        //error messages
        errors.message = "company name, job title start date and/or description not included";
        errors.details = "You must include company name, job title start date and descriptionin JSON";

        //response code
        errors.https_response.message = "Bad Request";
        errors.https_response.code = 400;

        res.status(400).json(errors);

        return;
    }

    // Add workexperience to database
    connection.query(`
    INSERT INTO workexperience
    (company_name,  job_title, start_date, end_date, description)
    VALUES(?, ?, ?, ?, ?)`,
        [company_name, job_title, start_date, end_date, description],
        (err, results) => {

            if (err) {
                res.status(500).json({ error: "Something went wrong: " + err });
                return;
            }

            console.log("Workexperience added: " + results);

            let workexperience = {
                company_name,
                job_title,
                start_date,
                end_date,
                description
            };

            res.json({ message: "Workexperience added", workexperience });
        });
});

// update
app.put('/api/workexperience/:id', (req, res) => {
    res.json({ message: "Workexperience uppdated: " + req.params.id });
});

// delete
app.delete('/api/workexperience/:id', (req, res) => {
    res.json({ message: "Workexperience deleted: " + req.params.id });
});

// --
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});