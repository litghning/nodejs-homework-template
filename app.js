const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config({ path: "./.env" });

const contactsRouter = require('./routes/api/contacts')

const app = express()

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

mongoose
  .connect(process.env.MONGO_URL || "mongodb://127.0.0.1:27017/test")
  .then((connection) => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
  
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message})
})

module.exports = app
