import UserModal from '../models/user.js'
import jwt from 'jsonwebtoken'

export async function verifyPassword(req, res, next) {
  let token
  const { authorization } = req.headers
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1]

      //   console.log('access_token', token)
      const { decoded } = jwt.verify(token, 'process.env.PRIVATE_KEY')

      console.log('first', decoded)
      const user = await UserModal.findById(decoded).select('-password')
      next()
      if (!user) {
        return res.status(401).json({ error: 'Unauthorized' })
      }
      return res.json({ message: 'You have access to this protected route' })
    } catch (error) {
      console.error(error)
      return res.status(401).json({ error: 'Unauthorized' })
    }
  } else {
    return res.status(401).json({ error: 'Unauthorized , token not found' })
  }
}
