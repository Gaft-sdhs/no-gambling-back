import express from "express";
import dotenv from "dotenv/config";
import { initAppExpress } from "./server/initAppExpress";
const port = process.env.PORT || 8080;
const app = express();


app.listen(port,()=>{
    initAppExpress(app);
    console.log("============================================================");
    console.log("============================================================");
    console.log(`                  Server Running On Port ${port}            `);
    console.log("============================================================");
    console.log("============================================================");
})