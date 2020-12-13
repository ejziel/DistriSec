const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(
    express.urlencoded({
    extended: false,
    }),
);

const url = "mongodb+srv://root:root@cluster0.7cdaq.mongodb.net/distrisec?retryWrites=true&w=majority";

mongoose.connect( url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(routes);

app.listen(3333);