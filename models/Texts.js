const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let imageSchema = new Schema({
 head:String,
 body:String,
}, {
  timestamps:true,
})

module.exports = mongoose.model('Image', imageSchema)