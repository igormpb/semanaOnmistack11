const express = require('express');
const routes = express.Router();
const db = require('../database/connection')


routes.get('/all', async(req,res)=>{
    const {page = 1 } = req.query;
    
    const [count] = await db('incidents').count()
    
    const incidents =  await db('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select(['incidents.*','ongs.name','ongs.email','ongs.whatsapp','ongs.city','ongs.uf'])
    res.header('X-Total-Count', count['count(*)']);
    res.json({incidents})
})

routes.post('/create_incidents', async (req,res)=>{
    const {title, description, value} = req.body
    const ong_id  = req.headers.authorization;

    const [id] = await db('incidents').insert({
        title,
        description,
        value,
        ong_id
    })
    return res.send({id})
})

routes.delete('/all/:id',async(req,res)=>{
    const {id} = req.params;
    const ong_id = req.headers.authorization;

    const user = await db('incidents').where('id',id).select('ong_id').first();
    
    if(user.ong_id != ong_id) return res.status(401).send({err : 'error'})

    await db('incidents').delete().where('id',id)

    res.json('delete succefull')
})
module.exports = routes;