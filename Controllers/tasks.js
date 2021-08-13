/** @format */
const Task = require("../Modals/Task");
const asyncWrapper = require("../middlewares/async");
const { createCustomError } = require("../errors/custom-error");

/*
	asyncWrapper : wraps the controller in a middleware that applies try/catch to the controllers
	i.e. if await is resolved than the req is concluded and response is send back
	else error is passed on to the next middleware (errorHandleMiddleware)
*/
const getAllTasks = asyncWrapper(async (req, res, next) => {
	const tasks = await Task.find({});
	return res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res, next) => {
	const task = await Task.create(req.body);
	return res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const task = await Task.findOne({ _id: taskID });
	if (!task) {
		return next(createCustomError(`No task with id ${taskID}`, 404));
	}
	res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const task = await Task.findOneAndDelete({ _id: taskID });
	if (!task) {
		return next(createCustomError(`No task with id ${taskID}`, 404));
	}
	res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const task = await Task.findByIdAndUpdate(taskID, req.body, {
		new: true,
		runValidators: true,
	});
	if (!task) {
		return next(createCustomError(`No task with id ${taskID}`, 404));
	}
	res.status(200).json({ task });
});

module.exports = {
	getAllTasks,
	createTask,
	getTask,
	updateTask,
	deleteTask,
};
