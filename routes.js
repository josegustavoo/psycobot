const express = require('express');

const routes = express.Router();

routes.get('/v1/api', (req, res) => {
	res.json({
		data: 'Hello, World!',
	});
});

module.exports = routes;
