const express = require('express')
const app = express();
require('../Backend/db/connection')
const port = 5000;

app.get('/',(req, res)=>{
    res.send('Hello World!')
})

app.listen(port, ()=>{
    console.log('listening on port 5000');
})