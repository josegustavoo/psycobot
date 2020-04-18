const fastify = require('fastify')({ logger: true });
const cors = require('cors');
const helmet = require('fastify-helmet');

const routes = require('./routes');

fastify.use(cors());

fastify.register(helmet);
fastify.register(routes);

fastify.listen(process.env.port || process.env.PORT || 3000, (err, address) => {
	if(err) throw err;
	fastify.log.info(`server listening on ${address}`);
});
