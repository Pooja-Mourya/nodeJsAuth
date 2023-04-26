import UserModal from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function userRegistration(req, res) {
  try {
    const { firstName, lastName, email, password, tc } = req.body
    const user = await UserModal.findOne({ email })
    if (user) {
      return res.status(409).send({ message: 'user already exist' })
    }

    const hashPassword = await bcrypt.hashSync(password, 12)
    const result = await UserModal.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
      tc: tc,
    })

    const token = await jwt.sign(
      { userId: result._id, email: result.email },
      'process.env.PRIVATE_KEY',
    )
    res.status(201).json({
      message: 'user added successfully ',
      user: result,
      token: token,
    })
  } catch (error) {
    console.log('error', error)
    res.status(500).send({ message: 'user internal error' })
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body
    const user = await UserModal.findOne({ email })
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }
    if (password !== user.password) {
      return res.status(400).json({ error: 'Invalid credentials' })
    }
    const token = jwt.sign({ email }, 'process.env.PRIVATE_KEY', {
      expiresIn: '8h',
    })
    return res
      .status(201)
      .json({ message: 'user login successfully', user: user, token: token })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Server error' })
  }
}

export async function userChangePassword(req, res) {
  const { password, confirm_password } = req.body
  try {
    if (password && confirm_password) {
      if (password != confirm_password) {
        return res
          .status(404)
          .json({ error: 'password and confirm password must be same' })
      } else {
        // const saltPassword = await bcrypt.genSaltSync(12)
        // const hashPassword = await bcrypt.hashSync(password, saltPassword)
        return res.status(201).json({ error: 'change password successfully' })
      }
    } else {
      return res
        .status(401)
        .json({ error: 'enter password & confirm password' })
    }
  } catch (error) {
    console.error(error)
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

export async function userLogout(req, res) {
  res.send({ user: req.user })
}

export async function userResetPassword(req, res) {
  try {
    const { email } = req.body
    if (email) {
      const user = await UserModal.findOne({ email })

      if (user) {
        const secret = user._id + 'process.env.PRIVATE_KEY'
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          secret,
          {
            expiresIn: '8h',
          },
        )
        const link = `http://127.0.0.3000/user/reset/${user._id}/${token}`

        // console.log('link', link)
        let into = await transporter.sendMail({
          from: process.env.SMPT_USER,
          to: options.email,
          subject: options.subject,
          text: options.message,
        })
        return res.status(201).json({ message: 'send reset password mail' })
      } else {
        return res.status(401).json({ message: 'user dose not exist' })
      }
    } else {
      return res.status(401).json({ message: 'something went wrong' })
    }
  } catch (error) {
    console.log('error', error)
    return res.status(401).json({ message: 'server error' })
  }
}

// export async function userResetPasswordByEmail(req, res) {
//   const { password, confirm_password } = req.body
//   const { id, token } = req.params

//   //   const user = await UserModal.findById(email)
//   //   const new_secret = user._id + 'process.env.PRIVATE_KEY'

//   console.log('req.params', req.params)

//   return

//   try {
//     jwt.verify(token, 'process.env.PRIVATE_KEY')
//     if (password && confirm_password) {
//       if (password != confirm_password) {
//         return res
//           .status(404)
//           .json({ error: 'password and confirm password must be same' })
//       } else {
//         const saltPassword = await bcrypt.genSaltSync(12)
//         const hashPassword = await bcrypt.hashSync(password, saltPassword)
//         await UserModal.findByIdAndUpdate(user._id, {
//           $set: { password: hashPassword },
//         })
//         return res.status(201).json({ error: 'password reset successfully' })
//       }
//     } else {
//       return res
//         .status(401)
//         .json({ error: 'enter password & confirm password' })
//     }
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ error: 'Server error' })
//   }
// }
