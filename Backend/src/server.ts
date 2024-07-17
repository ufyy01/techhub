import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config"

//routes
import hubRoute from "./Routes/hub"

export const app = express();

//mongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/tech-hub')
.then(() => {
    app.listen(process.env.PORT, () => {console.log('Listening on port', process.env.PORT)})
})
.catch((error) => console.log(error))

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1/hub", hubRoute)





