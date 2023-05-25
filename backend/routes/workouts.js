const express = require('express')

const router = express.Router()

//get all workouts
router.get('/', (req, res) => {
    res.json({mssg: 'GET all workouts'})
})

//get a single workout
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single workouts'})
})

//post a new workout
router.post('/', (req, res) => {
    res.json({mssg: 'POST a new workout'})
})

//delete a workout
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a workout'})
})

//update a workout
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a workout'})
})

module.exports = router