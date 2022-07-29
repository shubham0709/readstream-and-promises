const fs = require('fs');
const http = require('http');
const fsPromises = fs.promises;

const server = http.createServer((req, res) => {
    let { url } = req;
    console.log(url);
    switch (url) {
        case "/textasync": {
            fs.readFile("./info.txt", { encoding: "utf-8" }, (err, data) => {
                res.end(err || data);
            })
            break;
        }
        case "/textsync": {
            const data = fs.readFileSync('./info.txt',
                { encoding: 'utf8', flag: 'r' });
            res.end(data);
            break;
        }
        case "/textstream": {
            var readstream = fs.createReadStream("./info.txt");
            readstream.pipe(res);
            // readstream.on('error', (err) => {
            //     res.end(err);
            // })
            break;
        }
        case "/textpromise": {
            fsPromises.readFile("./info.txt").then(data => {
                res.end(data);
            }).catch(err => {
                res.end(err);
            })
            break;
        }
        default: {
            res.end("default case");
            break;
        }

    }
})

server.listen(8080, () => {
    console.log("server is listening on port 8080");
})