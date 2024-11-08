import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
});

export const Note = mongoose.model('Note', noteSchema);
