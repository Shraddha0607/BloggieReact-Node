const fs = require('fs');
const path = require('path');

const express = require('express');

const {
    getAll,
    get,
    remove,
    add,
    replace
} = require('../data/tag');
const {
    checkAuth
} = require('../util/auth');
const {
    isValidText
} = require('../util/validation');

const cdnDirPath = path.join(__dirname, 'cdn-images');

fs.mkdir(cdnDirPath, {
    recursive: true
}, (err) => {
    if (err) {
        return console.error('Error creating directory:', err);
    }
});

const router = express.Router();


router.post('/urlGenerate', async (req, res, next) => {
    try {

        const data = req.body;

        let fileName = getFileName(data.fileName);
        let filePath = path.join(cdnDirPath, fileName);



        saveFile(filePath, data.fileContent);

        const fullUrl = req.protocol + '://' + req.get('host') + '/' + fileName;

        res.json({
            url: fullUrl
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
});

// router.post('/upload', (req, res) => {
//     console.log("back hit ", req.files);
//     if (!req.files || !Object.keys(req.files)) {
//         return res.status(400).send({
//             message: 'No file uploaded'
//         });
//     }

//     let response = {};

//     for (let file in req.files) {

//         const uploadedFile = req.files[file];
//         let fileName = getFileName(uploadedFile.name);
//         let filePath = path.join(cdnDirPath, fileName);

//         uploadedFile.mv(filePath, (err) => {
//             if (err) {
//                 response[file] = {
//                     message: 'Upload failed',
//                     success: false
//                 };
//             } else {
//                 const fullUrl = req.protocol + '://' + req.get('host') + '/' + fileName;
//                 response[file] = {
//                     message: fullUrl,
//                     success: true
//                 };
//             }
//         });
//     }
//     res.send(response);
// });

const getFileName = (fileName) => {
    return (new Date().getTime() + '_' + fileName.length + "_" + fileName.toLowerCase()).replace(/\s/, '');
}

function saveFile(filePath, base64StrContent) {

    const buffer = Buffer.from(base64StrContent, 'base64');

    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('Image uploaded successfully.');
        }
    });
}


module.exports = router;