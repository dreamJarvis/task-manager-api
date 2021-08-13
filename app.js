/** @format */

const express = require("express");
const app = express();

const tasks = require("./Routes/tasks");
const connectDB = require("./DB/connect");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// custom middlewares
const illegalRouteMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");

// express in-built middlewares
app.use(express.static("./public/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//** routes **//
app.use("/api/v1/tasks", tasks);

//** error handling middlewares **//
app.use(illegalRouteMiddleware);
app.use(errorHandlerMiddleware);

// ** setting up the databases and the server **//
const start = async () => {
	try {
		// connecting to the db
		await connectDB(process.env.MONGO_URI);
		// connecting to the server
		app.listen(PORT, () => {
			console.log(`server is running on port ${PORT}...`);
		});
	} catch (err) {
		console.log(err);
	}
};

//** starting the server **//
start();
