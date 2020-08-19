const fs = require('fs');
const path = require('path');
const fastify = require('fastify')({
	logger: false
});

const cors = require('fastify-cors');
const helmet = require('fastify-helmet');
const compress = require('fastify-compress');
const rateLimit= require('fastify-rate-limit');
const LP = require('fastify-language-parser');
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

var myEnv = dotenv.config({
	path: path.resolve(__dirname, '..', '..', '.env')
})
dotenvExpand(myEnv);

fastify.register(cors);
fastify.register(helmet);
fastify.register(compress, {
	encodings: ['gzip', 'deflate']
});
fastify.register(rateLimit, {
	max: 100,
	timeWindow: 1000
});
fastify.register(LP, { order: ['query'] })
	.after(err => {
		if(err) console.log(err);
	});
  
module.exports = {
	getServer() {
		return fastify.server;
	},
	async startServer() {
		
		fastify.listen(process.env.PORT || 3000, '0.0.0.0', (err, address) => {
			if(err) throw err;
			fastify.log.info(`server listening on ${address}`);
		});
	},
	addRoutes(routes) {
		fastify.register(routes);
	},
	addGlobalVariable(name, variable) {
		fastify.addHook('preHandler', async (req, reply) => {
			req[name] = variable;
		});
	}
};
