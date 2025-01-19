const config = {
  url: process.env.NEXT_PUBLIC_BASE_URL,
  s3Key: process.env.NEXT_PUBLIC_S3_KEY,
  s3KeySecret: process.env.NEXT_PUBLIC_S3_KEY_SECRET,
  s3Region: process.env.NEXT_PUBLIC_S3_REGION,
  s3Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
};

module.exports = config;
