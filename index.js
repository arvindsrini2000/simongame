var colors = ["red", "green", "blue", "yellow"];
var gamepattern = [];
var userinput = [];
var level = -1;
var started = false;

$(document).keydown(function() {
  if(!started)
  {
    setTimeout(function(){
        gamestart();
    }, 1000);
  }
});


function gamestart() {
  started = true;
  userinput = [];
  var rn = Math.floor(Math.random() * 4);
  //console.log(rn);
  var color = colors[rn];
  var colorid = "#" + color;
  var audiofilename = "sounds/" + color + ".mp3";
  var audio = new Audio(audiofilename);
  gamepattern.push(color);
  //console.log(color + " " + colorid + " " + audiofilename + " " + audio);
  $(colorid).fadeOut(100);
  audio.play();
  $(colorid).fadeIn(100);
  console.log("Game pattern: " + gamepattern);
  level++;
  updatelevel();
}


$(".btn").click(function() {
  if(started)
  {
    var btn = this.id;
    userinput.push(btn);
    var classname = "."+this.id;
    $(classname).addClass("pressed");
    setTimeout(function(){
      $(classname).removeClass("pressed");
    },100);
    validate(userinput.length);
  }
});

function updatelevel()
{
  var leveltext = "Level " + level;
  $("#level-title").text(leveltext);
}

function validate(i) {
  console.log("Userinput: " + userinput);
  if (gamepattern[i - 1] === userinput[i - 1]) {
    //console.log(gamepattern[i - 1] + " " + userinput[i - 1]);
    if (gamepattern.length == userinput.length) {
      setTimeout(function(){
        gamestart();
      },1000)
    }
  } else {
    startover();
  }
}


function startover()
{
  var leveltext = "Game Over, press any key to restart!";
  gameover();
  $("#level-title").text(leveltext);
  level = -1;
  userinput = [];
  gamepattern = [];
  started = false;
}

function gameover()
{
    $("body").addClass('game-over');
    setTimeout(function(){
      $("body").removeClass('game-over');
    }, 200);
    var wa = new Audio("sounds/wrong.mp3");
    wa.play();
}
