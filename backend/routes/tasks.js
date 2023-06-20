const express = require('express')
const {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
} = require('../controllers/taskController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all task routes
router.use(requireAuth)

//get all tasks
router.get('/', getTasks)

//get a single task
router.get('/:id', getTask)

//post a new task
router.post('/', createTask)

//delete a task
router.delete('/:id', deleteTask)

//update a task
router.patch('/:id', updateTask)

module.exports = router