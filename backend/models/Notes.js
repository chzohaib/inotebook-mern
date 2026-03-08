const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Notes Schema
 * Each note is linked to a user and contains title, description, tag, and creation date
 */
const NotesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user', // Reference to user collection
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  tag: {
    type: String,
    default: "General",
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Export the model
module.exports = mongoose.model("notes", NotesSchema);