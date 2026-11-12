const ImageKit = require("@imagekit/nodejs");

const myImageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

module.exports = myImageKit;