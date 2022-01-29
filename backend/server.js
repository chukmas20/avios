const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload")
const product = require("./routes/productRoute")
const cloudinary = require("cloudinary");



app.use(express.json())
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended : true}))
app.use(fileupload())


dotenv.config({path:"backend/config/config.env"})

//connect Database

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
})

app.use("/api/v2", product)


const PORT = process.env.PORT || 5000
app.listen(5000, console.log(`server running on port ${PORT}`))