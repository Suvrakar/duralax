const express = require("express");
const itemController = require("../controllers/itemController");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// Route to create a new item
router.post("/create", authenticate, itemController.createItem);

// Route to get all items
router.post("/", authenticate, itemController.getAllItems);

// Route to get a specific item by ID
router.get("/:id", authenticate, itemController.getItemById);

// Route to update an item by ID
router.put("/:id", authenticate, itemController.updateItemById);

// Route to delete an item by ID
router.delete("/:id", authenticate, itemController.deleteItemById);

module.exports = router;
