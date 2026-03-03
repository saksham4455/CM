import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  name: String,
  college: String,
  classSem: String,
  phone: String,
  email: String,

  events: [String],
  games: [String],

  totalPayment: Number,
  paymentStatus: {
    type: String,
    enum: ["paid", "unpaid"],
  },

  screenshotUrl: String,
  screenshotPublicId: String,

  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Registration", registrationSchema);