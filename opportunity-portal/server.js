const http = require('http')
const fs = require('fs')
const path = require('path')

let app = http.createServer((request, response) => {
    console.log('Request starting...', request.url)

    let filePath = '.' + request.url
    if (filePath === './') {
        filePath = './public/views/index.html'
    }

    if(fs.existsSync(filePath)){
        fs.readFile(filePath, function (error, content) {
            if (error) {
                response.writeHead(500)
                response.write('500: error reading file!')
                response.end()
            } else {
                //set a response type of html page for the result
                if(path.extname(filePath) === '.html') {
                    response.setHeader('Content-Type', 'text/html')
                    response.end(content, 'utf-8')
                }
                else if(path.extname(filePath) === '.jpeg')
                {
                    response.setHeader('Content-Type', 'image/jpeg')
                    response.end(content)
                }
                else if(path.extname(filePath) === '.js')
                {
                    response.setHeader('Content-Type', 'text/javascript')
                    response.end(content)
                }
                else if(path.extname(filePath) === '.css')
                {
                    response.setHeader('Content-Type', 'text/css')
                    response.end(content)
                }

            }
        })
    }
    else{
        response.writeHead(404)
        response.write('404 error!')
        response.end()
    }


})

//start the server on port 3000
app.listen(3000)

console.log('Server is running at 127.0.0.1:3001/ or http://localhost:3000')