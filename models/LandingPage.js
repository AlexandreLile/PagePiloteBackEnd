const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  metaTitle: { type: String, required: false },
  metaDescription: { type: String, required: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Page", PageSchema);
