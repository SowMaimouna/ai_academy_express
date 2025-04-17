const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
