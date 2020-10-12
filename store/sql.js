let mysql = require('mysql');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'px2',
  charset  : 'UTF8_GENERAL_CI'
});


function getStudent(){
  return new Promise((resolve,reject)=>{
    connection.query('select id,name,age,hobbies from student',(err,results,fields)=>{
      if(err){
        reject(err);
      }else{
        console.log(results);
        resolve(results);
      }
    })
  });
}


module.exports={ getStudent};