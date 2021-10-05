const express = require('express');
const mongoose = require('mongoose');
const logger = require('../middleware/logger');

const router = express.Router()

// DB
const ownerSchema =new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 25
    },
    lastName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 25
    },
    email:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 225,
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 225,
        validate: /.*.*/i
    },
    address:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 225,
    },
    state:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 225,
    },
    country:{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 225,
    },
    phone:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
    },
    emailVerified:{
        type: Boolean,
        required: true,
        default: false,
    },
    phoneVerified:{
        type: Boolean,
        required: true,
        default: false,
    },
    profilePicture:{
        type: String,
    },
    bikes:{
        type: Array,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true,
    },
     suspended: {
        type: Boolean,
        required: true,
        default: false,
    },
    suspendedReason: {
        type: String,
        default: false,
    },
    date: {
        type: Date,
        required: true,
        default: true,
    },
    logs: {
        type: Array,
    }
})

const owner = mongoose.model('owner', ownerSchema)



// API
// Get all owners
router.get('/', (req, res)=>{
    res.send('All owners')
})

// Get owner by id
router.get('/:id', (req, res)=>{
    res.send(`Owner with id ${req.params.id}`)
})

// Get owner by firstname + lastname,status,email,phone,
router.get('/', (req, res)=>{
    res.send('Get user by name in body')
})

// Edit owner
router.put('/:id', (req, res)=>{
    res.send(`ID:${req.params.id} Body: ${json.stringify(req.body)}`)
})

// Create owner
router.post('/', (req, res)=>{
    res.send(`Body: ${json.stringify(req.body)}`)
})

// Delete owner 
router.delete('/:id', (req, res)=>{
    res.send(`Owner: ${req.params.id} has been deleted`)
})


// Building custom middleware function 
router.get('/test', (req, res, next)=>{
    console.log('logging...')
    res.send('testing middleware function');
    next()
})


module.exports = router