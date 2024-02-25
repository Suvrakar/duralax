const mongoose = require("mongoose");
const { permission_enum } = require("../utils");
const roleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  modifiedByName: { type: String, required: true },
  permissions: { type: [String], enum: permission_enum },
  status: { type: Boolean, default: true },
  description: { type: String },
  modifiedOn: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
