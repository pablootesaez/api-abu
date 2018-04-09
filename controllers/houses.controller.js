const mongoose = require('mongoose');
const House = require('../models/houses.model');
const ApiError = require('../models/api.error.model');
const RESULTLIMIT = 50;

function FiltersArrayGenerator (keys, values, length) {
    var filterArray = [];
    for ( let i = 0; i < length; i++){
        filterArray.push(FilterJsonGenerator(keys[i], values[i]));
    };
    console.log(filterArray);
    return filterArray;
}

function FilterJsonGenerator(key, value) {
    queryString = ` {"${key}": "${value}" } `;
    console.log(queryString);

    queryObject = JSON.parse(queryString);
    console.log(queryObject);
    return queryObject;

};

module.exports.list = (req, res, next) => {
    const criteria = req.query;
    const criteriaKeyArr = Object.keys(criteria);
    const criteriaValArr = Object.values(criteria);
    const countFilters = criteriaValArr.length;

    console.log(`array length = ${countFilters}`)

    //Find all
    if(!countFilters) {
        House.find()
        .limit(RESULTLIMIT)  
        .then(houses => res.json(houses))
        .catch(error => next(error));
    } else {

        //Find by Zipcode
        if(countFilters<10) {
            if(criteria.zipcode) {
                myCriteria = { 'zipcode': criteria.zipcode, 'availablity':criteria.zipcode};
                House.find(criteria)
                .limit(RESULTLIMIT)  
                .then(houses => res.json(houses))
                .catch(error => next(error));
            }         
            //Find by Municipality
            if(criteria.municipality) {
                House.find({ 'municipality': criteria.municipality} )
                .limit(RESULTLIMIT)  
                .then(houses => res.json(houses))
                .catch(error => next(error));
            }            
        }else{
            House.find( { $and: 
                FiltersArrayGenerator(Object.keys(criteria), Object.values(criteria), Object.values(criteria).length)
            })
           .limit(RESULTLIMIT)  
           .then(houses => res.json(houses))
           .catch(error => next(error));
        }
    }
};

module.exports.get = (req, res, next) => {
    const id = req.params.id;
 
    House.findById(id)
    .then(house => {
      if (house) {
            res.json(house);
        } else {
            next(new ApiError(`house not found`, 404));
        }
    }).catch(error => next(error));
};

module.exports.create = (req, res, next) => {
    var newHouse = new House(req.body);

    newHouse.save()
    .then(()=> {
        res.status(201).json(newHouse);
    })
    .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          console.log(error);
          next(new ApiError(error.errors));
        } else {
          next(new ApiError(error.message, 500));
        }
    });
};

module.exports.update = (req, res, next) => {
    const id = req.params.id;
  
    House.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(house => {
        if (house) {
          res.status(200).json(house);
        } else {
          next(new ApiError(`house not found`, 404));
        }
    }).catch(error => next(error));
};

module.exports.destroy = (req, res, next) => {
    const id = req.params.id;
  
    House.findByIdAndRemove(id)
      .then(house => {
        if (house) {
          res.status(204).json();
        } else {
          next(new ApiError(`Card not found`, 404));
        }
    }).catch(error => next(error));
};

