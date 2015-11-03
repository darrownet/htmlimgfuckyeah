$(function() {
  var myDropzone = Dropzone.forElement("#imgdrop");
  myDropzone.on("success", function(file, message) {
    console.log(message);
  });
});