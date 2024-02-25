const express = require("express");
const router = express.Router();
const RoleController = require("../controllers/roleController");
const authenticate = require("../middleware/authenticate");

// Create a new role 
router.post("/create", authenticate, RoleController.createRole);

// Get all roles s
router.post("/list", authenticate, RoleController.getAllRoles);

// Get a specific role by ID
router.get("/:roleId", RoleController.getRoleById);

// Update a role by ID
router.put("/:roleId", RoleController.updateRoleById);

// Delete a role by ID
router.delete("/:roleId", RoleController.deleteRoleById);

module.exports = router;
