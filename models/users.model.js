const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const HASH_FACTOR = 10;
const NodeGeocoder = require('node-geocoder');
const options = { provider: 'google', httpAdapter: 'https', apiKey: 'AIzaSyDOIfy-xL37YXE3HWpsBXh0BScBAtD7Vwo', formatter: null };
const geocoder = NodeGeocoder(options);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,    //Cambiar a email
        required:true,
        index: { unique: true }
    },

    password: {
        type: String,    //Ver si se puede password
        required:true
    },
    address: {
        type: String,    
        required:true
    },
    province: {
        type:String,
        // required: true
    },
    country: {
        type:String,
        default: "ES"
    },
    zipcode: {
        type: Number
    },
    location: {
        type: { 
            type: String,
            default: "Point"
         },
        coordinates: [Number]
    },
    isDependent: {
        type: Boolean,
        // required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

    // photo
});

userSchema.pre('save', function (next) {
    const user = this;

  //HASH-PASSWORD

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(HASH_FACTOR)
        .then(salt => {
            bcrypt.hash(user.password, salt)
                .then(hash => {
                    user.password = hash;
                    next();
                });
        })
        .catch(error => next(error));


});

userSchema.pre('save', function (next) {
    const user = this;

    //LOCALIZACIÓN
    // DOC npm: https://www.npmjs.com/package/node-geocoder
    // DOC Google: https://developers.google.com/maps/documentation/geocoding/intro?hl=es-419

  geocoder.geocode({
    address: user.address,
    countryCode: user.country,
    postal_code: user.zipcode
    })
    .then(res => {
        user.location.coordinates[0] = res[0].longitude;
        user.location.coordinates[1] = res[0].latitude;
        next();
    })
    .catch(function(err) {
        console.log(err);
        next();
    });
});

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
};

userSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('User', userSchema);