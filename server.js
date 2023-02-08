const mongoose =  require('mongoose');
const dotenv = require('dotenv');
const app = require('./index.js');


dotenv.config({path: './config.env'});

const DB = process.env.MONGO.replace(
    '<PASSWORD>',
    process.env.PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useCreateIndex:true,
    // useFindAndModify: false
}).then(()=> console.log('Database connected successfully...'))
.catch((err) => console.log(err));


const port = process.env.PORT;
app.listen(port || 8000, ()=>{
console.log(`server started at port ${port}...`);
});
