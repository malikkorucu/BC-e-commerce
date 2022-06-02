"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const tslib_1 = require("tslib");
const multer_1 = tslib_1.__importDefault(require("multer"));
// aws.config.update({
//  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(undefined, 'src/public');
//   },
//   filename: (req, file, cb) => {
//     const extension = file.originalname.split('.')[file.originalname.split('.').length - 1]; // prettier-ignore
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const file_name = file.fieldname + '-' + uniqueSuffix + `.${extension}`;
//     req.body = { ...req.body, image: file_name };
//     cb(undefined, file.fieldname + '-' + uniqueSuffix + `.${extension}`);
//   },
// });
exports.upload = multer_1.default({
    //  storage: multerS3({
    //    s3: new aws.S3(),
    //    bucket: process.env.S3_BUCKET,
    //    contentType: multerS3.AUTO_CONTENT_TYPE,
    //    serverSideEncryption: 'AES256',
    //    acl: 'public-read',
    //    key: (request: any, file: Express.Multer.File, done: any) => {
    //      const originalName = file.originalname.split('.')[0]; // prettier-ignore
    //      const extension = file.originalname.split('.')[file.originalname.split('.').length - 1]; // prettier-ignore
    //
    //      const fileName =
    //        file.fieldname +
    //        originalName +
    //        '-' +
    //        request.user.email +
    //        `.${extension}`;
    //
    //      const others = request.body.other_images || [];
    //
    //      if (file.fieldname === 'image') {
    //        request.body = { ...request.body, image: fileName };
    //      } else {
    //        request.body = { ...request.body, other_images: [...others, fileName] };
    //      }
    //
    //      done(undefined, fileName);
    //    },
    //  }),
    fileFilter: (req, file, done) => {
        // if (false) throw new TypeError('mimetype not supported');
        const fileName = Date.now().toString() + '-' + file.originalname;
        done(undefined, fileName);
    },
});
//# sourceMappingURL=upload.js.map