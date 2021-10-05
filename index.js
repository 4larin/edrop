const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const debug = require('debug')('app:staging')
const debugHttp = require('debug')('app:http')
const debugDB= require('debug')('app:database')

// Routes 
const home = require('./routes/home');
const bikes = require('./routes/bikes');
const owners = require('./routes/owners');

// configurations 
debug(`Application Name: ${config.get('name')}`)

// Database connect 
mongoose.connect('mongodb://localhost/dropp')
    .then(()=>debugDB('connected to MongoDB...'))
    .catch((err)=> debugDB(err))


dotenv.config()
const app = express()
app.use(helmet())

if (app.get('env')==='development'){
    app.use(morgan('tiny', { stream: { write: msg => debugHttp(msg) } }))
    debug('Morgan enabled...')
}

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.use('/', home);
app.use("/api/bikes",bikes);
app.use("/api/bikes",bikes);
app.use('/api/owners', owners)


const port = process.env.PORT



app.listen(port, ()=>debug('Listening on port ' + port))