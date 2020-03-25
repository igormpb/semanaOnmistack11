const express = require('express')
const routes = express.Router();
const crypto = require('crypto')
const db = require('../database/connection')

routes.post('/login', async (req, res) => {
    const id = req.body
    const user = await db('ongs').select('*').where({id})

    if (!user) return res.status(404).send({ error: 'Not ONG ID' })

    res.send(user)
})

routes.get('/aa', async (req, res) => {
    const ongs = await db('ongs').select('*')
    return res.send({ ongs })
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