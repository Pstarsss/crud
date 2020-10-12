let express = require('express');
let router = express.Router();
let exp = require('../store/index.js');
let fs = require('fs');
const { json } = require('body-parser');
let mysql      = require('mysql');
let sql = require('../store/sql.js');


let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'px2',
  charset  : 'UTF8_GENERAL_CI'
});

router.all('/getsss', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-type');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  res.header('Access-Control-Max-Age',1728000);//预请求缓存20天
  sql.getStudent().then(re=>{
    res.send(re);
    next();  
  })
  
});

router.get('/',(req,res)=>{
 res.send('welcom to my page');
});

router.get('/index',(req,res)=>{
  connection.query('select id,name,age,hobbies from student',(error,results,fields)=>{
    if(error)throw error;
    let tempresults = JSON.stringify(results);
    res.render('index.html',{
      students :JSON.parse(tempresults)
    });
  });
});

router.get('/post',(req,res)=>{
    res.render('post.html');
});
router.post('/add',(req,res)=>{
  let index = req.body;
  exp.add(index).then((suc)=>{
    console.log(suc);
  });
  res.redirect('/index');
});
router.get('/dele/:id',(req,res)=>{
  exp.dele(req.params.id).then(rs=>{
    res.redirect('/index');
  })
});

router.get('/edit/:id',(req,res)=>{
  exp.edit(req.params.id).then(re=>{
    res.render('newpost.html',{
      re:re[0]
    });
  })
});

router.post('/update/:id',(req,res)=>{
  exp.update(req.params.id,req.body).then(re=>{
    res.redirect('/index');
  })
});

router.post('/tips',(req,res)=>{
  exp.find(req.body).then(rr=>{
      res.send(rr);
});


});


module.exports = router;
