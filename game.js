var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started=false;
var level=0;
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextsequence();
    started=true;
  }
});

function checkanswer(currentlevel){
  if(userClickedPattern[currentlevel]===gamePattern[currentlevel]){
    console.log("success");
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextsequence();
      },1000)
    }
  }
  else{
    playsound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $('body').addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)
    startOver();
  }
}

$(".btn").click(function() {
  userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatePress(userChosenColour);
  checkanswer(userClickedPattern.length-1);

});

function nextsequence() {
  level++;
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  let randomnumber = 0 + (4) * Math.random();
  randomnumber = Math.floor(randomnumber);
  let randomChosenColour = buttonColours[randomnumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);

}


function playsound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100)
}
function startOver() {

  //3. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}
