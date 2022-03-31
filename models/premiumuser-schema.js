const mongoose = require('mongoose')


const premiumuserSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Premium-user', premiumuserSchema)