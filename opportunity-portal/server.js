const http = require('http')
const fs = require('fs')
const path = require('path')
const httpStatus = require('http-status-codes')
const mime = require('mime-types')

const PORT = 3000
const routeMap = {
    '/': './public/views/index.html',
    '/about': './public/views/about.html'
}

let app = http.createServer((request, response) => {
    console.log('Request starting...', request.url)
   // console.log('Request method:', request.method)
   // console.log('Request header:', request.headers)

    let filePath = routeMap[request.url]
    if(!filePath){
        filePath = '.' + request.url
    }

    if(fs.existsSync(filePath)){
        fs.readFile(filePath, function (error, content) {
            if (error) {
                response.writeHead(httpStatus.INTERNAL_SERVER_ERROR)
                response.write('500: error reading file!')
                response.end()
            } else {
                //set a response type of html page for the result
                let contentType = mime.lookup(filePath)
                response.writeHead(httpStatus.OK, {'Content-Type': contentType});
                response.write(content)
                response.end();


            }
        })
    }
    else{
        response.writeHead(httpStatus.NOT_FOUND)
        response.write('404 error!')
        response.end()
    }


})

//start the server on port 3000
app.listen(3000)

console.log(`Server is running at 127.0.0.1:3001/ or http://localhost:${PORT}`)