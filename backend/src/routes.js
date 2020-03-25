const express = require('express');
const routes = express.Router();
const user = require('./controllers/usersController')
const profile = require('./controllers/profileController')

const incidents = require('./controllers/incidentsController')

routes.use('/ongs',user)
routes.use('/incidents', incidents)
routes.use('/profile',profile)
module.exports = routes;