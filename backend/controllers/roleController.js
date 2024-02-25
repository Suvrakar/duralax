const Role = require("../models/Role");

// Create a new role
const createRole = async (req, res) => {
  try {
    let data = req.body;
    const role = new Role(data);
    await role.save();
    res.status(201).json({ message: "Role created successfully", role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all roles with pagination
const getAllRoles = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page, default is 1
  const limit = parseInt(req.query.limit) || 10; // Number of items per page, default is 10

  try {
    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch roles with pagination
    const roles = await Role.find().skip(skip).limit(limit);

    // Fetch the total count of roles for pagination info
    const totalRoles = await Role.countDocuments();

    res.json({
      roles,
      currentPage: page,
      totalPages: Math.ceil(totalRoles / limit),
      totalItems: totalRoles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific role by ID
const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.roleId);
    res.json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a role by ID
const updateRoleById = async (req, res) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(
      req.params.roleId,
      { ...req.body, modifiedOn: Date.now() },
      { new: true }
    );
    res.json(updatedRole);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a role by ID
const deleteRoleById = async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.roleId);
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
};
