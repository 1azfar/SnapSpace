const myImageKit = require("../config/imagekit");
const { toFile } = require("@imagekit/nodejs");

async function uploadImage(fileBuffer, fileName) {
    const response = await myImageKit.files.upload({
        file: await toFile(fileBuffer, fileName),
        fileName: fileName
    });
     console.log("ImageKit response:", response);
    console.log(response.url);

    return response;
}

module.exports = { uploadImage };