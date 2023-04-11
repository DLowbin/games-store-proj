const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    platform: { type: String, required: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model('Showcase', schema);
