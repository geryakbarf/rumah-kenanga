//Initiate the NodeJS Module
require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const session = require('cookie-session')
const mongo = require('./models/index')

//database
const db = mongo.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
    console.log("Connection Established")
})

app.use(session({
    name: "mames",
    keys: [process.env.SESSION_KEY],
    maxAge: 24 * 60 * 60 * 1000 * 720
}))

// upload
app.use(fileUpload())

//Security
app.disable('x-powered-by')

//load body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//load static file
const staticOptions = {
    setHeaders: function (res, path, stat) {
        res.set('Service-Worker-Allowed', '/');
    },
};
app.use('/assets', express.static('public', staticOptions),)

//load template engine
app.engine('.html', require('ejs').__express)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

require('./routers')(app)

module.exports = app
