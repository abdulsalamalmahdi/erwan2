const express = require('express'),
  router = express.Router();

const albumRoutes = require('./albums/album.route');
// const imageRoutes= require('./images.route');
// const textRoutes = require('./text.route');

router.use('/albums', albumRoutes);
// router.use('image', imageRoutes);
// router.unsubscribe('text', textRoutes);
  
//   router.post('/albums', (req, res)=>{
//       console.log(module.exports= router)
//     res.send('albums create')
//   })

module.exports= router;