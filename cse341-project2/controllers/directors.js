const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const directors = await mongodb
      .getDb()
      .collection('directors')
      .find()
      .toArray();

    res.status(200).json(directors);
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while retrieving directors.'
    });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid director ID.'
      });
    }

    const director = await mongodb
      .getDb()
      .collection('directors')
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!director) {
      return res.status(404).json({
        message: 'Director not found.'
      });
    }

    res.status(200).json(director);
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while retrieving the director.'
    });
  }
};

const createDirector = async (req, res) => {
  try {
    const director = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthYear: req.body.birthYear,
      nationality: req.body.nationality
    };

    const response = await mongodb
      .getDb()
      .collection('directors')
      .insertOne(director);

    res.status(201).json({
      id: response.insertedId
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while creating the director.'
    });
  }
};

const updateDirector = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid director ID.'
      });
    }

    const director = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthYear: req.body.birthYear,
      nationality: req.body.nationality
    };

    const response = await mongodb
      .getDb()
      .collection('directors')
      .replaceOne(
        { _id: new ObjectId(req.params.id) },
        director
      );

    if (response.matchedCount === 0) {
      return res.status(404).json({
        message: 'Director not found.'
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while updating the director.'
    });
  }
};

const deleteDirector = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: 'Invalid director ID.'
      });
    }

    const response = await mongodb
      .getDb()
      .collection('directors')
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (response.deletedCount === 0) {
      return res.status(404).json({
        message: 'Director not found.'
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while deleting the director.'
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createDirector,
  updateDirector,
  deleteDirector
};