const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// This is the schema shared by all three roles from the spec:
// citizen, volunteer, admin. Role-specific details (like a volunteer's
// skills and availability) live in their own model later (Phase 12) and
// reference this User via an ObjectId - keeps this schema clean and shared.
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false, // never returned in queries unless explicitly requested
    },
    phone: {
      type: String,
      trim: true,
    },
    
    province: {
      type: String,
      trim: true,
    },
    district: {
      type: String,
      trim: true,
    },
    nearestTown: {
      type: String,
      trim: true,
    },
    // Preferences - persisted per-user so they follow the account across devices.
    language: {
      type: String,
      enum: ['en', 'si'],
      default: 'en',
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    },
    // User's set/GPS location - used for nearby shelters, reports, requests.
    location: {
      lat: { type: Number },
      lng: { type: Number },
      address: { type: String, trim: true },
    },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

// Hash the password automatically before saving, but only if it changed.
// Note: modern Mongoose (v7+) no longer uses a next() callback here -
// an async function that resolves (or throws) is enough.
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method used during login to check a plaintext password
// against the stored hash, without ever exposing the hash itself.
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);