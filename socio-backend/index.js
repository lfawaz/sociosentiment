var express = require('express'),
    app = express()

var tweetsRoutes = require('./routes/tweets')


app.use('/api/tweets', tweetsRoutes)

const port = 3001
const host = 'localhost'

app.listen(port, host, () => console.log(`APP Running on port ${host}:${port}`))
