const express = require('express')
const routes = express.Router();
const db = require('../database/connection')

routes.get('/', async (req,res)=>{
    const ong_id = req.headers.authorization;

    const profile = await db('incidents').select('*').where('ong_id',ong_id);
    res.json(profile)
})

module.exports = routes;