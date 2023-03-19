/*
* db Connettion 모듈, import 후 dbConect 함수를 사용해 SP 호출
*/

const mysql = require("mysql2");

let db;

try {
    db = mysql.createConnection({
        user : process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB
    });
} catch (err) {
    console.error(err);
}

// DB 커넥션 시 SP 제작 후 호출하는 함수
// query 부분의 경우 SP 이름을 넣으면 되고, DATA의 경우 배열 형식으로 매개변수를 넣어주면 된다.
const dbConnet = (query, data) => {
    let formattedQuery = query;
    let Returndata = {
      status: true,
      data: null,
    };

      formattedQuery = `CALL cngTech.${query}(${data
        .map((d) => `'${d}'`)
        .join(",")});`;
  
    console.log("SP : " + formattedQuery);
    return new Promise((resolve, reject) => {
      db.query(formattedQuery, function (err, result) {
        if (err) {
          reject({
            ...Returndata,
            status: false,
            data: err,
          });
        } else {
          resolve({
            ...Returndata,
            status: true,
            data: result[0],
          });
        }
      });
    });
  };
  

module.exports = dbConnet;
