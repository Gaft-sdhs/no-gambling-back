import "dotenv/config";
import { Express } from "express";
import bodyParser from "body-parser"
import session from "express-session";
import { DB } from "../database/connection";

export const initAppExpress = async(app:Express): Promise<void> =>{
    try{
        const db = new DB();
        const [result]:any = await db.executeQuery("SELECT SYSDATE() as date");
        // const result = await db.executeQuery("SELECT USER_ID FROM USER_TABLE WHERE USER_ID = 'DARELL'");
        console.log();
        console.log(`Mysql Database Connection Established At ${result.date}`);
    }catch(error){
        console.error('failed to Connect to mysql database',error);
    }
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(session({
        secret: process.env.SESSION_SECRET as string,
        resave: false,
        saveUninitialized: true,
      }));
}