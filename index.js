// require('dotenv').config
import express from 'express'
const app = express()
import cors from 'cors'
import connection from './db.js'
import userRouter from './route/user.js'
import bodyParser from 'body-parser'

//database

connection()

// middleware

app.use(bodyParser.json())
app.use(express.json())
app.use(cors())

// router

app.use(userRouter)

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`listen on port ${port}`))
