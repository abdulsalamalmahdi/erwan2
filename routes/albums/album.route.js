const express= require('express');
const controllers = require('./controllers');
const router= express.Router();

// const Album = require('../models/Album')
router.get('/', controllers.getAll)
router.post('/', controllers.newAlbum)

module.exports= router;
// router.post('/albums', async (req, res) => {
//     let { name,category } = req.body;
//     // let {files}= req.files;
//   console.log('create album')
//     try {
//       Album.findOne({ name: name },
//         (err, alb) => {
//           if (err) {
//             res.send(err);
//           } else if (alb) {
//             res.send("album name already taken!");
//           } else {
//             Album.create({ name: name, category: category }).then(async (rs) => {
//               return rs.save();
//             }).then(async (dt) => {
//               const newAlbum = await dt.toObject();
//               res.send(newAlbum);
//             })
//           }
//         }
  
//       );
//     } catch (err) {
//       if (!err.message) {
//         return res.status(500).send({
//           message: "An unexpected error occured during add"
//         })
//       } else {
//         return res.status(400).json(err.message)
//       }
  
//     }
  
//   });