const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema with bio, profilePicture, and friends
const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  bio: { 
    type: String, 
    default: ''  // New field for bio
  },
  profilePicture: { 
    type: String, 
    default: ''  // New field for profile picture URL
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'  // Array of user references to create a list of friends
  }],
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model
module.exports = mongoose.model('User', UserSchema);
