const S3 = require('aws-sdk/clients/s3')
const fs = require('fs');
const constants = require("./config");

const bucketName = constants.AWS_BUCKET_NAME;
const region = constants.AWS_BUCKET_REGION;
const accessKeyId = constants.AWS_ACCESS_KEY;
const secretAccessKey = constants.AWS_SECRET_KEY

const s3 = new S3 ({
    region,
    accessKeyId,
    secretAccessKey
})

function uploadFile(file) {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename
    }
    return s3.upload(uploadParams).promise();
}

exports.uploadFile = uploadFile;

function uploadFileNew(fileStream, filename) {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: filename
    }
    return s3.upload(uploadParams).promise();
}

exports.uploadFileNew = uploadFileNew;


function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName
    }
    return s3.getObject(downloadParams).createReadStream();
}

exports.getFileStream = getFileStream;