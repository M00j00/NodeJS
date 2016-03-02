var http = require('http');
var fs = require('fs');
var path = require('path');
var ext = /[\w\d_-]+\.[\w\d]+$/;

function handleReq(req, res)
{
	if (req.url === '/')
	{
		res.writeHead(200, {'Content-Type' : 'text/html'});
		fs.createReadStream('index.html').pipe(res);
	}
	else if (ext.test(req.url))
	{
		var filePath = path.join(__dirname, req.url);
		fs.exists(filePath, function (exists)
		{
			if (exists)
			{
				res.writeHead(200, {'Content-Type' : 'text/html'});
				fs.createReadStream(filePath).pipe(res);
			}
			else
			{
				res.writeHead(404, {'Content-Type' : 'text/html'});
				fs.createReadStream('404.html').pipe(res);
			}
		});
	}
}

http.createServer(handleReq).listen(8080, '0.0.0.0');
console.log('Server running on port 8080');

