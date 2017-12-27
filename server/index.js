var http = require('http')
var url = require('url')
var fs = require('fs')
var server = http.createServer(function(req,res){
    console.log(req.url)
    if(req.url=='/favicon.ico'){
        return
    }
    if(req.url=='/upload'&&req.method.toLowerCase()=='post'){
        console.log('上传图片。。。')
    }
    fs.readFile('../upload.html',function(error,data){
        if(error){
            throw '加载html模版失败'
        }else{
            var html = data.toString()
            res.writeHead(200,{"Content-type":"chartset=UTF-8"})
            res.end(html)
        }
    })
    
})
server.listen(3000,'127.0.0.1')
console.log('server is runnning')