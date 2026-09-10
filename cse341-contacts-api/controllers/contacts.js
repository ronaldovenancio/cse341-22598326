const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

const getAll = async (req, res) => {
  try {
    const contacts = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .find()
      .toArray();

    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while retrieving contacts.'
    });
  }
};

const getSingle = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: 'Invalid contact ID.'
      });
    }

    const contact = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .findOne({
        _id: new ObjectId(contactId)
      });

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found.'
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while retrieving the contact.'
    });
  }
};

const createContact = async (req, res) => {
  try {
    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    if (
      !contact.firstName ||
      !contact.lastName ||
      !contact.email ||
      !contact.favoriteColor ||
      !contact.birthday
    ) {
      return res.status(400).json({
        message: 'All contact fields are required.'
      });
    }

    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .insertOne(contact);

    res.status(201).json({
      id: result.insertedId
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while creating the contact.'
    });
  }
};

const updateContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: 'Invalid contact ID.'
      });
    }

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    if (
      !contact.firstName ||
      !contact.lastName ||
      !contact.email ||
      !contact.favoriteColor ||
      !contact.birthday
    ) {
      return res.status(400).json({
        message: 'All contact fields are required.'
      });
    }

    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .replaceOne(
        { _id: new ObjectId(contactId) },
        contact
      );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        message: 'Contact not found.'
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while updating the contact.'
    });
  }
};

const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.id;

    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({
        message: 'Invalid contact ID.'
      });
    }

    const result = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .deleteOne({
        _id: new ObjectId(contactId)
      });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: 'Contact not found.'
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'An error occurred while deleting the contact.'
    });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};