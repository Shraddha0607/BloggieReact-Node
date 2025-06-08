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

const router = express.Router();

router.get('/:id', async (req, res, next) => {
    console.log(req.token);
    try {
        const tags = await getAll();
        res.json({
            tags: tags
        });
    } catch (error) {
        next(error);
    }
});



router.post('/urlGenerate', async (req, res, next) => {
    try {

        const data = req.body;
        // console.log(data, " in bk");

        let fileName = getFileName(data.fileName);
        let filePath = path.join(cdnDirPath, fileName);

        fs.mkdir(cdnDirPath, {
            recursive: true
        }, (err) => {
            if (err) {
                return console.error('Error creating directory:', err);
            }
            console.log('Directory created successfully!');
        });

        saveFile(filePath, data.fileContent);

        const fullUrl = req.protocol + '://' + req.get('host') + '/' + fileName;
        console.log("ful url is ", fullUrl);

        res.json({
            url: fullUrl
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
});

const getFileName = (fileName) => {
    return (new Date().getTime() + '_' + fileName.length + "_" + fileName.toLowerCase()).replace(/\s/, '');
}

function saveFile(filePath, base64StrContent) {
    console.log("file path", filePath);   //  " and content ", base64StrContent

    const buffer = Buffer.from(base64StrContent, 'base64');

    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        } else {
            console.log('File saved successfully!');
        }
    });
}


module.exports = router;