const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  mobile: { type: Number },
  companyName: { type: String },
  billing_address: { type: String },
  remark: { type: String },
  address: { type: Array, default: [] },
  modifiedOn: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() },
});

const Customers = mongoose.model("Customers", materialSchema);

module.exports = Customers;
