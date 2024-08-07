
const express = require('express');
const AWS = require('aws-sdk');
const router = express.Router();

const S3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

router.get('/generate-presigned-url', (req, res) => {
  const { filename, filetype } = req.query;

  if (!filename || !filetype) {
    return res.status(400).json({ error: 'Filename and filetype are required' });
  }

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filename,
    Expires: 60, // URL expiration time in seconds
    ContentType: filetype,
  };

  S3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      console.error('Error generating presigned URL:', err);
      return res.status(500).json({ error: 'Error generating presigned URL' });
    }

    res.json({ url });
  });
});

module.exports = router;
