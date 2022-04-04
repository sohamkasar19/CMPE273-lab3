const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const passport = require('passport');

const { uploadFile, getFileStream } = require('../utils/s3');

const app = express();


app.get('/:key',  (req, res) => {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
})


app.post('/', passport.authenticate('jwt', { session: false }) ,  upload.single('image'), async (req, res) => {
    const file = req.file;
    const result = await uploadFile(file);
    res.json({
        status: "ok",
        message: 'file uploaded successfully',
        image: {
            PROFILE_IMAGE: result.Key
        }
      });
})
module.exports = app;