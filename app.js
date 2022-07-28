require('dotenv').config()
const express = require('express')
const cors = require('cors')

const trainRouter = require('./routers/trainRouter')
const userRouter = require('./routers/userRouter')

const app =express()

app.use(express.json())
app.use(function (req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Authorization, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT,PATCH')
    next()
})

app.get('/', (req, res)=>{
    res.json("Hello world!")
})

app.use('/trains', trainRouter)
app.use('/users', userRouter)

app.listen(5000, ()=>{
    console.log("App listen 5000")
})