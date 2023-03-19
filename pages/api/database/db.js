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

const dbConnet = (query, data) => {
    let formattedQuery = query;
    let Returndata = {
      status: true,
      data: null,
    };
    if (data) {
      formattedQuery = `CALL cngTech.${query}(${data
        .map((d) => `'${d}'`)
        .join(",")})`;
    }
  
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
