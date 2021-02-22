'use strict'
var OSS = require('ali-oss')
import Vue from 'vue'; //引入vue
//必须实例化 Vue
let vm = new Vue();

export default {
  createOssClient() {
    return new Promise((resolve, reject) => {
      let client = new OSS({
        region: "oss-cn-beijing", //你的oss地址 ，
        accessKeyId: "LTAI4G9gdMFLKvWXuWBs6XgW", //你的ak
        endpoint: 'oss-cn-beijing.aliyuncs.com',
        accessKeySecret: "5RfdcBdEEmCTKPiLirnNHn7XfYDc09", //你的secret
        bucket: 'liu-tao',
      })
      resolve(client)
    })
  },

  ossUploadFile(option) {
    let file = option.file
    const self = this
    return new Promise((resolve, reject) => {
      let date = Date.parse(new Date()); // 当前时间
      let extensionName = file.name.substr(file.name.indexOf('.')) // 文件扩展名
      var type
      var teacherImgfile
      if (extensionName == ".png" || extensionName == ".jpg" || extensionName == ".jpeg") {
        type = "images";
        teacherImgfile = ".jpg";
      } else if (extensionName == ".svga") {
        type = "svga";
        teacherImgfile = ".svga";
      } else if (extensionName == ".mp3" || extensionName == ".mp4") {
        type = "audio";
        teacherImgfile = ".mp3";
      } else if (extensionName == ".gif") {
        type = "images";
        teacherImgfile = ".gif";
      } else if (extensionName == ".apk") {
        type = "dataapk";
        teacherImgfile = "admin.apk";
      }

      let fileName = "img/"+date+ teacherImgfile // 文件名字（相对于根目录的路径 + 文件名）
      self.createOssClient().then(client => {
        resolve({
          fileName: file.name,
          fileUrl: fileName
        })
        client.multipartUpload(fileName, file, {
          progress: function (p) {
            let e = {}
            e.percent = Math.floor(p * 100)
            option.onProgress(e)
          }
        }).then((val) => {
          // console.info(val)
          if (val.res.statusCode === 200) {
            option.onSuccess(val)
            return val
          } else {
            option.onError('上传失败')
          }
        }, err => {
          option.onError('上传失败')
          reject(err)
        })
      })
    })
  }
}
