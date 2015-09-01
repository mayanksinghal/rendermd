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

var markdownCssPath = '/node_modules/github-markdown-css/github-markdown.css';
var css = fs.readFileSync(__dirname + markdownCssPath);
var generateHtml = function(markdownHtml) {
  return "<meta http-equiv='Content-Type' content='text/html;charset=utf-8'>" +
      "<style>" + css + "\n" +
      ".markdown-body {\n" +
      "  min-width: 200px;\n" +
      "  max-width: 790px;\n" +
      "  margin: 0 auto;\n" +
      "  padding: 30px;\n" +
      "}\n" +
      "</style>\n" +
      "<article class='markdown-body'>\n" +
      markdownHtml +
      "</article>";
};
fs.readFile(mdFilePath,'utf8', function(err, data) {
  if (err) {
    throw err;
  }
  var markdownHtml = new showdown.Converter().makeHtml(data);
  html = generateHtml(markdownHtml);
  server.listen(2122, '127.0.0.1');
  open('http://127.0.0.1:2122/');
});

