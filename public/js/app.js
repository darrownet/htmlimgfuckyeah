$(function() {
  var myDropzone = Dropzone.forElement("#imgdrop");
  myDropzone.on("success", function(file, fileName) {
    window.location = window.location.origin + '/yeah/' + fileName;
  });
});
