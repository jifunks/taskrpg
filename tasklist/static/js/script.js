
$("li").click(function (e) {
  // if has class strikethrough remove class else
  if ($(this).find("h4").hasClass('strikethrough')) {
    $(this).find("h4").removeClass('strikethrough');
  } else {
    $(this).find("h4").addClass('strikethrough');
  }
  // TODO: ajax query to add completed property to task
});

$(window).on("load", function() {
  $("body").removeClass("preload");
});

function delete_task(task){
  var msg = $.ajax({
    url:"/delete-task/"+task+"/",
    success: function(){
      var this_element = "#task-".concat(task);
      $(this_element).fadeOut(250);
        setTimeout(function(){$(this_element).remove()},1000);
      }
    });
};

function add_task(){
    text = $("#newtask-text").val();
    var new_task = $.ajax({
      url:"/add-task/",
      data:"text="+text,
      success: function(task_id){
          $("#new_task_form")[0].reset();
          get_task(task_id);
          }
  });
}

function get_task(task_id){
    $.ajax({
        url:"/get-task/"+task_id+"/",
        success: function(result){
          var html_result = $(result);
          $(html_result).hide().appendTo(".list-group").fadeIn(100);
          // $(".list-group").append(html_result);
          // $("#task-"+task_id).fadeIn(1000);
        }
    });
}
