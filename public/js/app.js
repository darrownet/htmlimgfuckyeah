$(function() {
  var myDropzone = Dropzone.forElement("#img-drop");
  myDropzone.on("success", function(file, obj) {
    window.location = window.location.origin + '/yeah/' + obj.fileName + '?originalName=' + obj.originalName;
  });
});
