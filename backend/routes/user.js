const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// Create a new user
router.post("/create", UserController.createUser);

// Get all users
router.post("/list", UserController.getAllUsers);

// Get a specific user by ID
router.get("/:userId", UserController.getUserById);

// Update a user by ID
router.put("/:userId", UserController.updateUserById);

// Delete a user by ID
router.delete("/:userId", UserController.deleteUserById);

// Login user
router.post("/login", UserController.loginUser);

// Change password
router.post("/change-password", UserController.changePassword);

module.exports = router;
