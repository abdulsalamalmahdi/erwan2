
const Image= require('../../models/Image.js');
const  Album= require('../../models/Album');
const controllers = {}

controllers.getAll= (req, res)=>{

    Image.find({})
    .then(dt=> res.send(dt))
    .catch(err=> res.send(err))
};

controllers.postImgs= async (req, res)=>{
   console.log('posting images')
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
};

controllers.postMainImg= async(req, res)=>{

  const { _id } = req.params;
    const { main, caption } = req.body;
 
    console.log(caption)
try{

const image= await Image.findByIdAndUpdate(_id, { main: !!main, caption:caption });
 
console.log(image)
    
  res.status(200).json(image)
}catch(err){
res.send(err)
}
 
}

controllers.getMainImg= async (req, res)=>{

  const { _id } = req.params;
  await Image.find({ album: _id, main: true }).then(async dt => {
    await console.log(dt)
    res.json(dt[0])
  })
}
module.exports= controllers;