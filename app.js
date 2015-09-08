var easyimg = require('easyimage');
var fs = require('fs');

console.log("Resize process started...");

var outputDir = 'output';
var outputDirThumbnail = 'output-thumbnail';
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
if (!fs.existsSync(outputDirThumbnail)) fs.mkdirSync(outputDirThumbnail);

var srcimg = __dirname + '/img/';

fs.readdir(srcimg, function (err, files) {
	if (!err)
  {
		files.forEach(function(file){
      //console.log(file);
      easyimg.resize({
           src: srcimg + file,
           dst: outputDir+'/' + file,
           width:600, height:450,
           ignoreAspectRatio: true
        }).then(
        function(image) {
           console.log('Resized ' + file +': ' + image.width + ' x ' + image.height);
        },
        function (err) {
          console.log(err);
        }
      );
      easyimg.thumbnail({
           src: srcimg + file,
           dst: outputDirThumbnail+'/' + file,
           width: 100,
           height: 100
        }).then(
        function(image) {
           console.log('Thumbnail ' + file);
        },
        function (err) {
          console.log(err);
        }
      );
    });
  }
	else
    console.log(err);
});
