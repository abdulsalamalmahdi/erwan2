const Album = require('../../models/Album');
const controllers = {};
const fs = require('fs');





controllers.getAll = async (req, res) => {

  await Album.find({}).then(albs => res.send(albs)).catch(err => res.send(err))

};
controllers.newAlbum = (req, res) => {


  let {
    name,
    category
  } = req.body;
  // let {files}= req.files;
  console.log('create album')
  try {
    Album.findOne({
        name: name
      },
      (err, alb) => {
        if (err) {
          res.send(err);
        } else if (alb) {
          res.send("album name already taken!");
        } else {
          Album.create({
            name: name,
            category: category
          }).then(async (rs) => {
            return rs.save();
          }).then(async (dt) => {
            const newAlbum = await dt.toObject();
            
                fs.mkdirSync(__dirname + `/../../public/albums/${newAlbum.name}`, (err) => {
                  if (err) throw err;
                })

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


}

module.exports = controllers;