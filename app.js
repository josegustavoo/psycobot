const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

const routes = require('./routes');

app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());

app.use(routes);

const port = process.env.port || process.env.PORT || 3000;

app.listen(port, () => {
	console.log('listening server on port %d', port);
});
