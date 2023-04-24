// require('dotenv').config
// const express = require('express')
import express from 'express'
const app = express()
// const cors = require('cors')
import cors from 'cors'
// const connection = require('./db')
import connection from './db.js'
// const jwt = require('jsonwebtoken')
import jwt from 'jsonwebtoken'
const secretKey = 'secretKey'
// const userRouter = require('./route/user')
import userRouter from './route/user.js'
// const authRouter = require('./route/auth')

//database

connection()

// middleware

app.use(express.json())
app.use(cors())

// router

app.use(userRouter)
// app.use('/api/auth', authRouter)

app.post('/login', (req, res) => {
  const user = {
    id: '1',
    userName: 'pooja',
    email: 'puja@gmail.com',
  }

  jwt.sign({ user }, secretKey, { expiresIn: '300s' }, (error, token) => {
    res.json({
      token,
    })
  })
})

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`listen on port ${port}`))
