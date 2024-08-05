const mongoose = require('mongoose');

// Define the schema for form inputs
const InputSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['text', 'email', 'password', 'number', 'date'],
  },
  name: {
    type: String,
  },
  placeholder: {
    type: String,
  },
  required: {
    type: Boolean,
  },
  formOrder:{
    type: Number
  }
});

// Define the schema for forms
const FormSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  inputs: {
    type: [InputSchema],
    validate: [arrayLimit, 'Exceeds the limit of 20 inputs'],
  },
}, { timestamps: true });

function arrayLimit(val) {
  return val.length <= 20;
}

const Form = mongoose.model('Form', FormSchema);

module.exports = Form;
