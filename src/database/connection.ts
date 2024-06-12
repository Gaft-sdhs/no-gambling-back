import "dotenv/config";
import mysql2, { OkPacketParams } from "mysql2/promise";

export class DB{
    private Connect = async():Promise<mysql2.Connection>=>{
        try {
            const connection = await mysql2.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE
            });
              return connection;
            } catch (error) {
               throw new Error(`Error at connection.ts: ${error}`); 
            }
    };
    
    // returns a result with an array
    public executeQuery = async(sql:string):Promise<mysql2.QueryResult>=>{
        try{
            const conn = await this.Connect();
            const [results] = await conn.query(sql);
            conn.end();
            return results;
        }catch(error){
            throw new Error(`Error at executeQuery.ts executeQuery(): ${error}`);
        }
    };

    // returns result of the executed query 
    public executeQuery2 = async(sql:string):Promise<OkPacketParams>=>{
        try{
            const conn = await this.Connect();
            const [results]:any = await conn.query(sql);
            conn.end();
            return results;
        }catch(error){
            throw new Error(`Error at executeQuery2.ts executeQuery(): ${error}`);
        }
    }


    
}