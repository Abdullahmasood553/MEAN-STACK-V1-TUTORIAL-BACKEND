const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');
const employeeController = require('./controllers/employeeController');

// Load Config
dotenv.config({path: './config/config.env'});

connectDB();

const app = express();
app.use(bodyParser.json());
app.use(cors( {origin: 'http://localhost:4200'}));

// Body Parser (Brad)
// app.use(express.urlencoded({ extended:false }));
// app.use(express.json());


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));


app.use('/employees', employeeController);