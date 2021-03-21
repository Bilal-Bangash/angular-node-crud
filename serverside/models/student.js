const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});
module.exports = mongoose.model("Student", studentSchema, "Students");
