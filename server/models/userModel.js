const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = {
  username: { type: String, required: [true, 'username不能为空'] },
  password: { type: String, required: [true, 'password不能为空'] },
  email: { type: String, default: '' },
  avatar: { type: String, default: 'http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg' }, // 头像
  roles: { type: String, default: 'normal' }, // 用户类型，[管理员admin，普通用户normal]
  type: { type: String, enum: ['site', 'third'], default: 'site' }, // site用户是网站注册用户, third是第三方登录过来的用户
  created: { type: Date, default: Date.now() }, // 创建数据的时间
  updated: { type: Date, default: Date.now() }, // 创建数据的时间
  status: { type: Number, enum: [0, 1], default: 1 }, // 0代表被删除，1代表在线
};

const userCollectionSchema = {
  userid: { type: String, required: [true, 'userid不能为空'] },
  collections: { type: Array },
};

// Model
const User = mongoose.model('user', userSchema, 'users');
const UserCollections = mongoose.model('usercollection', userCollectionSchema, 'usercollection');

module.exports = { User, UserCollections };
