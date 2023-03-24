const express = require('express')
const errorHandler = require("./middleware/errorHandler")
const connectDB = require('./database/dbconfig')
const app = express()
const dotenv = require("dotenv").config()
const port = process.env.port

//importing routes
const contact = require('./routes/contactRoutes')
const users = require('./routes/userRoutes')


app.use(express.json());
app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api/contact', contact);
app.use('/api/users', users);
app.use(errorHandler);


const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))

    } catch (error) {
        console.log(error);
    }
}

start();