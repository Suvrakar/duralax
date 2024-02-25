const User = require("../models/User");
const jwt = require("jsonwebtoken");
let JWT_SECRET = "duralux-secret-key";
// Create a new user
const createUser = async (req, res) => {
  try {
    let bodyData = req.body;
    const user = new User(bodyData);
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all usre with pagination
const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page, default is 1
  const limit = parseInt(req.query.limit) || 10; // Number of items per page, default is 10

  try {
    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch roles with pagination
    const users = await User.find()
      .populate("roleName")
      .skip(skip)
      .limit(limit);

    // Fetch the total count of roles for pagination info
    const totalRoles = await User.countDocuments();

    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(totalRoles / limit),
      totalItems: totalRoles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("roleName");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by ID
const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { ...req.body, modifiedOn: Date.now() },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate("roleName");

    if (!user) {
      return res.status(500).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(500).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET || JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({
      status: 200,
      token,
      data: user,
      message: "User Loged in success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Change a user's password
const changePassword = async (req, res) => {
  try {
    // Extract user ID, current password, and new password from request body
    const { userId, newPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    // Check if the user exists
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }

    // // Verify the current password
    // const isPasswordValid = await user.comparePassword(currentPassword);
    // if (!isPasswordValid) {
    //   return res.status(500).json({ message: "Current password is incorrect" });
    // }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    // Return success message
    res.json({ status: 200, message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
  changePassword,
};
