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
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // sets cookie to expire in 24 hours
            httpOnly: true // cookie cannot be accessed through client side script
        }
    })
);


app.post('/create_player_account', async (req, res) => {
    const { firstName, lastName, email, birthday, userName, password, retypePassword, gender } = req.body;
    const age = calculator.calculateAge(birthday);
    const type = 'Player';

    // Perform validation here

    if (password !== retypePassword) {
        return res.status(400).send('Passwords do not match!');
    }

    // Encrypt password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
        // Check if email or username already exists
        const existingUser = await db.query(
            'SELECT * FROM USER WHERE Email = ? OR Username = ?',
            [email, userName]
        );

        if (existingUser.length > 0) {
            return res.status(400).send('Email or username already exists!');
        }

        const result = await db.query(
            'INSERT INTO USER (Email, First_Name, Last_Name, Birthdate, Age, Gender, Username, Password_Hash, Type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [email, firstName, lastName, birthday, age, gender, userName, hashedPassword, type]
        );

        const id = result.insertId;

        await db.query('INSERT INTO PLAYER(UserID) VALUES(?)', [id]);

        return res.status(200).send({ message: 'Account created successfully!', userId: id });
    } catch (err) {
        console.error('Error when creating user', err);
        return res.status(500).send('Server error');
    }
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
                //console.log(req.session);
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



app.get('/verify-session', (req, res) => {
    // Check if user session exists
    if (req.session.userId) {
        // Query the database for user details
        const query = 'SELECT First_Name, Last_Name, Age,Gender, Username, Goals,\n' +
            '  Clean_Sheet, Win, Lose, Draw, Total_Game, Yellow_Cards, Red_Cards,Def_Rating, Offensive_Rating,P_VALUE\n' +
            '  FROM USER u JOIN PLAYER p ON u.ID = p.UserID WHERE u.ID = ?';
        db.query(query, req.session.userId, (error, results) => {
            if (error) {
                console.error('Could not execute query', error);
                res.status(500).send('Server error');
                return;
            }
            // If user exists, return user details
            if (results.length > 0) {
                const user = results[0];
                res.status(200).json({
                    firstName: user.First_Name,
                    lastName: user.Last_Name,
                    age: user.Age,
                    gender: user.Gender,
                    username: user.Username,
                    goals: user.Goals,
                    cleanSheet: user.Clean_Sheet,
                    win: user.Win,
                    lose: user.Lose,
                    draw: user.Draw,
                    totalGame: user.Total_Game,
                    yellowCards: user.Yellow_Cards,
                    redCards: user.Red_Cards,
                    defRating: user.Def_Rating,
                    offensiveRating: user.Offensive_Rating,
                    pValue: user.P_VALUE
                });
            } else {
                // If user does not exist, return error
                res.status(401).send('Session exists but user not found');
            }
        });
    } else {
        // If session does not exist, return error
        res.status(401).send('Session does not exist');
    }
});


app.get('/getPlayerTeams', (req, res) => {
    // Check if user session exists
    if (req.session.userId) {
        // Query the database for user details
        const query = 'SELECT * FROM Is_In JOIN TEAM ON Is_In.TeamID = TEAM.TeamID WHERE UserID = ? LIMIT 5';
        db.query(query, req.session.userId, (error, results) => {
            if (error) {
                console.error('Could not execute query', error);
                res.status(500).send('Server error');
                return;
            }
            // If user exists, return user details
            if (results.length > 0) {
                const teams = results;
                res.status(200).json(teams);

            } else {
                // If user does not exist, return error
                res.status(401).send('Session exists but user not found');
            }
        });
    } else {
        // If session does not exist, return error
        res.status(401).send('Session does not exist');
    }
});

app.get('/getPlayerGames', (req, res) => {
    // Check if user session exists
    if (req.session.userId) {
        // Query the database for user details
        const query = 'SELECT * FROM PLAYS_P JOIN Games ON PLAYS_P.GameID = Games.GameID WHERE PLAYS_P.UserID = ? LIMIT 4';
        db.query(query, req.session.userId, (error, results) => {
            if (error) {
                console.error('Could not execute query', error);
                res.status(500).send('Server error');
                return;
            }
            // If user exists, return user details
            if (results.length > 0) {
                const games = results;
                res.status(200).json(games);

            } else {
                // If user does not exist, return error
                res.status(401).send('Session exists but user not found');
            }
        });
    } else {
        // If session does not exist, return error
        res.status(401).send('Session does not exist');
    }
});







app.get('/getAllEvents', (req, res) => {
    const UserID = req.body.id;
    const query = 'SELECT * FROM COMPETITION';
    db.query(query, (error, results) => {
        if (error) {
            console.error('Could not execute query', error);
            res.status(500).send('Server error');
            return;
        }
        if (results.length > 0) {
            const events = results;
            res.status(200).json(events);
        } else {
            res.status(200).json([]);
        }
    });
});


app.post('/getAllCompetitionTeams', (req, res) => {
    const CompetitionID = req.body.id;
    const query = 'SELECT * FROM TEAM WHERE CompetitionID = ?';

    db.query(query, [CompetitionID], (error, results) => {
        if (error) {
            console.error('Could not execute query', error);
            res.status(500).send('Server error');
            return;
        }
        if (results.length > 0) {
            //console.log(results);
            res.status(200).json(results);
        } else {
            res.status(200).json([]);
        }
    });
});



app.post('/getAllCompetitionGames', (req, res) => {
    const CompetitionID = req.body.id;
    const query = 'SELECT * FROM GAMES WHERE CompetitionID = ?';

    db.query(query, [CompetitionID], (error, results) => {
        if (error) {
            console.error('Could not execute query', error);
            res.status(500).send('Server error');
            return;
        }
        if (results.length > 0) {
            //console.log(results);
            res.status(200).json(results);
        } else {
            res.status(200).json([]);
        }
    });
});



app.post('/getTeamInfo', (req, res) => {
    const TeamID = req.body.teamID;
    const query = 'SELECT * FROM TEAM WHERE TeamID = ?';


    db.query(query, [TeamID], (error, results) => {
        if (error) {
            console.error('Could not execute query', error);
            res.status(500).send('Server error');
            return;
        }
        if (results.length > 0) {

            res.status(200).json(results);
        } else {
            res.status(200).json([]);
        }
    });
});



app.post('/getAllTeamMembers', (req, res) => {
    const TeamID = req.body.teamID;
    const query = `SELECT U.First_Name, U.Last_Name, I.* FROM USER U JOIN PLAYER P ON U.ID = P.UserID JOIN Is_In I ON P.UserID = I.UserID WHERE I.TeamID = ?`;
    db.query(query, [TeamID], (error, results) => {
        if (error) {
            console.error('Could not execute query', error);
            res.status(500).send('Server error');
            return;
        }
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(200).json([]);
        }
    });
});



