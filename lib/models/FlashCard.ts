import mongoose from 'mongoose';

const FlashCardSchema = new mongoose.Schema({
  front: {
    type: String,
    required: true,
    trim: true,
  },
  back: {
    type: String,
    required: true,
    trim: true,
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // Spaced repetition fields
  interval: {
    type: Number,
    default: 0, // Days until next review
  },
  repetitions: {
    type: Number,
    default: 0, // Number of successful reviews
  },
  easeFactor: {
    type: Number,
    default: 2.5, // SuperMemo 2 algorithm ease factor
  },
  dueDate: {
    type: Date,
    default: Date.now,
  },
  lastReviewedAt: {
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