const validator = require('../helpers/validate');

const saveMovie = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    director: 'required|string',
    genre: 'required|string',
    releaseYear: 'required|integer',
    rating: 'required|numeric',
    duration: 'required|integer',
    language: 'required|string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }

    next();
  });
};


const saveDirector = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    birthYear: 'required|integer',
    nationality: 'required|string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }

    next();
  });
};

module.exports = {
  saveMovie,
  saveDirector
};