let fs = require('fs');
let bspath = './stuinfo.json';
let mysql = require('mysql');
let Math = require('math');
let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'px2',
  charset  : 'UTF8_GENERAL_CI'
});
function getRandom(){
  let t1 = (Math.random()*100000).toFixed(0);
  connection.query(`select id from student`,(err,results,fields)=>{
    if(err)throw err;
    let temp = JSON.parse(JSON.stringify(results));
    while(temp.find(item=>item.id === t1)){
      t1 = (Math.random()*100000).toFixed(0);
    }
  });
  return t1;
}
function add(index){
  return new Promise((resolve,reject)=>{
    if(index){  
      let temp = JSON.parse(JSON.stringify(index));
      connection.query(`insert into student values('${getRandom()}','${temp.name}','${temp.age}','${temp.hobbies}')`,(err,results,fields)=>{
        if(err)throw err;
        resolve(results);
      });
    }else{
      reject('fail to add');
    }
  })
}
function find(info){
  return new Promise((resolve,reject)=>{
    
        let aa = JSON.parse(JSON.stringify(info)).name;
        if(aa){
          connection.query(`select name from student`,(error,results,fields)=>{
            if(error){
              reject(error);
            }else{
              let temp = JSON.parse(JSON.stringify(results));
              console.log((aa));
              let t1 = temp.filter(item=>{
                return item.name.includes(aa);
              })
              resolve(t1);
            }
          });
        }else{
          reject('请求失败');
        }
        
    
  });
}
function dele(id){
  return new Promise((resolve,reject)=>{
    if(id){  
      connection.query(`delete from student where id = ${id}`,(err,results,fields)=>{
        if(err)throw err;
        resolve(results);
      });
    }else{
      reject('fail to dele');
    }
  });
}
function edit(id){
  return new Promise((resolve,reject)=>{
    if(id){ 
      connection.query(`select id,name,age,hobbies from student where id = ${id}`,(err,results,fields)=>{
        if(err)throw err;
        resolve(results);
      });
    }else{
      reject('fail to jump');
    }
  });
}
function update(id,info){
  return new Promise((resolve,reject)=>{
    if(info){ 
      let temp = JSON.parse(JSON.stringify(info));
      connection.query(`delete from student where id = ${id}`,(err,results,fields)=>{
        if(err)throw err;
        connection.query(`insert into student values('${id}','${temp.name}','${temp.age}','${temp.hobbies}')`,(err,results,fields)=>{
          if(err)throw err;
          resolve(results);
        });
      });
    }else{
      reject('fali to update');
    }
  });
}


module.exports = { find, add, dele, edit,update};