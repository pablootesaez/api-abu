const mongoose = require('mongoose');
const House = require('../models/houses.model');
const ApiError = require('../models/api.error.model');
const RESULTLIMIT = 50;

function criteriaValidator(criteria) {
    if (criteria.houseMinPrice) {
        const minPrice = criteria.houseMinPrice;
        criteria.houseMinPrice = { $gte: minPrice };
    };
    if (criteria.houseMaxPrice) {
        const maxPrice = criteria.houseMaxPrice;
        criteria.houseMaxPrice = { $lte: maxPrice };
    };
    if (criteria.name) {
        const name = criteria.name;
        criteria.name = { $regex: name, $options: 'ix' };
    };
    return criteria;
}

module.exports.list = (req, res, next) => {
    var criteria = req.query;

    criteria = criteriaValidator(criteria);

    House.find(criteria)
    .limit(RESULTLIMIT)  
    .then(houses => res.json(houses))
    .catch(error => next(error));
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

