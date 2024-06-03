import "dotenv/config";
import mysql2 from "mysql2/promise";

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

    public executeQuery = async(sql:string):Promise<mysql2.QueryResult>=>{
        try{
            const conn = await this.Connect();
            const [results] = await conn.query(sql);
            conn.end();
            return results;
        }catch(error){
            throw new Error(`Error at connection.ts executeQuery(): ${error}`);
        }
    };
}