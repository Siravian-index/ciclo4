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
