const express = require('express')
const app = express();
const cors = require('cors')
const routes = require ('./routes')
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use(routes)

const port = 3333
app.listen(port,()=>{
    console.log(`servidor rodando na porta ${port}`);
})