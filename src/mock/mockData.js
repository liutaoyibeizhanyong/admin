var mockData = {
  code: 200,
  msg: 'ok',
  data: [
    "http://color-test.oss-cn-qingdao.aliyuncs.com/dyc/img/2019/02/02/1549112806223866151639.jpeg?x-oss-process=style/yasuo",
    "http://color-test.oss-cn-qingdao.aliyuncs.com/dyc/img/2019/02/02/15491128087691462190017.jpeg?x-oss-process=style/yasuo",
     "http://color-test.oss-cn-qingdao.aliyuncs.com/dyc/img/2019/02/02/1549112799839261454077.jpeg?x-oss-process=style/yasuo",
    "http://color-test.oss-cn-qingdao.aliyuncs.com/dyc/img/2019/02/02/15491128027001242326540.jpeg?x-oss-process=style/yasuo",
    "http://color-test.oss-cn-qingdao.aliyuncs.com/dyc/img/2019/02/02/1549112804446367923451.jpeg?x-oss-process=style/yasuo",
    "http://color-test.oss-cn-qingdao.aliyuncs.com/dyc/img/2019/02/02/1549112806223866151639.jpeg?x-oss-process=style/yasuo",
    "http://color-test.oss-cn-qingdao.aliyuncs.com/dyc/img/2019/02/02/15491128087691462190017.jpeg?x-oss-process=style/yasuo",
    "http://color-test.oss-cn-qingdao.aliyuncs.com/dyc/img/2019/02/02/1549112799839261454077.jpeg?x-oss-process=style/yasuo",
    "http://color-test.oss-cn-qingdao.aliyuncs.com/dyc/img/2019/02/02/15491128027001242326540.jpeg?x-oss-process=style/yasuo",
    "http://color-test.oss-cn-qingdao.aliyuncs.com/dyc/img/2019/02/02/1549112804446367923451.jpeg?x-oss-process=style/yasuo",
    "http://color-test.oss-cn-qingdao.aliyuncs.com/dyc/img/2019/02/02/1549112806223866151639.jpeg?x-oss-process=style/yasuo",
    "http://color-test.oss-cn-qingdao.aliyuncs.com/dyc/img/2019/02/02/15491128087691462190017.jpeg?x-oss-process=style/yasuo",

  ],
  count: 30
}
// let mockData = {
// 	status: 200,
// 	message: 'success',
// 	data: {
// 	  total: 100,//总数为100条
// 	  'rows|10': [{//随机生成10条数据
// 		id: '@guid',//使用的占位符
// 		name: '@cname',//使用的占位符
// 		'age|20-30': 23,//取出20-30中的数字
// 		'job|1': ['前端工程师', '后端工程师', 'UI工程师', '需求工程师']//job是随机取出其后数组中的某一项
// 	  }]
// 	}
//   };
//   //用于生成响应数据的函数
// export default {
// 	'post|/home/home':mockData,
// }
export default {
  // 官方解释为：记录用于生成响应数据的函数。当拦截到匹配 rurl 和 rtype 的 Ajax 请求时，函数 function(options) 将被执行，并把执行结果作为响应数据返回。
  'post|/index/index': (option) => {
    // 可以在这个地方对demoList2进行一系列操作，例如增删改
    // option 指向本次请求的 Ajax 选项集，含有 url、type 和 body 三个属性

    return {
      status: 200,
      message: 'success',
      data: mockData.data
    };
  }
}

// function getData(search) {
//   var data = []
//   if (search.page == 1) {
//     mockData.data.map((e, i) => {
//       if (i < search.limit * search.page) {
//         data.push(e)
//       }
//     })
//     return data
//   } else if (search.page == 2) {
//     mockData.data.map((e, i) => {
//       if ((search.page - 1) * 10 <= i && i < search.limit * search.page) {
//         data.push(e)
//       }
//     })
//     return data
//   } else if (search.page == 3) {
//     mockData.data.map((e, i) => {
//       if ((search.page - 1) * 10 <= i && i < search.limit * search.page) {
//         data.push(e)
//       }
//     })
//     return data
//   } else if (search.page == 4) {
//     return data
//   }
// }
