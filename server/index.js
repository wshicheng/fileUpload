var http = require('http')
var url = require('url')
var fs = require('fs')
var formidable = require('formidable')
var sd = require('silly-datetime')
var utils = require('util')
var path = require('path')
var server = http.createServer(function(req,res){
    if(req.url=='/favicon.ico'){
        return
    }
    if(req.url=='/upload'&&req.method.toLowerCase()=='post'){
        console.log('上传图片。。。')
       res.writeHead(200,{"Content-type":"chartset=UTF-8"})
       var form = new formidable.IncomingForm();
       form.uploadDir = './upload'
       form.parse(req,function(err,fields,files){
           if(err){
               throw 'error:' + err
           }else{
               var oldPath = __dirname + '/' +files.uploadImg.path;
               var extename = path.extname(files.uploadImg.name)
               var newPath = __dirname + '/upload/' + sd.format(new Date(),'YYYY-MM-DD-HH:mm:ss') + randomNum() + extename
               fs.rename(oldPath,newPath,function(err){
                   if(err){
                       throw Error('修改文件名失败')
                   }else{
                       return false;
                   }
               })
           }
       })
       //res.end('success')
    }else if(req.url=='/imageList'){
        res.writeHead(200,{"Content-type":"chartset=UTF-8"})
        // fs.readFile('../index.html',function(err,data){
        //     if(err){
        //         throw Error('err:' + err)
        //     }else{
        //         res.end(data.toString())
        //     }
        // })
        fs.readdir('./upload',function(err,files){
           var filesList = []// 
           files.forEach(function(item,index){
               fs.stat('./upload/' + item,function(error,stats){
                   if(error){
                       throw Error('error:' + error)
                   }else{
                       if(!stats.isDirectory()){
                           console.log(item)
                       }
                   }
               })
           })
        })
    }else{
        fs.readFile('../upload.html',function(error,data){
            if(error){
                throw '加载html模版失败'
            }else{
                var html = data.toString()
                res.writeHead(200,{"Content-type":"chartset=UTF-8"})
                res.end(html)
            }
        })
    }
    function randomNum(){
        var tem = ''
        for(var i=0;i<3;i++){
            tem += Math.floor(Math.random()*10)
        }
        return tem
    }
    
})
server.listen(3000,'127.0.0.1')
console.log('server is runnning')