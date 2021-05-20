const express= require('express');
const controllers = require('./controllers');
const router= express.Router();
const upload = require('../../lib/uploads.controller')
router.get('/', controllers.getAll);

router.post('/:album_id', upload.array('file[]'),controllers.postImgs );

router.put('/:_id', controllers.postMainImg);

router.get('/:_id', controllers.getMainImg);
module.exports= router;