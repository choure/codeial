const mongoose = require('mongoose');

//Imports the Multer middleware, which is used for handling multipart/form-data, primarily used for uploading files.
const multer = require('multer');
const path = require('path');
//represents the path where user avatars will be stored.
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    },
    name: {
        type: 'string',
        required: true
    },
    avatar: {
        type: String
    }
}, {
    timestamps: true
});


//Configures the multer disk storage. It specifies the destination directory for uploaded files and generates a unique filename for each file.
// the callback (cb) is called to signal that the operation (determining the destination directory or generating the filename) has completed
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        //callback (cb) with null (indicating no errors) and the destination path, specifying where the file should be stored.
        callback(null, path.join(__dirname, '..', AVATAR_PATH ));
    },
    filename: function (req, file, callback) {
        //It generates a unique filename by concatenating the fieldname of the file (file.fieldname) with the current timestamp (Date.now()), separated by a hyphen.
        //it calls the callback (cb) with null (indicating no errors) and the generated filename.
        callback(null, file.fieldname + '-' + Date.now());
    }
});

//static - Static methods in Mongoose are methods that are associated with the model itself rather than with individual documents.

//it will handle the uploading of a single file with the field name 'avatar' and store it using the configured disk storage.
userSchema.static.uploadedAvatar = multer({storage: storage}).single('avatar');
// It simply assigns the AVATAR_PATH constant, which represents the path where user avatars will be stored, to the avatarPath property of the schema.
// This property will be accessible when working with the User model (constructed from this schema) to easily retrieve the path where avatars are stored.
userSchema.static.avatarPath = AVATAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports = User;