import { Express } from "express";
import bodyParser from "body-parser"
import { DB } from "../database/connection";

export const initAppExpress = async(app:Express): Promise<void> =>{
    try{
        const db = new DB();
        const result = await db.executeQuery("SELECT SYSDATE() as date");
        console.log();
        console.log(`Mysql Database Connection Established At ${result[0].date}`);
    }catch(error){
        console.error('failed to Connect to mysql database',error);
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));
}