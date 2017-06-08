
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
  if (text) {
    var new_task = $.ajax({
      url:"/add-task/",
      data:"text="+text,
      success: function(task_id){
        $("#new_task_form")[0].reset();
        get_task(task_id);
      }
    });
  } else {
    alert("Easter Egg 001 Found")
  }

}

function get_task(task_id){
  $.ajax({
    url:"/get-task/"+task_id+"/",
    success: function(result){
      var html_result = $(result);
      // fix this with angular at some point
      $(html_result).hide().appendTo(".list-group").fadeIn(10);
    },
    error: function(result){
      console.log("big whoopsie!!")
    }
  });
}

function toggle_task_completion(task_id){
  $.ajax({
    url:"/toggle-task/"+task_id+"/",
    success: function(result){
      var this_task_id = (result.task_id);
      var this_element = "#task-".concat(this_task_id);
      if ($(this_element).find("h4").hasClass('completed')) {
        $(this_element).find("h4").removeClass('completed');
      } else {
        $(this_element).find("h4").addClass('completed');
      }
      return result.task_id;
    }
  });
}

$(document).on('click', 'li', function (e) {
  // prevent toggle from done button
  if ($(e.target).is("button")){
    e.preventDefault();
    return;
  }
  var this_element = $(this).attr('id').split("-")[1];
  var returned_id = toggle_task_completion(this_element);
git
});
