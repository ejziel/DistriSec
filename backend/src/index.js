const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(
    express.urlencoded({
    extended: false,
    }),
);

app.use(cors());
app.use(routes);

app.listen(3333);