var showdown  = require('showdown');
var open = require('open');
var http = require('http');
var fs = require('fs');

var html = "";
var mdFilePath = process.argv[2];
var server = http.createServer(function (req, res) {
  res.writeHead(200, {
      'Content-Length': html.length,
      'Content-Type': 'text/html'
   });
   res.end(html);
   process.exit();
})
if (typeof mdFilePath === 'undefined') {
   mdFilePath = __dirname + '/README.md';
}
fs.readFile(mdFilePath,'utf8', function(err, data) {
   if (err) {
      throw err;
   }
   html = new showdown.Converter().makeHtml(data);
   server.listen(2122, '127.0.0.1');
   open('http://127.0.0.1:2122/');
});

