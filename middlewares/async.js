/** @format */

/* wrapping the controller inside a middleware, 
that applies try/catch to the await method i.e. passed on to it*/
const asyncWrapper = (fn) => {
	// middleware
	return async (req, res, next) => {
		try {
			await fn(req, res, next); // <== controller
		} catch (error) {
			next(error);
		}
	};
};

module.exports = asyncWrapper;
