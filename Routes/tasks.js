/** @format */

const express = require("express");
const router = express.Router();

// importing the controleers wrapped inside middlewares
const {
	getAllTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
} = require("../Controllers/tasks");

router.get("/", getAllTasks);

router.post("/", createTask);

router.get("/:id", getTask);

router.patch("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;
