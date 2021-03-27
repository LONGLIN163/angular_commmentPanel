var express = require('express')
var app = express()



app.use(express.static('www'))

app.listen(3000)
console.log("running on 3000,hahaha")