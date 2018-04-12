const mongoose = require('mongoose');
const NodeGeocoder = require('node-geocoder');
const options = { provider: 'google', httpAdapter: 'https', apiKey: 'AIzaSyDOIfy-xL37YXE3HWpsBXh0BScBAtD7Vwo', formatter: null };
const geocoder = NodeGeocoder(options);

const houseSchema = new mongoose.Schema({
   
   //GENERAL INFO

         //Adress

    zipcode: {
        type: Number,
        // required: true
        // validate: "/^[00..52]{2}[0-9]{3}$/g" --> NO FUNCIONA!!!
    },
    municipality: {
        type:String,
        // required: true
    },    
    address: {
        type: String,
        // required: true
    },
    province: {
        type:String,
        // required: true
    },
    country: {
        type:String,
        default: "ES"
    },
    location: {
        type: { 
            type: String,
            default: "Point"
         },
        coordinates: [Number]
    },
    houseName: {
        type: String,
        // required: true
    },

    availability: {
        type: Boolean,
        // required: true
    },

        //Description

    ownerDescription: {
        type: String,
    },

        //Huose Type


    houseType: {
        type: String,
        enum: ['Nursing', 'Apartment', 'Cohousing'],
        // required: true
    },
    dependency: {
        type: Boolean,
        // required: true,
        // default: false
    },
    shortTermStay: {
        type:Boolean,
        // required: true,
        // default: false
    },

    publicPrivate: {
        type: String,
        // required: true,
        enum: ['Public', 'Private', 'Concerted']
    },

        //Finance
        
    houseMinPrice: {
        type:Number
    },
    houseMaxPrice: {
        type:Number
    },

    //CARE
        //General Care

    doctor: {
        type:Boolean,
        // default: false
    },
    nurse: {
        type:Boolean,
        // default: false
    },
    palliativeCare: {
        type:Boolean,
        // default: false
    },
    occupationalCare: {
        type:Boolean,
        // default: false
    },
    staffRatio: {
        type: String,
        // required: true,
        enum: ['1:2', '1:3', '1:4', '1:5', '1:6', '1:7', '1:8', '1:9', '1:10']
    },

        //Psycho Care

    dementia: {
        type:Boolean,
        // default: false
    },
    alzheimer: {
        type:Boolean,
        // default: false
    },
    depression: {
        type:Boolean,
        // default: false
    },

        //Phisical Care


    arthritis: {
        type:Boolean,
        // default: false
    },
    osteoArthritis: { 
        type:Boolean,
        // default: false
    },
    hipBreak: {
        type:Boolean,
        // default: false
    },
    lowBackPain: {
        type:Boolean,
        // default: false
    },
    parkinson: {
        type:Boolean,
        // default: false
    },

        //Organism Health Issues
        

    diabetes: {
        type:Boolean,
        // default: false
    },
    hypertension: { 
        type:Boolean,
        // default: false
    },
    breathingProblems: {
        type:Boolean,
        // default: false
    },
    cancer: {
        type:Boolean,
        // default: false
    },
    

    //FACILITIES

    
    reducedMobility: {
        type:Boolean,
        // default: false
    },

        //Rooms
    roomTypes: [{
        type: String,
        enum: ['Shared', 'Single', 'Couple']
    }],


    rooms: [ //This one does not allow to filter
        {
            type: {
                type: String,
                enum: ['Shared', 'Single', 'Couple']
            },
            minPrice: {
                type:Number,
            },
            maxPrice: {
                type:Number,
            },
            avSurface: {
                type:Number,
            },
            inventory:{
                type:Number,
            },
            availableNum: {
                type:Number,
            }
        }
    ],
    privateBathroom: {
        type:Boolean,
        // default: false
    },
    sharedBathroom: {
        type:Boolean,
        // default: false
    },
    telephone: {
        type:Boolean,
        // default: false
    },
    inRoomKitchen: {
        type:Boolean,
        // default: false
    },
    tv: {
        type:Boolean,
        // default: false
    },
    airConditioning: {
        type:Boolean,
        // default: false
    },
    roomInternet: {
        type:Boolean,
        // default: false
    },
    roomWifi: {
        type:Boolean,
        // default: false
    },            

        //Common Area

    library: {
        type:Boolean,
        // default: false
    },
    dinningRoom: {
        type:Boolean,
        // default: false
    },
    garden: {
        type:Boolean,
        // default: false
    },
    fitnessRoom: {
        type:Boolean,
        // default: false
    },
    computerCenter: {
        type:Boolean,
        // default: false
    },
    beautySaloon: {
        type:Boolean,
        // default: false
    },
    church: {
        type:Boolean,
        // default: false
    },
    swimmingPool: {
        type:Boolean,
        // default: false
    },
    familyPrivateDinningRooms: {
        type:Boolean,
        // default: false
    },
    wifi: {
        type:Boolean,
        // default: false
    },     

        //Nearby Key Facilities

   church: {
        type:Boolean,
        // default: false
    },
    restaurants: {
        type:Boolean,
        // default: false
    },
    supermarket: {
        type:Boolean,
        // default: false
    },

    //Access - cannot Filter!

    publicTransport: [
        {
            type: {
                type: String,
                enum: ['Bus', 'Metro']
            },
            lines: [
            {
                type: {
                    type: String
                }   
            }]
        }
    ],

        //SERVICES


    transport: {
        type:Boolean,
        // default: false
    },
    socialActivities: {
        type:Boolean,
        // default: false
    },
    sports: {
        type:Boolean,
        // default: false
    },
    trips: {
        type:Boolean,
        // default: false
    },
    houseKeeping: {
        type:Boolean,
        // default: false            
    },

    //RESOURCES

        //Media

    //         images:[{}],

    //         videos: [{}],

    //         virtualTour: [{}],


        //Contracts 
    //         residentAgreement: {},
    //         norms: {},
    //         timetable: {},
    //         latestSanitaryCheck: {}


});

houseSchema.pre('save', function (next) {
    const house = this;

    // DOC npm: https://www.npmjs.com/package/node-geocoder
    // DOC Google: https://developers.google.com/maps/documentation/geocoding/intro?hl=es-419

  geocoder.geocode({
        address: house.address,
        countryCode: house.country,
        postal_code: house.zipcode
  })
  .then(res => {
        house.location.coordinates[0] = res[0].longitude;
        house.location.coordinates[1] = res[0].latitude;
        next();
    })
  .catch(function(err) {
        console.log(err);
        next();
  });

});



houseSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('House', houseSchema);
