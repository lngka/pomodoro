document.getElementById('sessionPlus').addEventListener("click", onSessionPlus);
document.getElementById('sessionMinus').addEventListener("click", onSessionMinus);
document.getElementById('breakPlus').addEventListener("click", onbreakPlus);
document.getElementById('breakMinus').addEventListener("click", onbreakMinus);
document.getElementById('circle').addEventListener("click", onCircle);

var isRunning = false;
var isBreak = false;
var isNewSession = true;
var secondInterval;
var audio = new Audio('sfx/timesup.wav');

function onCircle(){
  console.log("test");
  if (!isRunning) {
    start();
  }
  else {
    pause();
  }
}

function  onSessionPlus(){
  if (isRunning) {
    return;
  }
  else {
    var curSession = parseInt(document.getElementById('sessionTime').innerHTML);
    curSession += 5;
    document.getElementById('sessionTime').innerHTML = curSession;
    document.getElementById('minute').innerHTML = curSession;
    document.getElementById('second').innerHTML = "00";
    isNewSession = true;
  }
}

function  onSessionMinus(){
  if (isRunning) {
    return;
  }
  else {
    var curSession = parseInt(document.getElementById('sessionTime').innerHTML);
    if (curSession > 5) {
      curSession -= 5;
      document.getElementById('sessionTime').innerHTML = curSession;
      document.getElementById('minute').innerHTML = curSession;
      document.getElementById('second').innerHTML = "00";
      isNewSession = true;
    }
  }
}

function  onbreakPlus(){
  var curBreak = parseInt(document.getElementById('breakTime').innerHTML);
  document.getElementById('breakTime').innerHTML = curBreak + 5;
}

function  onbreakMinus(){
  var curBreak = parseInt(document.getElementById('breakTime').innerHTML);
  if (curBreak > 5) {
    document.getElementById('breakTime').innerHTML = curBreak - 5;
  }
}

function start() {
  // handle new session
  // minute & second should be decreased immediately by one
  if (isNewSession) {
    var curMin = parseInt(document.getElementById('minute').innerHTML);
    var curSec = parseInt(document.getElementById('second').innerHTML);
    if (curSec === 0) {
      document.getElementById('second').innerHTML = 59;
    } else {
      document.getElementById('second').innerHTML = twoDigit(curSec - 1);
    }
    if (curMin >= 1) {
      document.getElementById('minute').innerHTML =  twoDigit(curMin - 1);
    }
    isNewSession = false;
  }

  // handle running session
  isRunning = true;
  countSecond();
}

function pause() {
  clearInterval(secondInterval);
  isRunning = false;
  isNewSession = false;
}

function countSecond(){
  secondInterval = setInterval(function(){
    var curMin = parseInt(document.getElementById('minute').innerHTML);
    var curSec = parseInt(document.getElementById('second').innerHTML);

    if (curMin===0 && curSec===0) {
      clearInterval(secondInterval);
      // TODO: play sound
      audio.play();
      if (isBreak) {
        document.getElementById('minute').innerHTML = twoDigit(document.getElementById('sessionTime').innerHTML);
        document.getElementById('second').innerHTML = "00";
        isRunning = false;
        isBreak = false;
      }
      else if (!isBreak) {
        document.getElementById('minute').innerHTML = twoDigit(document.getElementById('breakTime').innerHTML);
        document.getElementById('second').innerHTML = "00";
        isRunning = false;
        isBreak = true;
      }
      return;
    }

    if (curSec===0 && curMin>0) {// happens only once at the start
      document.getElementById('second').innerHTML = 59;
      document.getElementById('minute').innerHTML = twoDigit(curMin - 1);
      return;
    }
    if (curSec===1 && curMin>0) {// happens every minute after the start
      document.getElementById('second').innerHTML = 59;
      document.getElementById('minute').innerHTML = twoDigit(curMin - 1);
      return;
    }
    else {
      document.getElementById('second').innerHTML = twoDigit(curSec - 1);
    }
  }, 1000);
}

function twoDigit(number) {
    var output = number + '';
    while (output.length < 2) {
        output = '0' + output;
    }
    return output;
}
