const Mock = require('mockjs')
// 格式： Mock.mock( url, post/get , 返回的数据)；
// 评论组件数据
Mock.mock('http://localhost:8888/api/private/v1/comment/getCommentsList', 'get', require('./json/comment'))
