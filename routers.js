// eslint-disable-next-line no-unused-vars
let express = require('express'),
  multer = require('multer'),
  fs = require('fs'),

  controllers = require('./controllers'),
  router = express.Router();

  
const { createToken } = require("./lib/auth");
const { hash, compareHash } = require("./lib/util");

const Ablum = require("./models/Album");
const Image = require("./models/Image");
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
  // filename: (req, file, cb) => {
  //   const fileName = file.originalname.toLowerCase().split(' ').join('-');
  //   cb(null, fileName)
   //}
  filename: async (req, file, cb) => {
   
    
    let extension = file.mimetype.split('/')[1]
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileName = uniqueSuffix + '.' + extension;
   

    cb(null, fileName);



    image = await Image.create({
      image_name: fileName, url: DIR + '/' + album.name + '/' + fileName, album: album._id?album._id:null,
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
    

    // if (extension === 'tiff') {


    //   const path = DIR + '/' + album.name + '/' + fileName;
    //   toJPEG = await tiffToJPEG(path, image);
    //   console.log(toJPEG)
    // }

  }
});


var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // console.log(req.params)
    console.log('multer upload')
  
    // console.log(file.mimetype)
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});

// Album model
let Album = require('./models/Album');
const Admin = require('./models/Admin');

//get main image
router.get('/image/:_id', async (req, res) => {
  const { _id } = req.params;
  await Image.find({ album: _id, main: true }).then(async dt => {
    await console.log(dt)
    res.json(dt[0])
  })
})

//add description to an image 

router.put('/image/:_id', async(req, res)=>{
  
    const { _id } = req.params;
    const { desc} = req.body;
    console.log(req.body)
 
    console.log(desc)
try{

const image= await Image.findByIdAndUpdate(_id, { desc:desc });
 
console.log(image)
    //   let all= await Image.find()
  
    // let album = await Album.findById(image.album);
    // let tot = await album.toObject();
    // tot.images= all;
  res.status(200).json(image)
}catch(err){
res.send(err)
}
 
//  .then(async dt => {
//     const all = await find().then(data=>data).catch(err=>err);
//     const album= await findById(dt.album).then(al=>al).catch(err=>err);
//     let tot = await album.toObject();
//     tot.images= all;
//     dt? res.json(tot): res.status(404).send("no recored found! upload a new image")
//     }).catch(err => console.log(err));
  


}
)
//put main image
router.post('/image/:_id',
  async (req, res) => {
    const { _id } = req.params;
    const { main, caption } = req.body;
 
    console.log(caption)
try{

const image= await Image.findByIdAndUpdate(_id, { main: !!main, caption:caption });
 
console.log(image)
    //   let all= await Image.find()
  
    // let album = await Album.findById(image.album);
    // let tot = await album.toObject();
    // tot.images= all;
  res.status(200).json(image)
}catch(err){
res.send(err)
}
 
//  .then(async dt => {
//     const all = await find().then(data=>data).catch(err=>err);
//     const album= await findById(dt.album).then(al=>al).catch(err=>err);
//     let tot = await album.toObject();
//     tot.images= all;
//     dt? res.json(tot): res.status(404).send("no recored found! upload a new image")
//     }).catch(err => console.log(err));
  

  });

  // post random images
  router.post('/album/random',
  upload.array('file[]'),
  async (req, res) => {


    const images = await Image.find({album:null  }).then(async dt => {

      return await dt
    }).catch(err => err);
    album.images = images;
    res.json(album);


  }
  );

// post images
router.post('/album/:album_id',
  upload.array('file[]'),
  async (req, res) => {

    let { album_id } = req.params;
    const { desc } = req.body;
    let album = await Album.findByIdAndUpdate(album_id, { description: desc ? desc : null })
      .then(async re => {

        let albumObj = await re.toObject();

        return albumObj;
      }).catch(err => err)

    const images = await Image.find({ album: album._id }).then(async dt => {

      return await dt
    }).catch(err => err);
    album.images = images;
    res.json(album);


  });
// create album
router.post('/albums', async (req, res) => {
  let { name,category } = req.body;
  // let {files}= req.files;

  try {
    Album.findOne({ name: name },
      (err, alb) => {
        if (err) {
          res.send(err);
        } else if (alb) {
          res.send("album name already taken!");
        } else {
          Album.create({ name: name, category: category }).then(async (rs) => {
            return rs.save();
          }).then(async (dt) => {
            const newAlbum = await dt.toObject();
            res.send(newAlbum);
          })
        }
      }

    );
  } catch (err) {
    if (!err.message) {
      return res.status(500).send({
        message: "An unexpected error occured during add"
      })
    } else {
      return res.status(400).json(err.message)
    }

  }

});

