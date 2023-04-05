require('dotenv').config();
// This package would enable us to remove the express-asyn-handlers wrapped around the controller functions
require('express-async-errors')
const express = require('express');
const app = express();
const path = require('path');
const { logger, logEvents } = require('./middleware/log');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const corsOptions = require('./configuration/corsOptions');
const connectDB = require('./configuration/dbConn');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500
connectDB();

app.use(logger);
// app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'fo-public')));


app.use('/', require('./routes/root'));
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/users/singleuser', require('./routes/userRoutes'))
app.use('/users/:username', require('./routes/userRoutes'))
app.use('/users/:id', require('./routes/userRoutes'))
app.use('/profile', require('./routes/profileRoute'))
app.use('/profile/:id', require('./routes/profileRoute'))
app.use('/pros', require('./routes/proRoutes'))
app.use('/plants', require('./routes/plantRoutes'))
app.use('/onePlant/:commonname', require('./routes/plantRoutes'))
app.use('/craft', require('./routes/plantRoutes'))
app.use('/quote', require('./routes/quoteRoutes'))
app.use('/locations', require('./routes/locationRoutes'))
app.use('/locations/last', require('./routes/locationRoutes'))
app.use('/locations/name', require('./routes/locationRoutes'))

app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'public', 'fo-404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found'})
    } else (res.type('txt').send('404 Not Found'))
})

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Forgar server is running on port: ${PORT}`));
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')

})



// **** Dave Gray - MERN Stack full tutorial and Project - Online Resource: https://www.youtube.com/watch?v=CvCiNeLnZ00 ******

// console.log(process.env.NODE_ENV);

// Telling express where to find files using 'path' - This can be used for CSS, Images etc
// The format of this code is not required, it could be written as: app.use(express.static('fo-public'));
// Has been left like this to keep the format the same throughout the application
// __dirname is a directory global variable