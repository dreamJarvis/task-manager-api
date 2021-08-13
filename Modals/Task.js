/** @format */

const mongoose = require("mongoose");

// defining the schema of the model
const TaskSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "must provide a name"],
		trim: true,
		maxlength: [20, "name cannot exceed 20 charecters"],
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

module.exports = mongoose.model("Task", TaskSchema);
