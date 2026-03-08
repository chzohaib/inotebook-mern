const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * User Schema
 * Each user has a name, unique email, hashed password, and account creation date
 */
const UserSchema = new Schema({
    name: {
        type: String,
        required: true, // Name is mandatory
        trim: true
    },
    email: {
        type: String,
        required: true, // Email is mandatory
        unique: true,   // Ensure no duplicate accounts
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true // Hashed password required
    },
    date: {
        type: Date,
        default: Date.now // Auto-set account creation date
    }
});

// Create the User model
const User = mongoose.model('user', UserSchema);

// Export the model for use in authentication modules
module.exports = User;