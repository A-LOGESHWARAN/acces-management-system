const mongoose = require("mongoose");

const accessRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  resource: String,
  reason: String,
  status: { type: String, default: "PENDING" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AccessRequest", accessRequestSchema);
