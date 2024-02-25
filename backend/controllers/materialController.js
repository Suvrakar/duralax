const Item = require("../models/Material");

// Create a new item
const createItem = async (req, res) => {
  try {
    if (!req?.body.category)
      return res.status(500).json({ message: "Category is required" });

    const newItem = new Item(req.body);
    await newItem.save();
    res.json({
      status: 201,
      message: "Item created successfully",
      item: newItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all items with pagination
const getAllItems = async (req, res) => {
  try {
    // Extract page and limit from query parameters, providing default values if not specified
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    // Calculate the number of items to skip
    const skip = (page - 1) * limit;

    // Fetch a page of items and count the total number of items
    const [items, totalItems] = await Promise.all([
      Item.find().populate("category").skip(skip).limit(limit),
      Item.countDocuments(),
    ]);

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / limit);

    // Respond with paginated items and pagination details
    res.json({
      items,
      totalItems,
      totalPages,
      currentPage: page,
      itemsPerPage: limit,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an item by ID
const updateItemById = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { ...req.body, modifiedOn: Date.now() },
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an item by ID
const deleteItemById = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getItemById,
  updateItemById,
  deleteItemById,
};
