const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
    general: {
        name: {
            type: String,
            required: true
        },
        address:{
            streetAndNumber: {
                type: String,
                // required: true
            },
            zipcode: {
                type: Number,
                required: true,
                validate: "^[00..52]{2}[0-9]{3}$"
            },
            locality: {
                type:String,
                // required: true
            },
            province: {
                type:String,
                // required: true
            },
            autCom: {
                type:String,
                // required: true
            },
            location : {
                type: { 
                    type: String,
                    default: 'Point'
                },
                coordinates: [Number],
            }
        },
        ownerDescription: {
            type: String,
        },
        houseType: {
            mainType: {
                type: String,
                enum: ['Nursing', 'Apartment', 'Cohousing'],
                required: true
            },
            dependency: {
                type: Boolean,
                required: true,
                default: false
            },
            shortTermStay: {
                type:Boolean,
                required: true,
                default: false
            }
        },
        publicStatus: {
            type: String,
            required: true,
            enum: ['Public', 'Private', 'Concerted']
        }
    },

    finance: {
        minPrice: {
            type:Number,
            required: true
        },
        maxPrice: {
            type:Number,
            required: true
        }
    },
    care: {
        general: {
            doctor: {
                type:Boolean,
                default: false
            },
            nurse: {
                type:Boolean,
                default: false
            },
            palliatives: {
                type:Boolean,
                default: false
            },
            occupational: {
                type:Boolean,
                default: false
            },

        },
        psycho: {
            dementia: {
                type:Boolean,
                default: false
            },
            alzheimer: { //controlar en el front
                type:Boolean,
                default: false
            },
            depression: {
                type:Boolean,
                default: false
            },
            wellness: {
                type:Boolean,
                default: false
            }
        },

        physic: {
            arthritis: {
                type:Boolean,
                default: false
            },
            osteoArthritis: { 
                type:Boolean,
                default: false
            },
            hipBreak: {
                type:Boolean,
                default: false
            },
            reducedMobility: {
                type:Boolean,
                default: false
            },
            lowBackPain: {
                type:Boolean,
                default: false
            },
            parkinson: {
                type:Boolean,
                default: false
            }
        }
        
        organism: {
            diabetes: {
                type:Boolean,
                default: false
            },
            hypertension: { 
                type:Boolean,
                default: false
            },
            breathingProblems: {
                type:Boolean,
                default: false
            },
            cancer: {
                type:Boolean,
                default: false
            }
        }
    },

    facilities: {
        reducedMobility: {
            type:Boolean,
            default: false
        },
        room: {
            offeredRooms: [
                {
                    type: {
                        type: String,
                        required:true,
                        enum: ['Shared', 'Single', 'Couple']
                    },
                    minPrice: {
                        type:Number,
                        required:true
                    },
                    maxPrice: {
                        type:Number,
                        required:true
                    },
                    avSurface: {
                        type:Number,
                        required:true
                    },
                    inventory:{
                        type:Number,
                        required:true
                    },
                    availableNum: {
                        type:Number,
                        required:true
                    }
                }
            ],
            privateBathroom: {
                type:Boolean,
                default: false
            },
            sharedBathroom: {
                type:Boolean,
                default: false
            },
            telephone: {
                type:Boolean,
                default: false
            },
            inRoomKitchen: {
                type:Boolean,
                default: false
            },
            tv: {
                type:Boolean,
                default: false
            },
            airConditioning: {
                type:Boolean,
                default: false
            },
            internet: {
                type:Boolean,
                default: false
            },
            wifi: {
                type:Boolean,
                default: false
            }            
        },
        commonArea: {
            library: {
                type:Boolean,
                default: false
            },
            dinningRoom: {
                type:Boolean,
                default: false
            },
            garden: {
                type:Boolean,
                default: false

            },
            fitnessRoom: {
                type:Boolean,
                default: false
            },
            computerCenter: {
                type:Boolean,
                default: false
            },
            beautySaloon: {
                type:Boolean,
                default: false
            },
            church: {
                type:Boolean,
                default: false
            },
            swimmingPool: {
                type:Boolean,
                default: false
            },
            familyPrivateDinningRooms: {
                type:Boolean,
                default: false
            },
            wifi: {
                type:Boolean,
                default: false
            }     
        },
        nearby: {
            church: {
                type:Boolean,
                default: false
            },
            restaurants: {
                type:Boolean,
                default: false
            },
            supermarket: {
                type:Boolean,
                default: false
            }
        },
        publicTransport: {
            transportsArray: [
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
        }
    },
    services: {
        transport: {
            type:Boolean,
            default: false
        },
        socialActivities: {
            type:Boolean,
            default: false
        },
        sports: {
            type:Boolean,
            default: false
        },
        trips: {
            type:Boolean,
            default: false
        },
        houseKeeping: {
            type:Boolean,
            default: false            
        }
    },
    documents: {
        media: {
            images:[{}],

            videos: [{}],

            virtualTour: [{}]
        },
        contracts: {
            residentAgreement: {},
            norms: {},
            timetable: {},
            latestSanitaryCheck: {}
        }
    }

    // photo
});

userSchema.index({ "general.address.location": "2dsphere" });

module.exports = mongoose.model('House', houseSchema);
