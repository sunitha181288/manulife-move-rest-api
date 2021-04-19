"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadOptions = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const environment_1 = require("../../environments/environment");
exports.uploadOptions = {
    limits: {
        fileSize: environment_1.environment.MAX_FILE_SIZE_MB * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.match(/\/(csv)$/)) {
            cb(null, true);
        }
        else {
            cb(new common_1.HttpException(`Unsupported file type ${path_1.extname(file.originalname)}`, common_1.HttpStatus.BAD_REQUEST), false);
        }
    },
    storage: multer_1.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = environment_1.environment.UPLOAD_LOCATION;
            if (!fs_1.existsSync(uploadPath)) {
                fs_1.mkdirSync(uploadPath);
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, `${uuid_1.v4()}${path_1.extname(file.originalname)}`);
        },
    }),
};
//# sourceMappingURL=upload.config.js.map