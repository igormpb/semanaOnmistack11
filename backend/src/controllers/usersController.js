const express = require('express')
const routes = express.Router();
const crypto = require('crypto')
const db = require('../database/connection')

routes.post('/login', async (req, res) => {
    const {id}  = req.body
    const user = await db('ongs').where('id',id).select('name').first()
    if (!user) return res.status(404).send({ error: 'Not ONG ID' })

   return res.json( user )
})


routes.post('/register', async (req, res) => {
    const { name, email, whatsapp, city, uf } = req.body

    const id = crypto.randomBytes(6).toString('HEX')

    await db('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    }
    )
   
    return res.json({ id });
})

module.exports = routes;