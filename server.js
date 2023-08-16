const routes = require('./routes')
// require in express and declare port
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3002

// tell express which folder in file system the browser system should be able to request anything from
app.use(express.static('public'))
// middleware to detect body
app.use(express.json())
// middleware to recognize incoming request object as strings or arrays
app.use(express.urlencoded({ extended: true }))

// use routes
app.use(routes)

// to listen
app.listen(PORT, () => {
    console.log(`Express listening on port http://localhost:${PORT}`)
})