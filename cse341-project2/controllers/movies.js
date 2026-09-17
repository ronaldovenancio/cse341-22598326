const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const movies = await mongodb
      .getDb()
      .collection('movies')
      .find()
      .toArray();

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while retrieving movies.'
    });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid movie ID.'
      });
    }

    const movie = await mongodb
      .getDb()
      .collection('movies')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!movie) {
      return res.status(404).json({
        message: 'Movie not found.'
      });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while retrieving the movie.'
    });
  }
};

const createMovie = async (req, res) => {
  try {
    const movie = {
      title: req.body.title,
      director: req.body.director,
      genre: req.body.genre,
      releaseYear: req.body.releaseYear,
      rating: req.body.rating,
      duration: req.body.duration,
      language: req.body.language
    };

    const response = await mongodb
      .getDb()
      .collection('movies')
      .insertOne(movie);

    res.status(201).json({
      id: response.insertedId
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while creating the movie.'
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid movie ID.'
      });
    }

    const movie = {
      title: req.body.title,
      director: req.body.director,
      genre: req.body.genre,
      releaseYear: req.body.releaseYear,
      rating: req.body.rating,
      duration: req.body.duration,
      language: req.body.language
    };

    const response = await mongodb
      .getDb()
      .collection('movies')
      .replaceOne(
        { _id: new ObjectId(req.params.id) },
        movie
      );

    if (response.matchedCount === 0) {
      return res.status(404).json({
        message: 'Movie not found.'
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while updating the movie.'
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid movie ID.'
      });
    }

    const response = await mongodb
      .getDb()
      .collection('movies')
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (response.deletedCount === 0) {
      return res.status(404).json({
        message: 'Movie not found.'
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while deleting the movie.'
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie
};