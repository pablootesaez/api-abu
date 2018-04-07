const mongoose = require('mongoose');
const User = require('../models/users.model');
const ApiError = require('../models/api.error.model');

module.exports.list = (req, res, next) => {
    User.find()
    .then(users => res.json(users))
    .catch(error => next(error));
};

module.exports.get = (req, res, next) => {
    const id = req.params.id;
 
    User.findById(id)
    .then(user => {
      if (user) {
            res.json(user);
        } else {
            next(new ApiError(`user not found`, 404));
        }
    }).catch(error => next(error));
};

module.exports.create = (req, res, next) => {
    var user = new User(req.body);

    user.save()
    .then(()=> {
        res.status(201).json(user);
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
  
    User.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          next(new ApiError(`user not found`, 404));
        }
    }).catch(error => next(error));
};

module.exports.destroy = (req, res, next) => {
    const id = req.params.id;
  
    User.findByIdAndRemove(id)
      .then(user => {
        if (user) {
          res.status(204).json();
        } else {
          next(new ApiError(`Card not found`, 404));
        }
      }).catch(error => next(error));
  };


