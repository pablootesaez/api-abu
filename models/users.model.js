const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,    //Cambiar a email
        required:true
    },

    password: {
        type: String,    //Ver si se puede password
        required:true
    },

    isDependent: {
        type: Boolean,
        required: true
    }

    // photo
});

module.exports = mongoose.model('User', userSchema);