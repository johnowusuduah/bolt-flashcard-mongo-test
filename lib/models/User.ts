import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // Stats for tracking user progress
  totalCards: {
    type: Number,
    default: 0,
  },
  cardsLearned: {
    type: Number,
    default: 0,
  },
  streakDays: {
    type: Number,
    default: 0,
  },
  lastStudyDate: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);