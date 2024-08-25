const mongoose = require("mongoose");

const ComponentSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  content: { type: Object, default: {} },
  style: { type: Object, default: {} },
});

const PageBuilderSchema = new mongoose.Schema({
  pageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LandingPage",
    required: true,
  },
  components: [ComponentSchema], // Composants du Page Builder
});

const PageBuilder = mongoose.model("PageBuilder", PageBuilderSchema);

module.exports = PageBuilder;
