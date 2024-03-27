const express = require('express')
const app = express();
require('./db/connection')
const cors = require('cors');
const port = 5001;

app.use(express.json())
app.use(cors());
// app.use(customPostsRouter);
app.use(require('./routes/routes'))

app.get('/',(req, res)=>{
    res.send('Hello World!')
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})