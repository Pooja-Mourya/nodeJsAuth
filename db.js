// const mongoose = require('mongoose')
import mongoose from 'mongoose'

export default () => {
  const connectionParams = {
    useNewUrlParser: true,
    // useUnifiedTropology: true,
  }
  try {
    // mongoose.connect(`${process.env.DB}`, connectionParams)
    mongoose.connect(
      'mongodb+srv://pujamourya575:Bhopal***123456@cluster0.sqlsueq.mongodb.net/?retryWrites=true&w=majority',
      connectionParams,
    )
    console.log('connected to database successfully')
  } catch (error) {
    console.log(error)
    console.log('not connect to database')
  }
}

// export default db
