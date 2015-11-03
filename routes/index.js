var express = require('express');
var router = express.Router();
var jimp = require('jimp');
var multer = require('multer');
var upload = multer({dest: "./public/uploads/"});
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/alright', upload.single("file"), function(req, res, next) {
  jimp.read(req.file.path, function(err, image){
      if(err) res.send(err);
      var currentRow = 0,
          arrayFuckYeah = [],
          wrapStart = '',
          imgMarkup = '',
          wrapEnd = '',
          htmlImg = '',
          i = 0;
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
          var red = this.bitmap.data[idx];
          var green = this.bitmap.data[idx+1];
          var blue = this.bitmap.data[idx+2];
          var alpha = this.bitmap.data[idx+3];
          arrayFuckYeah.push('<p style="background:rgba('+red+','+green+','+blue+','+alpha+');"></p>');
      });

      wrapStart = '<html><head><style>p{margin:0;padding:0;width:1px;height:1px;float:left;}</style></head><body><div style="width:'+image.bitmap.width+'px; height:'+image.bitmap.height+'px;">';
      imgMarkup = arrayFuckYeah.join("").toString();
      wrapEnd = '</div></body></html>';
      htmlImg = wrapStart+imgMarkup+wrapEnd;
      fs.writeFile('./public/downloads/img.html', htmlImg);
      res.send(true);
  });
});

module.exports = router;
