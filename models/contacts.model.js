const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
   
    name: {
        type: String
    },
    email: {
        type:String,
        required: true
    },
    phone: {
        type: String
    },
    zipcode: {
        type: String
    }
});

module.exports = mongoose.model('Contact', contactSchema);
