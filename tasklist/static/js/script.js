
$("li").click(function (e) {
  var cb = $(this).find(":checkbox")[0];
  if (e.target != cb) cb.checked = !cb.checked;
  $(this).toggleClass("selected", cb.checked);
});

$(window).on("load", function() {
  $("body").removeClass("preload");
});