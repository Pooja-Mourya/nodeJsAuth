import express from 'express'
const router = express.Router()
import {
  userRegistration,
  userLogin,
  userChangePassword,
  userLogout,
  userResetPassword,
  //   userResetPasswordByEmail,
} from '../controller/userController.js'
import { verifyPassword } from '../middleWare/verifyPassword.js'

// token protector
router.use('/userChangePassword', verifyPassword)
router.use('/userLogout', verifyPassword)

router.post('/userRegistration', userRegistration)
router.post('/userLogin', userLogin)
router.post('/userChangePassword', userChangePassword)
router.get('/userLogout', userLogout)
router.get('/userResetPassword', userResetPassword)
// router.post('/userResetPasswordByEmail/:id/:token', userResetPasswordByEmail)

export default router