//get all albums
router.get("/albums", (req, res) => {

  Album.find().then(async data => {
     
    res.header('Access-Control-Allow-Origin','*')
    res.status(200).send(
      data
    );
  });
});

// get exibitions only
router.get("/albums/exibitions", (req, res) => {
  Album.find({category: 'exibition'}).then(async data => {

    res.status(200).send(
      data
    );
  });
});

// get projects 
router.get("/albums/projects", (req, res) => {
  Album.find({category: 'project'}).then(async data => {

    res.status(200).send(
      data
    );
  });
});

// get workshops 
router.get("/albums/workshops", (req, res) => {
  Album.find({category: 'workshop'}).then(async data => {

    res.status(200).send(
      data
    );
  });
});

//get all images 
router.get("/images", (req, res) => {
  Image.find().then(async data => {

    res.status(200).send(
      data
    );
  });
});

// get an album 
router.get("/album/:_id", (req, res) => {
  console.log(req.params._id)
  controllers.getAlbum(req, res)

})


// get an album 
router.get("/album/:_id", (req, res) => {
  console.log(req.params._id)
  controllers.getAlbum(req, res)

})
//main route
router.get("/", (req, res) => {
  Album.find().then(data => {
    res.status(200).json({
      message: "Data fetched!",
      ...data
    });
  });
});

// router.get('/:_id', (req, res, next) => {
//   controllers.getAlbum(req, res)
// })


//registeration

router.post("/register", async (req, res) => {
  await console.log(req.body);

  const password = await hash(req.body.password);
  const rawUser = {
    ...req.body,
    password,
  };

  try {
    Admin.findOne(
      {
        email: rawUser.email,
      },
      (err, user) => {
        if (err) {
          res.send(err);
        } else if (user) {
          res.send("user already exist");
        } else {
          Admin.create(rawUser)
            .then(async (user) => {
              return user.save();
            })
            .then(async (user) => {
              const newUser = await user.toObject();
              console.log(newUser);
              res.send(newUser);
            });
        }
      }
    );
  } catch (err) {
    res.send(err);
  }
});

// login 
router.post("/login", async (req, res) => {
  // await console.log("logging");
  const { email, password } = req.body;
  // console.log(req.body);
  await console.log(email);
  // console.log(password);

  try {
    const rawUser = await Admin.findOne({ email })
      .select("+email")
      .select("+password")
      .select("+_id");
    // console.log(rawUser)
    if (!rawUser) {
      throw new Error("Incorret password or User name");
    }

    const passwordIsCorrect = await compareHash(password, rawUser.password);
    //  console.log(passwordIsCorrect)
    if (!passwordIsCorrect) {
      throw new Error("Incorret password or User name");
    } else if (passwordIsCorrect) {
      const user = rawUser.toObject();
      delete user.password;

      const token = createToken(user, "1h");

      // const tokenPld = token.split(".").splice(0, 2);
      // const tokenSig = token.split(".").splice(2);
      // console.log(token);
      // console.log(tokenPld);
      // console.log(tokenSig);
      user.token = token;
      // console.log(token);

      res.status(200).json({
        success: true,
        token: (await token).token,
        expiresIn: (await token).expires,
        user,
      });
      //   const opt={ httpOnly: true, secure: cookieIsSecure }
      // res.cookie("jwt", token);
      // res.cookie("cookie", "cookie")
      // res.cookie("jwt", tokenPld, { httpOnly: false, secure: false });
      // res.cookie("jwtSig", tokenSig, { httpOnly: false, secure: false });
    }
  } catch (err) {
    if (!err.message) {
      return res
        .status(500)
        .send({ message: "An unexpected error occurred during login" });
    } else {
      return res.status(404).json(err.message);
    }
  }
});
router.delete('/image/:_id',async (req, res)=>{
     const {_id}= req.params;
   console.log(_id)
  const image_temp=  await Image.findById(_id).then(async re=>{
    console.log(re)
      await fs.unlinkSync(re.url);
   return re

    }).catch(err=>err)
console.log(image_temp);
    await Image.findByIdAndDelete(_id).then( async ()=>{
      if(image_temp.album){
         await Album.updateOne({_id: image_temp.album},{
       $pull:{images:{$in:[image_temp._id]}}
     });
      let album =  await Album.findById(image_temp._id).then(alb=>alb).toObject().catch(err=>err);
      const images = Image.find({album:image_temp.album }).then(imgs=>imgs).catch(err=>err);
 album.images= images
     res.json(album)
      }
    }).catch(err=>err);
   

  
})
module.exports = router;