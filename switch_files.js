import { createServer } from 'http';
import { parse } from 'url';
import { readFile } from 'fs';

createServer((req, res) => {
    const q = parse(req.url, true);
    let filename;
    if (q.pathname !== '/') {
        filename = '.' + q.pathname + '.html';
    } else {
        filename = './index.html';
    }
    console.log(filename);
    if (filename !== './index.html' && filename !== './about.html' && filename !== './contact-me.html') {
        readFile('./404.html', (err, data) => {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    } else {
        readFile(filename, (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        })
    }
}).listen(8080);