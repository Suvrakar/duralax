const mongoose = require('mongoose');

// Define a Mongoose model without a schema
const Proposal = mongoose.model(
  "Proposal", // Collection name
  new mongoose.Schema({}, { strict: false }) // No schema, allow any fields
);

module.exports = Proposal;