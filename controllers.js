

const Album = require('./models/Album');
const Image= require('./models/Image');

module.exports={
 async getAlbum(req ,res){
          let {_id} = req.params;
        
        
          let album = await Album.findById( _id)
        //   .populate({
        //     path: 'images.image',
        //     model:'Image',
        //     select:['_id','album', 'image_name', 'url']
        //   })
          .then( async re=> {
            
           let albumObj = await re.toObject();
           return albumObj;
          }).catch(err=>err)
         
          const images = await Image.find({album:album._id}).then(async dt=>{
            
              return await dt
          }).catch(err=>err);
album.images =images;
// console.log(album)
res.json(album)
    },
    async postAlbum(req, res){
        let {album_id}= req.params;
        let album = Album.findById(album_id)
        .then(async (rs)=>{
          
           return await rs

        }).catch(err=>err)
        res.send(album)

    
    }
}
