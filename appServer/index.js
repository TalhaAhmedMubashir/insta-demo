const cors = require('cors'),
    express = require('express'),
    mongoose = require('mongoose')
require('dotenv').config();

const userRoutes = require('./Routes/userRoutes')

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Connect to database
try {
    mongoose.connect(
        'mongodb://127.0.0.1:27017/InstaDemoApp',
        // 'mongodb+srv://talhaahmed:dbuPjbN3A3LrrTOP@cluster0.3w3v1ab.mongodb.net/test',
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
    )
} catch (error) {
    console.log("Database connectivity error : ", error)
}


process.on(
    'UnhandledRejection', error => {
        console.log("Uncaught error found : ", error)
    }
);
app.use('/appuser', userRoutes);
app.listen(process.env.PORT || 8080, () => console.log(`Server running on port: http://localhost:${process.env.PORT}`))