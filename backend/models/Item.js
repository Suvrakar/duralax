const mongoose = require("mongoose");
const { permission_enum } = require("../utils");
const itemSchema = new mongoose.Schema({
  item_code: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "itemCategory",
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

const Item = mongoose.model("Items", itemSchema);

module.exports = Item;
