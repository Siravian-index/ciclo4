const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  generalObjectives: {
    type: String,
    require: true,
  },
  specificObjectives: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    required: true,
  },
  participants: {
    type: [String],
  },
  status: {
    type: String,
    required: true,
  },
  phase: {
    type: String,
    required: true,
  },
  budget: {
    type: String,
    required: true,
  },
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;
