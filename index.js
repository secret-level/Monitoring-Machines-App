const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const session = require('express-session');
const { sessionConfig } = require('./backend/src/controllers/config.js');
const login = require('./backend/src/routes/login.js');
const machines = require('./backend/src/routes/machines.js');
const machinesData = require('./backend/src/routes/machinesData.js');
const autoreport = require('./backend/src/routes/autoreport.js');
const userSettings = require('./backend/src/routes/userSettings.js');
const logout = require('./backend/src/routes/logout.js');
const app = express();
app.use(express.json());//POST/PUT json object
app.use(express.urlencoded({ extended: true }));//POST/PUT string/array
app.use(session(sessionConfig));//login session/cookie

// RUNS THE CRONJOB
const cronAutoreport = require('./backend/src/controllers/cronAutoreport');

app.use('/login', login);

app.use('/machines', machines);

app.use('/machinesData', machinesData);

app.use('/autoreport', autoreport);

app.use('/usersettings', userSettings);

app.use('/logout', logout);

//I need this for heroku or it'll crash, DO I NEED THIS FOR FLY.IO?
//I suppose this starts index.html login page
app.use(express.static('./client/build', { root: __dirname }));

app.get('*', (request, respond) =>
{
  respond.sendFile('/client/build/index.html', { root: __dirname });
});//https://stackoverflow.com/questions/44723509/react-routing-works-in-locally-but-not-heroku

// 5000
const port = process.env.PORT
app.listen(port, () => console.log(`listening on port ${port}\n`));