// const mongoose = require('mongoose')
import mongoose from 'mongoose'
// const jwt = require('jsonwebtoken')
// const Joi = require('joi')
// const passwordComplexity = require('joi-password-complexity')

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tc: { type: Boolean, required: true },
})

const UserModal = mongoose.model('user', userSchema)

export default UserModal

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, process.env.PRIVATE_KEY, {
//     expiresIn: '7d',
//   })
//   return token
// }

// const validate = (data) => {
//   const schema = Joi.object({
//     firstName: Joi.string().required().label('First Name'),
//     lastName: Joi.string().required().label('Last Name'),
//     email: Joi.string().email().required().label('Email'),
//     password: passwordComplexity().required().label('Password'),
//   })
//   return schema.validate(data)
// }

// module.exports = { User, validate }
