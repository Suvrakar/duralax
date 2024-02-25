const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

// AWS credentials
const AWS_ACCESS_KEY_ID = "AKIA6GBMCOIRITAPPWO2";
const AWS_SECRET_ACCESS_KEY = "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";
const AWS_BUCKET_NAME = "duraluxdev";

// Initialize S3 client
const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

exports.uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image provided" });
  }

  // Generate a unique filename
  const filename = uuidv4() + "-" + req.file.originalname;
  // Parameters for S3 upload
  const params = {
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
    Body: req.file.buffer,
    // ACL: "public-read", // Set ACL permissions for the uploaded file
    ContentType: req.file.mimetype, // Set the Content-Type header
    ContentDisposition: "inline", // Set the Content-Disposition header
  };

  // Upload image to S3 bucket
  s3.upload(params, (err, data) => {
    if (err) {
      console.error("Error uploading image to S3:", err);
      return res.json({ status: 500, message: "Failed to upload image" });
    }

    // Construct the image URL
    const imageUrl = `https://${AWS_BUCKET_NAME}.s3.amazonaws.com/${filename}`;

    // Send back the image URL
    res.json({ imageUrl, status: 200, message: "success" });
  });
};
