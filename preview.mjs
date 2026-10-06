import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist');
http.createServer((req,res)=>{const name=new URL(req.url,'http://localhost').pathname;const target=path.resolve(root,'.'+(name==='/'?'/index.html':name));if(!target.startsWith(root+path.sep)){res.writeHead(403);return res.end()}fs.readFile(target,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found')}const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg'};res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream'});res.end(data)})}).listen(4317,'127.0.0.1',()=>console.log('Local URL: http://127.0.0.1:4317'));
