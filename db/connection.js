const mongoose = require('mongoose')
const dbUrl = 'mongodb+srv://mudassirseebiz:seebiz123@cluster0.qtjhedw.mongodb.net/tasks-project?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbUrl, {}).then(()=>{
    console.log('Db Connected');
}).catch((err)=>{
    console.log(err, 'Not Connected');
})