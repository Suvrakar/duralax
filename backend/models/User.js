const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: Boolean, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bgColor: { type: String },
  modifiedByName: { type: String },
  mobile: { type: Number },
  commission: { type: Number, default: 1 },
  roleName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  }, // Reference to the Role model
  createdAt: { type: Date, default: Date.now() },
  modifiedOn: { type: Date, default: Date.now() },
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("Users", userSchema);

module.exports = User;
