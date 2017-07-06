
$(window).on("load", function() {
  $("body").removeClass("preload");
  $('#prog-bar').html('<div class="progress progress-striped"><div class="progress-bar progress-work" style="width: 0%;"><div></div>');

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
    alert("Easter Egg #001 Found")
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
  // prevent toggle from done button clicking
  if ($(e.target).is("button") || $(e.target).is("span")){
    e.preventDefault();
    return;
  }
  var this_element = $(this).attr('id').split("-")[1];
  var returned_id = toggle_task_completion(this_element);
});



var app = angular.module('pomodoro', []);

app.controller('mainController', ['$scope', '$interval', function($scope, $interval) {

  var chronos;
  // var max_time = 25*60*1000;
  // $scope.sandclock = 25*60*1000;
  var max_time = 25*60*1000;
  $scope.sandclock = max_time;
  $scope.start = start;
  $scope.pause= pause;
  $scope.reset = reset;
  $scope.timer_state = -1; // -1 = init, 0 = pause, 1 = 25m timer, 2 = 5m break
  $scope.next_state = 1;
  $scope.progress_status = 'progress-work'

  function start() {
    // this is hit by a BUTTON.
    console.log($scope.timer_state);
    // Should RESUME timer if timer has been paused, and should INITIALIZE/START timer if it hasn't been hit yet
    if ($scope.timer_state == -1){
      // TODO: this reset is asynchronous and might not finish setting $scope.progress_status before starting timer_countdown
      reset();
      timer_countdown()
      // start timer
      // timer_countdown needs to be run once reset has completed.
    } else if ($scope.timer_state == 0) { // in case of pause
      timer_countdown();
    }
  }

  function timer_countdown() {
    console.log($scope.progress_status);
    // This will be a general countdown timer - NOT specific to work or break period
    chronos = $interval(function() {
      if($scope.sandclock > 0) {
        $scope.sandclock -= 1000;
        var prog = ((max_time - $scope.sandclock)/max_time) * 100
        $('#prog-bar').html('<div class="progress progress-striped"><div class="progress-bar '+ $scope.progress_status + '" style="width:' + prog + '%;"><div></div>');
      } else {
        stop();
      }
    }, 1000);
  }

  function reset() {
    // reset timer to maximum time & pause
    // adding this timer to break it so i have to fix the asynch issue
    $scope.progress_status = 'progress-work';
    $(".jumbotron").css("background-color", "#eee");
    $('#status-text').text("let's work!");
    $scope.timer_state = 1;
    $scope.next_state = 2;
    // max_time = 10*1000; //debug
    max_time = 25*60*1000;
    $scope.sandclock = max_time;
    pause();
  };

  function set_break() {
    // reset timer to break time & pause
    $scope.progress_status = 'progress-rest';
    $(".jumbotron").css("background-color", " #e6f7ff");
    $('#status-text').text("let's break!");

    $scope.timer_state = 2;
    $scope.next_state = 1;
    max_time = 5*60*1000;

    // max_time = 5*1000; //debug
    $scope.sandclock = max_time;
    pause();
  }

  // cancel interval temporarily
  function pause(){
    $scope.timer_state = 0;
    $interval.cancel(chronos);
    chronos = undefined;
  }

  function stop() {
    // during stopped period, timer will stop and not resume until start is pressed
    // needs to set timer for screen!!
    // needs to set - if previous timer state was 1 (work period) then next state should be 2 (rest period)
    $interval.cancel(chronos);
    chronos = undefined;
    Push.create('Time!', {
      body: 'Your timer is up!',
      icon: {
        x16: 'static/img/smug.png',
        x32: 'static/img/smug.png'
      },
      timeout: 10000,
      onClick: function(x) {window.focus(); this.close();},

    });
    if ($scope.next_state == 2){
      set_break();
    } else if ($scope.next_state == 1) {
      reset();
    }
  }
}]);
