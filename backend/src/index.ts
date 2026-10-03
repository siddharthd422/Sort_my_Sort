import express from "express";
import { createClient } from "redis";
import { router } from "./routes/auth";

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors({origin:'http://localhost:3000'}))

//@ts-ignore
const client = new createClient();

app.use("/auth", router);


app.get("/",(req,res) => {
    // console.log("API KEY:", process.env.RESEND_API_KEY);
    res.status(400).json({msg :"working fine"});
});

async function starter() {
    await client.on("error", (err : any) => console.log("Redis Client Error", err)).connect();
    app.listen(8080,()=>{
    console.log("server  is running successfully");
});
}

starter();
export { client };
