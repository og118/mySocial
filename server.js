process.on('uncaughtException', err => {
    console.log('UNHANDLED REJECTION! Shutting Down');
    console.log(err);
    process.exit(1);
})

const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({path: './config.env'})

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true //imp to fix deprecation warning
}).then(console.log('DB connection successful'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))
    // app.get('*', (req, res) => {
    //     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    // })
}

const PORT = process.env.PORT;

const server = app.listen(PORT || 9000, () =>{
    console.log('App running on port 9000');
}); 



process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! Shutting Down');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    })
});