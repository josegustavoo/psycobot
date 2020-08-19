const UserController = require('../controllers/UserController');
const SessionController = require('../controllers/SessionController');
const MessageController = require('../controllers/MessageController');

const auth = require('../middlewares/auth');

const routes = [
	{
		method: 'POST',
		url: '/api/login',
		handler: UserController.show,
	},
	{
		method: 'POST',
		url: '/api/signup',
		handler: UserController.store,
	},
	{
		method: 'POST',
		url: '/api/check',
		preValidation: auth,
		handler: SessionController.show,
	},
	{
		method: 'GET',
		url: '/api/messages/:page',
		preValidation: auth,
		handler: MessageController.index,
	},
	{
		method: 'POST',
		url: '/api/message',
		preValidation: auth,
		handler: MessageController.store,
	}
];

module.exports = routes;
