const Jimp =require('jimp');
const Image = require("./models/Image");
module.exports =  ( path, data) => {
  console.log("converting")

 
// console.log(name)
// console.log(path.replace('.tiff', '.jpg'))
    
 
return Jimp
.read(path)
.then( async image => {
 await image
    .resize(Jimp.AUTO, 350)
    .background(0xFFFFFFFF)
    .getBase64Async(Jimp.MIME_JPEG)
    .then( async base64Image => {
      console.log
      let img = await Image.findByIdAndUpdate(data._id, {base64: base64Image}).then(dt=>dt).catch(err=>err);
       console.log(img)
    //  let base= base64Image;
    //  return base
    // return JSON.stringify(base);
    })
    .catch(err => err)
})



  }