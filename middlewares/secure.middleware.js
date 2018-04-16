const mongoose = require('mongoose');
const ApiError = require('../models/api.error.model');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(new ApiError('Unauthorized', 403));
  }
};

module.exports.isAuthenticatedAndAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    next();
  } else {
    next(new ApiError('Unauthorized', 403));
  }
};

module.exports.isAuthenticatedAndHimselfOrAdmin = (req, res, next) => {
  if (req.isAuthenticated() && (req.user.isAdmin || req.user.id === req.params.id)) {
    next();
  } else {
    next(new ApiError('Unauthorized', 403));
  }
};
