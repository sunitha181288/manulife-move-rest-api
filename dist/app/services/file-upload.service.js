"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const fs_1 = require("fs");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const common_2 = require("@nestjs/common");
let FileUploadService = class FileUploadService {
    get multerOptions() {
        console.log(process.env.MAX_FILE_SIZE);
        return {
            limits: {
                fileSize: (parseInt(process.env.MAX_FILE_SIZE) * 1024 * 1024),
            },
            fileFilter: (req, file, cb) => {
                if (file.mimetype.match(/\/(csv)$/)) {
                    cb(null, true);
                }
                else {
                    cb(new common_2.HttpException(`Unsupported file type ${path_1.extname(file.originalname)}`, common_2.HttpStatus.BAD_REQUEST), false);
                }
            },
            storage: multer_1.diskStorage({
                destination: (req, file, cb) => {
                    const uploadPath = process.env.UPLOAD_LOCATION;
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
    }
};
FileUploadService = __decorate([
    common_1.Injectable()
], FileUploadService);
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=file-upload.service.js.map