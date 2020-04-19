// 导入所需模块
const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

// 创建服务
const app = express()

// 使用跨域
app.use(cors())

// 创建数据库连接
const connection = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: 'litie12345',
  database: 'image'
})
connection.connect()

// 设置请求操作
app.get('/api/:name',async(req, res) => {
  const tableName = req.params.name
  connection.query(`select * from ${tableName}`, (error, result) => {
    res.send(result)
  })
  
  // connection.query("insert into news(http) values('123456789999999')", (err,result) => {
  //   console.log(result)
  // })
  // res.end('haha')
})

app.listen(3000,() => {
  console.log('http://localhost:3000/')
})