app.post('/getTeamGames', (req, res) => {
    const TeamID = req.body.teamID;
    const query = 'SELECT * FROM GAMES WHERE Team1_ID = ? OR Team2_ID = ?';

    db.query(query, [TeamID, TeamID], (error, results) => {
        if (error) {
            console.error('Could not execute query', error);
            res.status(500).send('Server error');
            return;
        }
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(200).json([]);
        }
    });
});



app.post('/getPlayersInGame', (req, res) => {
    const gameID = req.body.gameID;
    const query = `
        SELECT U.First_Name, U.Last_Name, I.TeamID, Pl.*
        FROM USER U
        JOIN PLAYER P ON U.ID = P.UserID
        JOIN Is_In I ON P.UserID = I.UserID
        JOIN PLAYS_P Pl ON P.UserID = Pl.UserID
        WHERE Pl.GameID = ?;
    `;

    db.query(query, [gameID], (error, results) => {
        if (error) {
            console.error('Could not execute query', error);
            res.status(500).send('Server error');
            return;
        }
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(200).json([]);
        }
    });
});


app.post('/getGameInfo', (req, res) => {
    const gameID = req.body.gameID;
    const query = `SELECT * FROM GAMES WHERE GameID = ?`;

    db.query(query, [gameID], (error, results) => {
        if (error) {
            console.error('Could not execute query', error);
            res.status(500).send('Server error');
            return;
        }
        if (results.length > 0) {
            //console.log(results);
            res.status(200).json(results);
        } else {
            res.status(200).json([]);
        }
    });
});



app.listen(9000, () => {
    console.log('Server is listening on port 9000');
});
