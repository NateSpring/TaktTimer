// Extract URL string -> parse to Vars
function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
    m,
    key,
    value
  ) {
    vars[key] = value;
  });
  return vars;
}
////////////////// URL EXTRACTED /////////////////
let productName = getUrlVars()["productName"];
let procedureType = getUrlVars()["procedureType"];

let productQuan = getUrlVars()["productQuan"];
let taktTime = getUrlVars()["taktTime"];
let prepTime = getUrlVars()["prepTime"];
let tearTime = getUrlVars()["tearTime"];
//

///////////////// URL-Vars converted to readable time.

let int;
let stop = false;

var prep = prepTime * 1000 * 60;
var time = taktTime * productQuan * 1000 * 60;
var tear = tearTime * 1000 * 60;
var totalTakt = time + prep + tear;
var staticTotalTakt = totalTakt;

////// Individual timer values are pushed     /////
/////  to be compared to current total takt. /////
var finaltime = 0;

//////////////////////////////////////////////
//////// Switches timers from START button ///
var count = 0;
function stepSwitcher() {
  switch (count) {
    case 0:
      setClocks(), startPrep(), startTotal();
      break;
    case 1:
      finishPrep();
      break;
    case 2:
      finishTakt();
      break;
    case 3:
      finishTear();
      break;
  }
  count++;
}
//////////////////////////////////////////////

///////////////////////LOAD CLOCKS//////////////////////
// Load Preparation Clock
let loadClockPrep = () => {
  let t = prep;
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / 1000 / 60 / 60) % 24);

  document.getElementById("timer-seconds-setup").innerHTML =
    seconds < 10 ? ":" + "0" + seconds : ":" + seconds;
  document.getElementById("timer-minutes-setup").innerHTML =
    minutes < 10 ? ":" + "0" + minutes : ":" + minutes;
  document.getElementById("timer-hours-setup").innerHTML =
    hours < 10 ? "0" + hours : hours;
};
// Load Working Clock
let loadClockTakt = () => {
  let t = time;
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / 1000 / 60 / 60) % 24);
  document.getElementById("timer-seconds-work").innerHTML =
    seconds < 10 ? ":" + "0" + seconds : ":" + seconds;
  document.getElementById("timer-minutes-work").innerHTML =
    minutes < 10 ? ":" + "0" + minutes : ":" + minutes;
  document.getElementById("timer-hours-work").innerHTML =
    hours < 10 ? "0" + hours : hours;
};

// Load Teardown Clock
let loadClockTear = () => {
  let t = tear;
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / 1000 / 60 / 60) % 24);
  document.getElementById("timer-seconds-tear").innerHTML =
    seconds < 10 ? ":" + "0" + seconds : ":" + seconds;
  document.getElementById("timer-minutes-tear").innerHTML =
    minutes < 10 ? ":" + "0" + minutes : ":" + minutes;
  document.getElementById("timer-hours-tear").innerHTML =
    hours < 10 ? "0" + hours : hours;
};
// Load Total Takt Clock
let loadClockTotal = () => {
  let t = totalTakt;
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / 1000 / 60 / 60) % 24);
  document.getElementById("timer-seconds-total").innerHTML =
    seconds < 10 ? ":" + "0" + seconds : ":" + seconds;
  document.getElementById("timer-minutes-total").innerHTML =
    minutes < 10 ? ":" + "0" + minutes : ":" + minutes;
  document.getElementById("timer-hours-total").innerHTML =
    hours < 10 ? "0" + hours : hours;
};
/////////////// End Load Clocks ////////////

////////////// SUCCESS/FAIL POPUP //////////////

var success = document.getElementById("myModal");
var fail = document.getElementById("myModal2");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

let congrats = () => {
  if (totalTakt > 0) {
    success.style.display = "block";
  } else {
    fail.style.display = "block";
  }
};

let hideModal = () => {
  success.style.display = "none";
  fail.style.display = "none";
};
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == success) {
    success.style.display = "none";
  }
  if (event.target == fail) {
    fail.style.display = "none";
  }
};
////////////////////////////////////




////// TIMER TRIGGERS ////////////////

