// External Libraries
const mongoose = require('mongoose');
const moment = require('moment');
const axios = require('axios');
const myMongo = require('../utils/myMongo');

// Self Libraries
const Person = require('../models/person.model');

const Carrier = {
  mongoConnection: null,
  
  init: (params) => {
    console.log(params);
    this.mongoConnection = params.mongoConnectionURL;
  },
  getAll: async () => {
    try {
      await myMongo.connectToDatabase(this.mongoConnection);
      const person = await Person.find({}).select('_id name description').exec();
      return {
        person,
        status: 'success',
      };
    } catch (error) {
      throw new Error(error);
    }
  },
  getByID: async (personID) => {
    try {
      await myMongo.connectToDatabase(this.mongoConnection);
      const person = await Person.findById(personID).exec();
      return { person, status: 'success' };
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = Carrier;
