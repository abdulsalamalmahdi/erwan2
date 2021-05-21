const express = require('express'),
  router = express.Router();
 
//  let history = require('connect-history-api-fallback');
const albumRoutes = require('./albums/album.route');
 const imageRoutes= require('./images/index');
// const textRoutes = require('./text.route');
//router.use(history({verbose: true}))
router.use('/albums', albumRoutes);
 router.use('/images', imageRoutes);
// router.unsubscribe('text', textRoutes);
  
//   router.post('/albums', (req, res)=>{
//       console.log(module.exports= router)
//     res.send('albums create')
//   })

module.exports= router;