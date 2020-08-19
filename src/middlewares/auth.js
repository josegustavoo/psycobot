const jwt = require('jsonwebtoken');

module.exports = (req, reply, next) => {
	
	const { authorization: auth } = req.headers;
	
	if(!auth)
		reply.code(401).send({ error: 'Token not informed' });
	
	const parts = auth.split(' ');
	
	if(!parts.length === 2)
		reply.code(401).send({ error: 'Token malformatted' });
	
	const [ scheme, token ] = parts;
	
	if(!/^Bearer$/i.test(scheme))
		reply.code(401).send({ error: 'Token malformatted' });
	
	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if(err){
			reply.code(401).send({ error: 'Token invalid' });
		} else {
			req.userId = decoded.data._id;
			next();
		}
	});
};
