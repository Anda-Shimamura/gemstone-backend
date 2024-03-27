const express = require('express')
const bodyParser = require('body-parser')

//mongodb相关
const db = require('./db/db.js')
//导入 mongoose
const mongoose = require('mongoose');
//导入 userModel
const userModel = require('./models/user.js');
const dayjs = require('dayjs');

const app = express()
const port = 8000
//导入API获取幸运数字
const getNumber = require('./RandomAPI.js')
//处理跨域
const cors = require('cors');
app.use(cors({
  allowedHeaders: ['Content-Type']
}));

//获取post参数
const jsonParser = bodyParser.json()
app.use(jsonParser)

// 响应登录请求
app.post('/login', (req, res) => {
    const {userInfo} = req.body
    console.log(userInfo);
     db(() => {
      try{
        userModel.findOne({
          username : userInfo.username,
          password : userInfo.password
        }).then(data=>{
              //登陆成功
              if (data){
                let today = dayjs().format('YYYY-MM-DD')
                if(data.lastDate!==today){
                  //本日新登录
                  let threeNum = getNumber()
                  data.lastDate = today
                  data.threeNum = threeNum

                  //保存更新
                  data.save().then(
                    (data)=>{
                      console.log('更新成功！',data)
                      res.send(data)
                      mongoose.disconnect()
                    }
                  )
                }else{
                  //同天登录
                  res.send(data)
                  mongoose.disconnect()
              }
            }else{
              res.send(false)
              mongoose.disconnect()
            }
        })
        
      }catch(err){
        console.error(err)
      }
    })
})
      
      
// //响应注册请求
app.post('/register', (req, res) => {
  const {userInfo} = req.body
  db(() => {
    userModel.findOne({
      username : userInfo.username
    }).then( data=>{
      if(data !== null){
        console.log('账号已被注册')
         res.send(false)
        mongoose.disconnect()
      }else{
        let threeNum = getNumber()
        userModel.create({
          username : userInfo.username,
          password : userInfo.password,
          money : 3000,
          lastDate : dayjs().format('YYYY-MM-DD'),
          threeNum 
        }).then( data=>{
          console.log(data)
           res.send(data)
          mongoose.disconnect();
        })
      }
    })
    
  })
})

// //响应投资请求
app.post('/invest', (req, res) => {
  
  const {showUsername,profit,sell,threeInversted,lastInvested} = req.body
  console.log(req.body);
  console.log(showUsername);
  db(() => {
    userModel.findOne({
      username : showUsername
    }).then( data=>{
      if(data === null){
         res.send(false)
        mongoose.disconnect()
      }else{
        data.money= data.money+profit
        data.profit = profit
        data.sell = sell 
        data.threeInversted = threeInversted
        data.lastInvested = lastInvested
        data.save().then((data)=>{
          console.log(data)
          res.send(data)
          mongoose.disconnect()
        })
      }
    })
    
  })
})

app.get('/top',(req, res)=>{
    db(()=>{
      userModel.find().sort({money:-1}).limit(10).exec().then((data)=>{
        res.send(data)
        mongoose.disconnect()
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 