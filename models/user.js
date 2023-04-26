import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tc: { type: Boolean, required: true },
})

const UserModal = mongoose.model('user', userSchema)

export default UserModal
