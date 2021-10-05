const express = require('express');
const mongoose = require('mongoose');

const router = express.Router()

// DB
const riderSchema =new mongoose.Schema({
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
    licenseNumber:{
        type: String,
        required: true,
    },
    bike:{
        type: String,
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
    guarantor:{
        type:Array,
        required: true
    },
    logs: {
        type: Array,
    }
})

const rider = mongoose.model('rider', riderSchema)


// API
// Get all riders
router.get('/', (req, res)=>{
    res.send('All riders')
})

// Get rider by id
router.get('/:id', (req, res)=>{
    res.send(`rider with id ${req.params.id}`)
})

// Get rider by firstname + lastname,status,email,phone,
router.get('/', (req, res)=>{
    res.send('Get user by name in body')
})

// Edit rider
router.put('/:id', (req, res)=>{
    res.send(`ID:${req.params.id} Body: ${json.stringify(req.body)}`)
})

// Create rider
router.post('/', (req, res)=>{
    res.send(`Body: ${json.stringify(req.body)}`)
})

// Delete rider 
router.delete('/:id', (req, res)=>{
    res.send(`rider: ${req.params.id} has been deleted`)
})


module.exports = router