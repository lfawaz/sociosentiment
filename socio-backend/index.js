var express = require('express'),
    app = express()
    mongoose = require('mongoose')

var tweetsRoutes = require('./routes/tweets')
var dbRoutes = require('./routes/dbData')
var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api/tweets', tweetsRoutes)
app.use('/db/tweets', dbRoutes)

const port = 3002
const host = 'localhost'

app.listen(port, host, () => console.log(`APP Running on port ${host}:${port}`))
