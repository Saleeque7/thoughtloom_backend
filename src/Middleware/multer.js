
    import multer from 'multer'
    import multerS3 from 'multer-s3'
    import config from "../config/config.js";
    import { s3 } from './s3bucket.js'
    import path from 'path';



    const s3Storage = multerS3({
    s3: s3,
    bucket: config.S3_BUCKET_NAME,
    metadata: function (req, file, cb) {
        const folder = "public";  
        const fileName = Date.now() + "_" + file.originalname; 
        cb(null, `${folder}/${fileName}`); 
    },
    key: function (req, file, cb) {
        const fileName = Date.now() + "_" + file.originalname;
        cb(null, `public/${fileName}`);  
    }
    });



    function sanitizeFile(file, cb) {

        const fileExts = [".png", ".jpg", ".jpeg", ".gif" , ".webp"];
        const isAllowedExt = fileExts.includes(
            path.extname(file.originalname.toLowerCase())
        );
        const isAllowedMimeType = file.mimetype.startsWith("image/");
        if (isAllowedExt && isAllowedMimeType) {
            return cb(null, true);
        } else {
            cb("Error: File type not allowed!");
        }
    }

    export const uploadImage = multer({
        storage: s3Storage,
        fileFilter: (req, file, callback) => {
            sanitizeFile(file, callback);
        },
        limits: {
            fileSize: 1024 * 1024 * 2
        }
    })











