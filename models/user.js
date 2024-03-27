//导入 mongoose
const mongoose = require('mongoose');
//创建文档的结构对象
//设置集合中文档的属性以及属性值的类型
let UserSchema = new mongoose.Schema({
  username: {
    type:String,
    unique:true
  },
  password: String,
  //账户余额
  money: Number,
  //上次登录日期
  lastDate:String,
  //登陆时返回，当天的三颗幸运宝石
  threeNum:[],

  //投资时返回
  //6颗宝石售价，用于记录
  sell:[],
  //计算本次投资利润
  profit:Number,
  //投资的三颗宝石
  threeInversted:[],
  //上次投资日期
  lastInvested:String
})

//创建模型对象  对文档操作的封装对象
let UserModel = mongoose.model('users', UserSchema);

//暴露模型对象
module.exports = UserModel;