const { v4: uuIdv4 } = require("uuid");
const { faker } = require("@faker-js/faker");
const mysql2 = require("mysql2/promise");
const dotenv = require("dotenv");
const { stat } = require("fs");
dotenv.config();

  const create_user_table = `
  create table user_table(
  user_id varchar2(30) not null,
  user_password varchar(100) not null,
  posts int(11),
  uuId varchar(45) primary key
  );
  `

  const create_posts_table = `
  create table posts_table(
    owner varchar(30) not null,
    content varchar(1000) not null,
    views bigint not null default 0,
    upload_date date,
    uuId varchar(100) primary key
  );
  `

  const conn = async () =>{
    const connection = await mysql2.createPool({
      host: process.env.DB_HOST2,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      connectionLimit: 5
    });
    return connection;
  }


//   const executeQuery = async(sql) =>{
//     try{
//       // console.log(sql)
//       const connection = conn();
//       const results = (await connection).query(sql);
//       return results;
//   }catch(error){
//       throw new Error(`Error at executeQuery(): ${error}`);
//   }
//   }

  const generateUserInertMents = () =>{
      const user_id = faker.internet.userName();
      const user_password = faker.internet.password();
      const posts = faker.number.int({min:0,max:100});
      const uuId = uuIdv4();
      // owners.push(user_id);
      let statement = `INSERT INTO user_table (user_id, user_password, posts, uuId) VALUES ('${user_id}', '${user_password}', ${posts}, '${uuId}');`
      // return {user_id,user_password,posts,uuId};
      // console.log(statement);
      // executeQuery(statement);
    //   statement.push(`INSERT INTO user_table (user_id, user_password, posts, uuId) VALUES ('${user_id}', '${user_password}', ${posts}, '${uuId}');`);
    return {sql:statement,data: {user_id,user_password,posts,uuId}};
}


const generatePost = (num) =>{

    const owner = faker.internet.userName();
    const content = faker.lorem.paragraph();
    const views = faker.number.int({min: 0,max:100000 });
    const upload_date = faker.date.past().toISOString().split('T')[0];
    const uuId = uuIdv4();
    const statement =`INSERT INTO posts_table (owner, content, views, upload_date, uuId) VALUES ('${owner}', '${content}', ${views}, '${upload_date}', '${uuId}');`;
    // executeQuery(statement);
  
    return {sql:statement,data: {owner,content,views,upload_date,uuId}};
}

// generateUserInertMents(100);
// generatePost(100);


const insrtRandomUserAndPost = async(loopNum)=>{
  for(let i =0; i<loopNum; i++){

    const connection = await mysql2.createPool({
      host: process.env.DB_HOST2,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      connectionLimit: 5
    });
    
    try {
      // await connection.beginTransaction();
      const Querydata =  generateUserInertMents();
      connection.query(Querydata.sql);
      const Querydata2 = generatePost();
      connection.query(Querydata2.sql);
      // owners.push(Querydata.data.user_id);


      // connection.end();
    } catch (error) {
     console.error(error); 
    }finally{
      connection.end()
    }
  }
}

insrtRandomUserAndPost(100);