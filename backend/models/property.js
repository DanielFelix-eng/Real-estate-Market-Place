import mongoose from "mongoose";
const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  regularPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  bathrooms: {
    type: Number,
    required: true,
  },
  furnished: {
    type: Boolean,
    required: true,
  },
  parking: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  offer: {
    type: Boolean,
    required: true,
  },
  imageUrls: {
    type: [String],
    required: true,
  },
  userRef: {
    type: String,
    required: true,
  },
});

export const Property = mongoose.model('Property', propertySchema);
