const express = require('express');
const bodyParser = require('body-parser'); // new line
const app = express();
const bcrypt = require('bcrypt');
const cors = require("cors");
const mysql = require('mysql');
const fs = require('fs');


app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(bodyParser.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//Database connection

const db = mysql.createConnection({
    host: 'gateway01.eu-central-1.prod.aws.tidbcloud.com',
    user: '4Sp4wiDQ9J3rfja.root',
    password: 'Xl6ClXFrfG9z51Mj',
    database: 'soccer_R1',
    port: 4000,
    ssl: {
        ca: fs.readFileSync('/etc/ssl/cert.pem')
    }
});

db.connect((err) => {
    if(err) {
        console.error('Error connecting to Db', err.stack);
        return;
    }
    console.log('Connection established successfully.');
});

setInterval(() => {
    db.query('SELECT 1');
}, 5000); // ping the server every 5 seconds


app.post('/create_account', (req, res) => {
    //const { firstName, lastName, email, userName, password, retypePassword, position } = req.body;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const birthday=req.body.birthday;
    const userName=req.body.userName;
    const password=req.body.password;
    const retypePassword=req.body.retypePassword;
    const gender=req.body.gender;
    const age = calculateAge(birthday);


    //console.log(req.body);

    // Here you can perform your validation logic
    if (password !== retypePassword) {
        res.status(400).send('Passwords do not match!');
        return;
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);


    // If validation passes, you can store the user data into a database

    db.query(
        'INSERT INTO USER (Email, First_Name, Last_Name, Birthdate, Age, Gender, Username, Password_Hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [email, firstName, lastName, birthday, age, gender, userName, hashedPassword],
        (err, result) => {
            if (err) {
                console.error('Error inserting new user', err);
                res.status(500).send('Server error');
                return;
            }

            res.status(200).send('Account created successfully!');
        }
    );

});



app.post('/login', (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    

    // Query the database for a user with the provided username
    const query = 'SELECT * FROM USER WHERE Username = ?';
    db.query(query, userName, (error, results) => {
        if (error) {
            console.error('Could not execute query', error);
            res.status(500).send('Server error');
            return;
        }

        // If no user is found or the password does not match, send an error response
        if (results.length === 0) {
            res.status(401).send('Invalid username or password');
            return;
        }

        const user = results[0];

        // Compare the hashed password in the database with the hash of the provided password
        bcrypt.compare(password, user.Password_Hash, (err, result) => {
            if (err) {
                console.error('Error comparing passwords', err);
                res.status(500).send('Server error');
                return;
            }

            if (result) {
                // If the passwords match, send a successful response
                res.status(200).send('Login successful!');
            } else {
                // If the passwords do not match, send an error response
                res.status(401).send('Invalid username or password');
            }
        });
    });
});


function calculateAge(birthdate) {
    const dob = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    return age;
}



app.listen(9000, () => {
    console.log('Server is listening on port 9000');
});
