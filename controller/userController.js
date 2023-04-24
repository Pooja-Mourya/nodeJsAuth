// const router = require('express').Router()
// const { User, validate } = require('../models/user')

import UserModal from '../models/user.js'
// const bcrypt = require('bcrypt')
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class userController {
  static async userRegistration(req, res) {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      tc,
    } = req.body

    try {
      // const { error } = validate(req.body)
      // if (error) {
      //   return res.status(400).send({ message: error.detail[0].message })
      // }
      const user = await UserModal.findOne({ email: email })

      if (user) {
        return res
          .status(409)
          .send({ message: 'user register with email account' })
      }
      // else {
      //   if (firstName && lastName && password && tc) {
      //     if (password === confirmPassword) {
      //       try {
      //         const salt = await bcrypt.genSaltSync(12)
      //         const hashSalt = await bcrypt.hashSync(password, salt)
      //         const userSave = new UserModal({
      //           firstName: firstName,
      //           lastName: lastName,
      //           email: email,
      //           password: hashSalt,
      //           tc: tc,
      //         })
      //         await userSave.save()
      //       } catch (error) {
      //         console.log(error)
      //         res.status(500).send({ message: 'user internal error' })
      //       }
      //     } else {
      //       return res
      //         .status(409)
      //         .send({ message: 'password and confirm password should be same' })
      //     }
      //     return res.status(409).send({ message: 'all filed are required' })
      //   }
      // }

      const salt = await bcrypt.genSaltSync(process.env.SALT)
      const hashSalt = await bcrypt.hashSync(req.body.password, salt)

      await new UserModal({ ...req.body, password: hashSalt }).save()
      const token = jwt.sign({ userId: user._id }, 'process.env.PRIVATE_KEY')

      console.log('jwtToken', token)
      res
        .status(201)
        .send({ message: 'user added successfully ', token: token })
    } catch (error) {
      console.log('error', error)
      res.status(500).send({ message: 'user internal error' })
    }
  }

  static async userLogin(req, res) {
    try {
      const { email, password } = req.body
      if (email && password) {
        const findUser = UserModal.findOne({ email: email })
        if (findUser != null) {
          console.log('findUser', findUser)
          const isMatch = await bcrypt.compareSync(password, findUser.password)
          if (findUser.email === email && isMatch) {
            return res.status(201).send({ message: 'user login success fully' })
          } else {
            return res
              .status(409)
              .send({ message: 'user and password incorrect' })
          }
        } else {
          return res.status(409).send({ message: 'you are not register user' })
        }
      } else {
        return res.status(409).send({ message: 'all filed are required' })
      }
    } catch (error) {
      console.log('error', error)
      return res.status(409).send({ message: 'unable to login ' })
    }
  }
}

export default userController
