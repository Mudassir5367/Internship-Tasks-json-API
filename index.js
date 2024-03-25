const express = require('express')
const app = express();
require('./db/connection')
const User = require('./model/userSchema')
const cors = require('cors');
// const customPostsRouter = require('./routes/auth');
const port = 5001;

app.use(express.json())
app.use(cors());
// app.use(customPostsRouter);
app.use(require('./routes/auth'))

app.get('/',(req, res)=>{
    res.send('Hello World!')
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})