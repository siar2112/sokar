const calculator = require('./calculator.js');
const express = require('express');
const bodyParser = require('body-parser'); // new line
const app = express();
const bcrypt = require('bcrypt');
const cors = require("cors");
const mysql = require('mysql');
const fs = require('fs');
const session = require('express-session');



app.use(cors({
    origin: 'http://localhost:3000',  // replace with the domain of your client
    credentials: true
}));
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


//session

app.use(
    session({
        secret: 'your secret',
        resave: false,
        saveUninitialized: true,
    })
);


app.post('/create_player_account', (req, res) => {
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const email=req.body.email;
    const birthday=req.body.birthday;
    const userName=req.body.userName;
    const password=req.body.password;
    const retypePassword=req.body.retypePassword;
    const gender=req.body.gender;
    const age = calculator.calculateAge(birthday);
    const type='Player';
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
        'INSERT INTO USER (Email, First_Name, Last_Name, Birthdate, Age, Gender, Username, Password_Hash, Type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [email, firstName, lastName, birthday, age, gender, userName, hashedPassword, type],
        (err, result) => {
            if (err) {
                console.error('Error inserting new user', err);
                res.status(500).send('Server error');
                return;
            }

            const id = result.insertId;

            db.query(
                'INSERT INTO PLAYER(UserID) VALUES(?)',
                [id],
                (err,result)=>{
                    if(err){
                        console.error('error inserting new player',err);
                        res.status(500).send('Server error');
                        return;
                    }

                    res.status(200).send({ message: 'Account created successfully!', userId: id });
                }
            );
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
                // If the passwords match, create a session and store userID and role in it
                req.session.userId = user.ID;
                req.session.username=user.Username;
                req.session.role = user.Type;

                // Send a successful response
                res.status(200).json({ message: 'Login successful!',
                    userId: user.ID, role: user.Type, username:user.Username });
            } else {
                // If the passwords do not match, send an error response
                res.status(401).send('Invalid username or password');
            }
        });
    });
});


app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            return console.log(err);
        }
        res.status(200).send('Session destroyed successfully');
    });
});






app.listen(9000, () => {
    console.log('Server is listening on port 9000');
});
