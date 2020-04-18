async function routes(fastify, options) {
	
	fastify.get('/', async (request, reply) => {
		reply.type('application/json').code(200)
		return { hello: 'world' }
	});
	
}
module.exports = routes;
