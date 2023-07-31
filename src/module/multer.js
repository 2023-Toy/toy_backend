const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();

//파일 존재 확인
try {
    fs.readdirSync('src/public/images');
} catch(err) {
    console.error('images 폴더가 없습니다. 폴더를 생성합니다.');
    fs.mkdirSync('src/public/images');
}

//file Filter
function fileFilter (req, file, done) {
    const type = file.mimetype.split('/');
    const fileType = type[1];
    if(fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg' || fileType == 'gif'){
            req.fileValidationError = null;
            done(null, true); //파일 허용
    }
    else{
            req.fileValidationError = "지정된 파일이 아닙니다.";
            done(null, false) //파일 거부
    }
}

//upload
const upload = multer({
    fileFilter: fileFilter,
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'src/public/images');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits: {
        // fileSize: 5 * 1024 * 1024,
        // fieldNameSize: 200,
        files: 10
    }
});

module.exports = {
    upload
}