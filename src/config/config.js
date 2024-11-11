import dotenv from 'dotenv'
dotenv.config()

export default {
    PORT:process.env.PORT,
    MONGODB_URL:process.env.MONGODB_URL,
    BASE_URL:process.env.BASE_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    NODE_ENV:process.env.NODE_ENV,
    S3_BUCKET_ACCESS_KEY:process.env.S3_BUCKET_ACCESS_KEY,
    S3_BUCKET_SECRET_ACCESS_KEY:process.env.S3_BUCKET_SECRET_ACCESS_KEY,
    S3_BUCKET_REGION:process.env.S3_BUCKET_REGION,
    S3_BUCKET_NAME:process.env.S3_BUCKET_NAME,
}