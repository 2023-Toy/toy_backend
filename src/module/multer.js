const multer = require('multer');
const path = require('path');
const fs = require('fs');

//파일 존재 확인
try {
    fs.readdirSync('src/public/images/deal');
} catch(err) {
    console.error('images 폴더가 없습니다. 폴더를 생성합니다.');
    fs.mkdirSync('src/public/images/deal');
}
try {
    fs.readdirSync('src/public/images/community');
} catch(err) {
    console.error('images 폴더가 없습니다. 폴더를 생성합니다.');
    fs.mkdirSync('src/public/images/community');
}
try {
    fs.readdirSync('src/public/images/profile');
} catch(err) {
    console.error('images 폴더가 없습니다. 폴더를 생성합니다.');
    fs.mkdirSync('src/public/images/profile');
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
const deal_upload = multer({
    fileFilter: fileFilter,
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'src/public/images/deal');
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
const commu_upload = multer({
    fileFilter: fileFilter,
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'src/public/images/community');
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
const profile_upload = multer({
    fileFilter: fileFilter,
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'src/public/images/profile');
        },
        filename(req, file, done) {
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits: {
        // fileSize: 5 * 1024 * 1024,
        // fieldNameSize: 200,
        files: 1
    }
});

module.exports = {
    deal_upload, commu_upload, profile_upload
}