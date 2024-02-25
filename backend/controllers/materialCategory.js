const Category = require("../models/materialCategory");

// Create a new category
const createCategory = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.json({ status: 200, message: "Category name is required" });
    }
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all categories with pagination
const getAllCategories = async (req, res) => {
  try {
    // Extract page and limit from query parameters, and provide default values
    let { page, limit } = req.query;
    page = parseInt(page, 10) || 1; // Default to page 1 if not specified
    limit = parseInt(limit, 10) || 10; // Default to 10 items per page if not specified

    // Calculate the starting index
    const startIndex = (page - 1) * limit;

    // Find the categories with pagination
    const categories = await Category.find().skip(startIndex).limit(limit);

    // Total number of documents in the collection
    const total = await Category.countDocuments();

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    // Response object with pagination details and data
    res.json({
      totalItems: total,
      totalPages: totalPages,
      currentPage: page,
      categories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category by ID
const updateCategoryById = async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { ...req.body, modifiedOn: Date.now() },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a category by ID
const deleteCategoryById = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
