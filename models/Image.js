const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let imageSchema = new Schema({
  desc:String,
  caption:String,
  main:Boolean,
  base64:String,
  url:String,
  image_name:String,
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Album"
  },
  album_name:String,
}, {
  timestamps:true,
})

module.exports = mongoose.model('Image', imageSchema)