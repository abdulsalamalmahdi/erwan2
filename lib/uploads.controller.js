const multer = require('multer'),
fs = require('fs'),
 Ablum = require("../models/Album"),
 Image = require("../models/Image");
// const tiffToJPEG = require('./tiffTojpeg');
let DIR = './public/albums';

let album;
let image;
const storage = multer.diskStorage({
destination: async (req, file, cb) => {

 if (req.params.album_id){
    album = await Ablum.findById(req.params.album_id)
    .then(al => al)
  }else{
   
    album={name:'random'}
  }

  try {
    if (!album.name) {
      throw new Error("album does not exists!");
    }
    const exist = await fs.readdirSync(DIR).find(file => file === album.name);

    if (exist) {

      cb(null, DIR + '/' + album.name);

    } else if (!exist) {
      await fs.mkdirSync(DIR + '/' + album.name);


      cb(null, DIR + '/' + album.name);
    }
  } catch (err) {
    console.log(err)
  }

},

filename: async (req, file, cb) => {
 
  
  let extension = file.mimetype.split('/')[1]
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
  const fileName = uniqueSuffix + '.' + extension;
 

  cb(null, fileName);



  image = await Image.create({
    image_name: fileName, url: 'public/albums' + '/' + album.name + '/' + fileName, album: album._id?album._id:null,
    main: file.fieldname === 'file' ? true : false,
  })
  image = await image.populate('album').execPopulate();
  console.log(image)
  if(album.id){
    await album.updateOne(
    { _id: album._id },
    { $push: { images: image } }

  ).then(al => {
    return al
  }).catch(err => err);
  }
  

 

}
});


const upload = multer({
storage: storage,
fileFilter: (req, file, cb) => {
  
  console.log('multer upload')

  
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ) {
    cb(null, true);
  } else {
    cb(null, false);
    console.log(file)
    Image.deleteOne({image_name:file.filename})
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
}
});


module.exports= upload;


