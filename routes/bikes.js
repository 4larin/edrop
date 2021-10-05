const { json } = require('body-parser');
const express = require('express');
const multer = require('multer')

const router = express.Router();
const upload = multer({ dest: 'bikes/', fileFilter: 'pictures', })

const { Bike } = require('../models/bike')
const { validate } = require('../models/bike')


// Get all bikes
router.get('/', (req, res) => {
    (async function () {
        const bikes = await Bike.find({ suspended: false })
        res.send(bikes)
    })()
});




// Get - search for bikes 
// Get bikes by make/plate-number/owner/rider-assigned/is_active
router.get('/search', (req, res) => {
    async function searchBikes() {
        let { make, color, numberPlate, model } = req.query
        console.log(make, color, numberPlate, model)
        return (await Bike
            .find()
            .and([
                { color: color ? color : /.*/ },
                { make: make ? make : /.*/ },
                { numberPlate: numberPlate ? numberPlate : /.*/ },
                { model: model ? model : /.*/ },

            ])
            .sort({ make: 1 })
            .limit(10)
        )
    }
    searchBikes()
        .then((data) => res.send(data ? data : `Kindly refine your search`))

})



// Register bike
router.post('/', (req, res) => {
    const { make, color, model, numberPlate, owner, rider, pictures } = req.body
    let bike = new Bike({ make, color, model, numberPlate, owner, rider, pictures })
    bike.validate().catch(e => console.log(e.message))
    async function createBike() {
        return await bike.save()
    }
    createBike()
        .then((data) => res.send(data))
        .catch(err => {
            res.status(400).send({ error: err })
        })
});

// Edit bike - querry first aproach
router.put('test/:id', (req, res) => {
    async function updateBike() {
        const bike = await Bike.findById(req.params.id)
        if (!bike) return

        bike.color = 'Indogo'

        return result = await bike.save()
    }

    updateBike()
        .then((data) => res.send(data ? data : `No bike with id "${req.params.id}"`))
        .catch(err => {
            res.status(400).send({ error: err })
        })
}
)


// Edit bike - querry first aproach
router.put('/:id', (req, res) => {
    async function updateBike() {
        const { color, rider, pictures } = req.body
        const bike = await Bike.findByIdAndUpdate(
            req.params.id, {
            $set: { color, pictures, rider }
        }, { new: true }
        )
        return bike
    }

    updateBike()
        .then((data) => res.send(data ? data : `No bike with id "${req.params.id}"`))
        .catch(err => {
            res.status(400).send({ error: err })
        })
}
)


// Edit bike - update first aproach - when you don't need to check value of something before updating 
router.put('/suspend/:id', (req, res) => {
    async function updateBike() {
        return await Bike.updateOne({
            _id: req.params.id,
            $set: {
                suspended: true,
                suspendedReason: 'Suspend this user, e dey do anyhow'
            }
        })
    }

    updateBike()
        .then((data) => res.send(data ? data : `No bike with id "${req.params.id}"`))
        .catch(err => {
            res.status(400).send({ error: err })
        })
}
)



// Edit bike - update first aproach - when you don't need to check value of something before updating - Method 2 returns the object 
router.put('/suspended/:id', (req, res) => {
    async function updateBike() {
        return await Bike.findByIdAndUpdate(
            req.params.id, {
            $set: {
                suspended: false,
                suspendedReason: ''
            }
        }, { new: true }
        )
    }

    updateBike()
        .then((data) => res.send(data ? data : `No bike with id "${req.params.id}"`))
        .catch(err => {
            res.status(400).send({ error: err })
        })
}
)


// Delete bike 
router.delete('/:id', (req, res) => {
    async function getBike() {
        return await Bike.findByIdAndDelete(req.params.id)
    }
    getBike()
        .then((data) => res.send(data === null ? 'Bike does not exist' : data ? data : `No bike with id "${req.params.id}"`))
        .catch(err => {
            res.status(400).send({ error: err })
        })
})


// Get a specific bike by id
router.get('/:id', (req, res) => {
    async function getBike() {
        return await Bike.findById(req.params.id)
    }
    getBike()
        .then((data) => res.send(data ? data : `No bike with id "${req.params.id}"`))
        .catch(err => {
            res.status(400).send({ error: err })
        })
})


module.exports = router