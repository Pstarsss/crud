let express = require('express');
let app = new express();
let fs = require('fs');
let router = require('./router/router');


app.engine('html',require('express-art-template'));
const bodyParser = require('body-parser');
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据


app.use('/public',express.static('./public/'));
app.use(router);


app.listen(3000,()=>{
  console.log('serve is running');
});

