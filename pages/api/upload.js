const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const app = express();

const s3 = new AWS.S3({
  accessKeyId: 'AKIAVERNYHMM32T3C6P7',
  secretAccessKey: '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',
  region: 'ap-northeast-2',
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'cngtech',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  console.log('File uploaded successfully:', req.file.location);
  res.json({ success: true, location: req.file.location });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
