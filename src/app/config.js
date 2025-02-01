const config = {
  url: process.env.NEXT_PUBLIC_BASE_URL,
  s3Key: process.env.NEXT_PUBLIC_S3_KEY,
  s3KeySecret: process.env.NEXT_PUBLIC_S3_KEY_SECRET,
  s3Region: process.env.NEXT_PUBLIC_S3_REGION,
  s3Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
  redirect_url: process.env.NEXT_PUBLIC_REDIRECT_URI,
  google_client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  facebook_id: process.env.NEXT_PUBLIC_FACEBOOKD_ID
};

module.exports = config;
