/// <reference types="multer" />
export declare class FileUploadService {
    get multerOptions(): {
        limits: {
            fileSize: number;
        };
        fileFilter: (req: any, file: any, cb: any) => void;
        storage: import("multer").StorageEngine;
    };
}
