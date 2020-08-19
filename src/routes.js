const encryption = require('./tools/encryption');
const routes = require('./routes/routes');

module.exports = async (fastify, options) => {
	
	routes.forEach((route, index) => {
		fastify.route(route);
	});
	
	fastify.get('/', async (req, reply) => {
		reply.type('application/json').code(200);
		
		return {};
		
	});
	
}
