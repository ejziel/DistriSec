const express = require('express');
const routes = express.Router();

const UserController = require('./controllers/UserController');
const IncidentController = require('./controllers/IncidentController');
const SessionController = require('./controllers/SessionController');
const ProfileController = require('./controllers/ProfileController');

routes.post('/sessions', SessionController.create);

routes.get('/users', UserController.index);
routes.post('/users', UserController.createUser);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.createIncident);
routes.delete('/incidents/:id', IncidentController.delete);

routes.get('/profile', ProfileController.index);

module.exports = routes;