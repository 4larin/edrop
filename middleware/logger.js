const morgan = require('morgan')
const express = require('express')
const app = express()
const dotenv = require('dotenv')



dotenv.config()

function logger(req, res, next){
   app.use(morgan('tiny'))
    next()
}

module.exports = logger;