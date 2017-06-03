
$("li").click(function (e) {
  var cb = $(this).find(":checkbox")[0];
  if (e.target != cb) cb.checked = !cb.checked;
  $(this).toggleClass("selected", cb.checked);
});

$(window).on("load", function() {
  $("body").removeClass("preload");
});

function delete_task(task){
  var msg = $.ajax({
    url:"/delete-task/"+task+"/",
    success: function(){
      var this_element = "#task-".concat(task);
      console.log(this_element);
      $(this_element).fadeOut(500);
      setTimeout(function(){$(this_element).remove()},1000);
      }
    });
};