const express = require("express");
const categoryController = require("../controllers/globalController");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

// Route to create a new category
router.post("/create", authenticate, categoryController.createCategory);

// Route to get all categories
router.post("/", authenticate, categoryController.getAllCategories);

// Route to get a specific category by ID
router.get("/:id", authenticate, categoryController.getCategoryById);

// Route to update a category by ID
router.put("/:id", authenticate, categoryController.updateCategoryById);

// Route to delete a category by ID
router.delete("/:id", authenticate, categoryController.deleteCategoryById);

module.exports = router;
