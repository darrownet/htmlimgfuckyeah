$(function() {
  var myDropzone = Dropzone.forElement("#imgdrop");
  myDropzone.on("success", function(file, obj) {
    window.location = window.location.origin + '/yeah/' + obj.fileName + '?originalName=' + obj.originalName;
  });
});