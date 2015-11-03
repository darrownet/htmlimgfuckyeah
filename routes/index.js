var express = require('express');
var router = express.Router();
var jimp = require('jimp');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/alright', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  jimp.read('./public/img/sample.jpg', function(err, image){
      if(err) res.send(err);
      var currentRow = 0,
          arrayFuckYeah = [[]];
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
          if(currentRow != y){
              currentRow = y;
              arrayFuckYeah.push([]);
          };
          var red = this.bitmap.data[idx];
          var green = this.bitmap.data[idx+1];
          var blue = this.bitmap.data[idx+2];
          var alpha = this.bitmap.data[idx+3];
          arrayFuckYeah[currentRow].push([red, green, blue]);
      });
      res.send(arrayFuckYeah);
  });
});

module.exports = router;
