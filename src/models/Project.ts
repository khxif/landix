import mongoose from 'mongoose';

const fragmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
});

const messagesSchema = new mongoose.Schema({
  content: { type: String, required: true },
  role: { type: String, enum: ['user', 'assistant'], required: true },
  fragment: fragmentSchema,
});

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [messagesSchema],
});

export const Project = mongoose?.models?.Project || mongoose.model('Project', projectSchema);

