require('dotenv').config()


const express = require('express')
const workoutRoutes = require('./routes/workouts')

// clear    To clear the terminal
// cancle process in terminal : ctrl + c

// npm install dotenv
// npm install -g nodemon     *ONLY ONCE*
// in shell : Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
//  nodemon server.js            ---- dynamic node change

// OR just do (after installing nodemon) : npm run dev


// fire up the express app
const app = express()

// middleware
app.use(express.json()) // parse

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)

// listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})

// get the .env file
process.env