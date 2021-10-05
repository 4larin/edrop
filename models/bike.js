const mongoose = require('mongoose')
const Joi = require('joi');
const { string } = require('joi');

const schema = {
    name: Joi.string().min(3).required()
}

const bikeSchema = new mongoose.Schema({
    make: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        lowercase: true,
    },
    color: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        lowercase: true,
        enum: ['red', 'yellow', 'blue', 'orange', 'indigo', 'purple']
    },
    model: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        default: 'Demo model',
        lowercase: true,

    },
    numberPlate: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 12,
        default: 'AB-123-DEMO'
    },
    date: {
        type: Date,
        default: Date.now,
    },
    owner: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        default: 'Owner _ID here'
    },
    rider: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 50,
        default: 'Rider-ID-Here'
    },
    pictures: {
        type: Array,
        validate: {
            validator: function (v) {
                return v && v.length > 0
            },
            message: 'A bike should have at least one picture'
        }
    },
    suspended: {
        type: Boolean,
        required: true,
        default: false,
    },
    suspendedReason: {
        type: String,
        lowercase: true,
        maxlength: 500,
        required: function () { return this.suspended }
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    logs: {
        type: Array,
    },
    // -------Async Validators not working -----------
    // ayncValidate: {
    //     type: string,
    //     validate: {
    //         isAsync: true,
    //         validator: function (v, callback) {
    //             setTimeout(() => {
    //                 const result = v & v > 1;
    //                 callback(result)
    //             }, 9000);
    //         },
    //         message: 'This is a test validator'
    //     }
    // }
});

const Bike = mongoose.model('Bike', bikeSchema)

function validate() {
    console.log('Bike is validating')
}

async function createBike() {
    const kawasaki = new Bike({
        make: "Toyota",
        model: 'Acord',
        color: "blue",
        numberPlate: 'NO-001-DE',
        owner: 'Bola Salami',
        rider: 'Bode thomas',
        pictures: ['Picture1'],
        suspended: false,
        suspendedReason: null,
        active: true,
        logs: [],
    })

    const result = await kawasaki.save();
    console.log(result)
}

// createBike().catch(e => console.log(e))


exports.Bike = Bike
exports.validate = validate