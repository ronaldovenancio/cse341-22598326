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

module.exports = {
    getAll,
    getSingle
};