//Prep Timer
let setupTimer = () => {
  let int = setInterval(timerFunction, 1000);
  stopSetup = false;
  document.getElementById("start-button").innerHTML = `<p>NEXT STEP</p>`;

  function timerFunction() {
    prep -= 1000;

    var seconds = Math.floor(Math.abs((prep / 1000) % 60));
    var minutes = Math.floor(Math.abs((prep / 1000 / 60) % 60));
    var hours = Math.floor(Math.abs((prep / 1000 / 60 / 60) % 24));

    if (prep >= 0) {
      document.getElementById("timer-seconds-setup").innerHTML =
        seconds < 10 ? ":" + "0" + seconds : ":" + seconds;
      document.getElementById("timer-minutes-setup").innerHTML =
        minutes < 10 ? ":" + "0" + minutes : ":" + minutes;
      document.getElementById("timer-hours-setup").innerHTML =
        hours < 10 ? "0" + hours : hours;
      document.getElementById("setup-button").innerHTML = `<p>IN PROCESS</p>`;
      document
        .getElementById("setup-finish-button")
        .setAttribute("class", "indicator-blue");
    }
    if (stopSetup == true && prep > 0) {
      clearInterval(int);
      document.getElementById("setup-button").innerHTML = `<p>DONE</p>`;
      document
        .getElementById("setup-finish-button")
        .setAttribute("class", "indicator-green");
    }
    if (prep < 0) {
      document.getElementById("timer-seconds-setup").innerHTML =
        seconds < 10 ? ":" + "0" + seconds : ":" + seconds;
      document.getElementById("timer-minutes-setup").innerHTML =
        minutes < 10 ? ":" + "0" + minutes : ":" + minutes;
      document.getElementById("timer-hours-setup").innerHTML =
        hours < 10 ? "-" + "0" + hours : hours;
      document.getElementById("setup-button").innerHTML = `<p>OVER TAKT</p>`;
      document
        .getElementById("setup-finish-button")
        .setAttribute("class", "indicator-red");
    }
    if (stopSetup == true) {
      clearInterval(int);
    }
  }

  return prep;
};

//Working Timer
let workTimer = () => {
  let int = setInterval(timerFunction, 1000);
  stopTakt = false;
  function timerFunction() {
    time -= 1000;
    var seconds = Math.floor(Math.abs((time / 1000) % 60));
    var minutes = Math.floor(Math.abs((time / 1000 / 60) % 60));
    var hours = Math.floor(Math.abs((time / 1000 / 60 / 60) % 24));

    if (time > 0) {
      document.getElementById("timer-seconds-work").innerHTML =
        seconds < 10 ? ":" + "0" + seconds : ":" + seconds;
      document.getElementById("timer-minutes-work").innerHTML =
        minutes < 10 ? ":" + "0" + minutes : ":" + minutes;
      document.getElementById("timer-hours-work").innerHTML =
        hours < 10 ? "0" + hours : hours;
      document.getElementById(
        "part-takt-button"
      ).innerHTML = `<p>IN PROCESS</p>`;
      document
        .getElementById("part-finish-button")
        .setAttribute("class", "indicator-blue");
    }
    if (stopTakt == true && time > 0) {
      clearInterval(int);
      document.getElementById("part-takt-button").innerHTML = `<p>DONE</p>`;
      document
        .getElementById("part-finish-button")
        .setAttribute("class", "indicator-green");
    }
    if (time < 0) {
      document.getElementById("timer-seconds-work").innerHTML =
        seconds < 10 ? ":" + "0" + seconds : ":" + seconds;
      document.getElementById("timer-minutes-work").innerHTML =
        minutes < 10 ? ":" + "0" + minutes : ":" + minutes;
      document.getElementById("timer-hours-work").innerHTML =
        hours < 10 ? "-" + "0" + hours : hours;
      document.getElementById(
        "part-takt-button"
      ).innerHTML = `<p>OVER TAKT</p>`;
      document
        .getElementById("part-finish-button")
        .setAttribute("class", "indicator-red");
    }
    if (stopTakt == true) {
      clearInterval(int);
    }
  }
  return time;
};

//
// Teardown Timer
let tearTimer = () => {
  let int = setInterval(timerFunction, 1000);
  stopTear = false;
  document.getElementById("start-button").innerHTML = `<p>FINISH</p>`;

  function timerFunction() {
    tear -= 1000;

    var seconds = Math.floor(Math.abs((tear / 1000) % 60));
    var minutes = Math.floor(Math.abs((tear / 1000 / 60) % 60));
    var hours = Math.floor(Math.abs((tear / 1000 / 60 / 60) % 24));

    if (tear > 0) {
      document.getElementById("timer-seconds-tear").innerHTML =
        seconds < 10 ? ":" + "0" + seconds : ":" + seconds;
      document.getElementById("timer-minutes-tear").innerHTML =
        minutes < 10 ? ":" + "0" + minutes : ":" + minutes;
      document.getElementById("timer-hours-tear").innerHTML =
        hours < 10 ? "0" + hours : hours;
      document.getElementById(
        "teardown-time-button"
      ).innerHTML = `<p>IN PROCESS</p>`;
      document
        .getElementById("teardown-finish-button")
        .setAttribute("class", "indicator-blue");
    }
    if (stopTear == true && tear > 0) {
      clearInterval(int);
      document.getElementById("teardown-time-button").innerHTML = `<p>DONE</p>`;
      document
        .getElementById("teardown-finish-button")
        .setAttribute("class", "indicator-green");
    }
    if (tear < 0) {
      document.getElementById("timer-seconds-tear").innerHTML =
        seconds < 10 ? ":" + "0" + seconds : ":" + seconds;
      document.getElementById("timer-minutes-tear").innerHTML =
        minutes < 10 ? ":" + "0" + minutes : ":" + minutes;
      document.getElementById("timer-hours-tear").innerHTML =
        hours < 10 ? "-" + "0" + hours : hours;

      document.getElementById(
        "teardown-time-button"
      ).innerHTML = `<p>OVER TAKT</p>`;
      document
        .getElementById("teardown-finish-button")
        .setAttribute("class", "indicator-red");
    }
    if (stopTear == true) {
      clearInterval(int);
    }
  }

  return tear;
};




