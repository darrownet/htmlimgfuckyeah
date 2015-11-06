var express = require('express');
var router = express.Router();
var jimp = require('jimp');
var multer = require('multer');
var upload = multer({dest: "./public/uploads/"});
var fs = require('fs');
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/alright', upload.single("file"), function(req, res, next) {
  var mime = /image\/.*/,
      sendObj = {},
      origList = req.file.originalname.split('.');

  if(req.file.mimetype.match(mime) === null){
      fs.unlink(req.file.path);
      sendObj.fileName = 'pitythefool.html';
      sendObj.originalName = 'pitythefool';
      return res.send(sendObj);
  }

  origList.pop();
  sendObj.originalName = origList.join('');

  jimp.read(req.file.path, function(err, image){
      if(err) res.send(err);
      var currentRow = 0,
          arrayFuckYeah = [],
          wrapStart = '',
          imgMarkup = '',
          wrapEnd = '',
          htmlImg = '',
          i = 0,
          fileName;
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
          var red = this.bitmap.data[idx];
          var green = this.bitmap.data[idx+1];
          var blue = this.bitmap.data[idx+2];
          var alpha = this.bitmap.data[idx+3];
          arrayFuckYeah.push('<p style="background:rgba('+red+','+green+','+blue+','+alpha+');"></p>');
      });

      wrapStart = '<html><head><style>body{margin:0;}p{margin:0;padding:0;width:1px;height:1px;float:left;}</style></head><body><div style="width:'+image.bitmap.width+'px; height:'+image.bitmap.height+'px;">';
      imgMarkup = arrayFuckYeah.join("").toString();
      wrapEnd = '</div></body></html>';
      htmlImg = wrapStart+imgMarkup+wrapEnd;

      fileName = 'img_'+ Date.now() +'.html'
      sendObj.fileName = fileName;
      fs.unlink(req.file.path);
      fs.writeFile('./public/downloads/' + fileName, htmlImg, function(err){
          res.send(sendObj);
      });
  });
});

router.get('/yeah/:path', function(req, res){
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    res.download('./public/downloads/' + req.params.path, query.originalName + '-rasterfyed.html', function(err){
        console.log(err);
        if(req.params.path !== 'pitythefool.html'){
            fs.unlink('./public/downloads/' + req.params.path);
        }
    });
});

module.exports = router;
