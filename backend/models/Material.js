const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema({
  item_code: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "materialCategory",
    required: true,
  }, // Reference to the Role model
  status: { type: Boolean, default: true },
  description: { type: String },
  shop_hr: { type: Number },
  shop_mm: { type: Number },
  install_hr: { type: Number },
  install_mm: { type: Number },
  fixed_price: { type: Number },
  glass_sqft: { type: Number },
  alumunium_pond: { type: Number },
  imgUrl: { type: String },
  modifiedOn: { type: Date, default: Date.now() },
  createdAt: { type: Date, default: Date.now() },
});

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
