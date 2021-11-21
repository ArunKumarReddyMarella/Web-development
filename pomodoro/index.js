var timmer = document.getElementById("timer");
var start = document.getElementById("start");
var reset = document.getElementById("reset");
var sessionname = document.getElementById("sessionname");
var sessiontimmer = document.getElementById("sessiontimmer");
var sessionminus = document.getElementById("session-");
var buttons = document.getElementsByTagName("button");
var started = false;
var sessionnumber = 0;
sessionminus.addEventListener("click", function() {
    var sessiontime = Number(sessiontimmer.innerHTML);
    if (sessiontime > 1) {
        sessiontime--;
        sessiontimmer.innerHTML = String(sessiontime);
    }
});
var sessionplus = document.getElementById("sessionplus");
sessionplus.addEventListener("click", function() {
    var sessiontime = Number(sessiontimmer.innerHTML);
    sessiontime++;
    sessiontimmer.innerHTML = String(sessiontime);
});
var breaktimmer = document.getElementById("breaktimmer");
var breakminus = document.getElementById("break-");
breakminus.addEventListener("click", function() {
    var breaktime = Number(breaktimmer.innerHTML);
    if (breaktime > 1) {
        breaktime--;
        breaktimmer.innerHTML = String(breaktime);
    }
});
var breakplus = document.getElementById("breakplus");
breakplus.addEventListener("click", function() {
    var breaktime = Number(breaktimmer.innerHTML);
    breaktime++;
    breaktimmer.innerHTML = String(breaktime);
});
var min = 0;
var sec = 0;
start.addEventListener("click", sessionstart);

function sessionstart() {
    disableButtons(true);
    sessionnumber++;
    sessionname.innerHTML = "session " + sessionnumber;
    started = true;
    start.innerHTML = "Pause";
    timmer.innerHTML = sessiontimmer.innerHTML + ":00";
    sessionname.innerHTML = "session " + sessionnumber;
    var minsec = timmer.innerHTML.split(":");
    min = Number(minsec[0]);
    sec = Number(minsec[1]);
    var x = setInterval(function() {
        reset.addEventListener("click", function() {
            console.log("sessionreset");
            sessionname.innerHTML = "POMODORO";
            sessionnumber = 0;
            start.innerHTML = "start";
            started = false;
            timmer.innerHTML = sessiontimmer.innerHTML + ":00";
            clearInterval(x);
            disableButtons(false);
        });
        if (sec > 0) {
            sec--;
            timmer.innerHTML = min + ':' + sec;
        } else if (sec === 0 && min > 0) {
            min--;
            sec = 59;
            timmer.innerHTML = min + ":" + sec;
        } else if (sec === 0 && min === 0) {
            clearInterval(x);
            breakstart();
        }
    }, 1000);
}

function breakstart() {
    sessionname.innerHTML = "Break!";
    timmer.innerHTML = breaktimmer.innerHTML + ":00";
    var minsec = timmer.innerHTML.split(":");
    min = Number(minsec[0]);
    sec = Number(minsec[1]);
    var y = setInterval(function() {
        reset.addEventListener("click", function() {
            console.log("breakrest");
            sessionname.innerHTML = "POMODORO";
            disableButtons(false);
            sessionnumber = 0;
            start.innerHTML = "start";
            started = false;
            timmer.innerHTML = sessiontimmer.innerHTML + ":00";
            clearInterval(y);
        });
        if (sec > 0) {
            sec--;
            timmer.innerHTML = min + ':' + sec;
        } else if (sec === 0 && min > 0) {
            min--;
            sec = 59;
            timmer.innerHTML = min + ":" + sec;
        } else if (sec === 0 && min === 0) {
            clearInterval(y);
            sessionstart();
        }
    }, 1000);
}

function disableButtons(flag) {
    console.log("dis");
    for (let i = 0; i < buttons.length - 1; i++) {
        buttons[i].disabled = flag;
    }
}