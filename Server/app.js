/* The main webserver for the backend of UQ-Pool */

/* JS libraries to import */
const express = require('express');

/* Express webserver locations */
const sequelize = require('./utils/database.js');
//import router from './routes/routes.js';

//Tables
const User = require('./models/user')

sequelize.sync({force:true})

/* Setup the webserver*/
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* Basic get request to test the server*/
app.get('/', (req, res) => {
    res.send('Hello World!')
});

/* Start the webserver listening*/
app.listen(port, () => {
    console.log(`UQ-Pool listening on http://localhost:${port}`)
});

