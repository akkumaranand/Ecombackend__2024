import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter Name"],
    },
    photo: {
      type: String,
      required: [true, "Please enter Photo"],
    },
    price: {
      type: Number,
      required: [true, "Please enter Price"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter Stock"],
    },
    
    category: {
      type: String,
      required: [true, "Please enter Category"],
      trim: true,
    },
    des1: {
      type: String,
      required: [true, "Please enter Des1"],
    },
    des2: {
      type: String,
      required: [true, "Please enter Des2"],
    }
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", schema);
