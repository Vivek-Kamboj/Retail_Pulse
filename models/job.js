const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = mongoose.Schema({
  jobid: {
    type: String,
    required: [true, "Title cannot be blank"],
    unique: true,
  },
  tasks: {
    type: Array,
  },
  status: {
    type: String,
    default: "onGoing",
  },
  error: [
    {
      store_id: { type: String },
      error: { type: String, default: "" },
    },
  ],
});

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