//
//Total takt Timer
let taktTimer = () => {
  let int = setInterval(timerFunction, 1000);
  stopTotal = false;
  // Function below for finishing production.

  function timerFunction() {
    ////////////// LARGE INDICATOR CONTROL ///////////////
    
    console.log(finaltime + totalTakt, totalTakt);
/*
With each step: Prep, working and tear time are added to finaltime
*/

    // if overall moving time is less than current takt time, stay green, else turn yellow.
    if (finaltime + totalTakt < totalTakt) {
      document
        .getElementById("overall-indicator")
        .setAttribute("class", "overall-indicator-yellow-flashy");
      document.getElementById("text-status").innerHTML = `<p>DANGER</p>`;
    } else {
      document
        .getElementById("overall-indicator")
        .setAttribute("class", "overall-indicator-green");
      document.getElementById("text-status").innerHTML = `<p>IN PROCESS</p>`;
    }

    if (stopTotal == true) {
      clearInterval(int);
    }

    totalTakt -= 1000;

    if (totalTakt > 0) {
      var seconds = Math.floor((totalTakt / 1000) % 60);
      var minutes = Math.floor((totalTakt / 1000 / 60) % 60);
      var hours = Math.floor((totalTakt / 1000 / 60 / 60) % 24);
      document.getElementById("timer-seconds-total").innerHTML =
        seconds < 10 ? ":" + "0" + seconds : ":" + seconds;
      document.getElementById("timer-minutes-total").innerHTML =
        minutes < 10 ? ":" + "0" + minutes : ":" + minutes;
      document.getElementById("timer-hours-total").innerHTML =
        hours < 10 ? "0" + hours : hours;

      document.getElementById("text-status").innerHTML = `<p>IN PROCESS</p>`;
    } else if (totalTakt <= 0) {
      var seconds = Math.floor(Math.abs((totalTakt / 1000) % 60));
      var minutes = Math.floor(Math.abs((totalTakt / 1000 / 60) % 60));
      var hours = Math.floor(Math.abs((totalTakt / 1000 / 60 / 60) % 24));
      document.getElementById("timer-seconds-total").innerHTML =
        seconds < 10 ? ":" + "0" + seconds : ":" + seconds;
      document.getElementById("timer-minutes-total").innerHTML =
        minutes < 10 ? ":" + "0" + minutes : ":" + minutes;
      document.getElementById("timer-hours-total").innerHTML =
        hours < 10 ? "-" + "0" + hours : hours;
      document
        .getElementById("overall-indicator")
        .setAttribute("class", "overall-indicator-red");
      document.getElementById("text-status").innerHTML = `<p>FAILED</p>`;
    }
  }

  return totalTakt;
};

//

//

//Button functions for starting and stopping timers.
let startPrep = () => {
  setupTimer();
};
let startTotal = () => {
  taktTimer();
};

let finishPrep = () => {
  stopSetup = true;
  startTakt();
  finaltime += prep;
};





let startTakt = () => {
  workTimer();
};
let finishTakt = () => {
  stopTakt = true;
  startTear();
  finaltime += time;
};







let startTear = () => {
  tearTimer();
};
let finishTear = () => {
  stopTear = true;
  stopTotal = true;
  congrats();
finaltime += tear
};



let beginAgain = () => {
  window.location.reload(false);
};



//This function will set the ending time.
let setClocks = () => {
  // Set time.
  var start = new Date();
  var end = new Date();

  var options = {
    hour: "2-digit",
    minute: "2-digit"
  };

  var endTimeSeconds = Math.floor((totalTakt / 1000) % 60);
  var endTimeMinutes = Math.floor((totalTakt / 1000 / 60) % 60);
  var endTimeHours = Math.floor((totalTakt / 1000 / 60 / 60) % 24);

  end.setHours(end.getHours() + endTimeHours);
  end.setMinutes(end.getMinutes() + endTimeMinutes);
  end.setSeconds(end.getSeconds() + endTimeSeconds);

  let startTime = start.toLocaleTimeString("en-us", options);
  let finishTime = end.toLocaleTimeString("en-us", options);
  //
  document.getElementById("start-time").innerHTML = startTime;
  document.getElementById("finish-time").innerHTML = finishTime;
};

window.onload = document.getElementById("part-number").innerHTML = productName;

window.onload = loadClockTakt();
window.onload = loadClockPrep();
window.onload = loadClockTear();
window.onload = loadClockTotal();






/* ALTERNATE ALGORITHM FOR TAKT COMPARISON


initialized up top:
var finals = {
  pre: NaN,
  tim: NaN,
  tea: NaN
}


called in timerFunction of taktTimer:
    finals.pre = prep;
    finals.tim = time;
    finals.tea = tear;

    var currentFinals = finals.pre + finals.tim + finals.tea;

*/