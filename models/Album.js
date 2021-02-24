const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

let albumSchema = new Schema({
  category:String,
  description:String,
  name:String,
  images:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Image"
    }
  ],
}, {
  timestamps:true,
})

module.exports = mongoose.model('Album', albumSchema)