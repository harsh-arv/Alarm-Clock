var body=document.getElementById('body');
var text = document.getElementById("timer");
var btn = document.getElementById("setAlarm");
var del = document.getElementById("delete");
var clearBtn = document.getElementById("clear");
var hrs = document.getElementById("hours");
var mins = document.getElementById("minutes");
var secs = document.getElementById("seconds");
var amPm = document.getElementById("am_pm");
var list = document.getElementById("lists");
var newAlarm = "00 : 00 : 00";
var weekday = document.getElementById("weekday");
var weekdayList = document.getElementById("weekdayList");
var ringTune = new Audio("ringtune.mp3");

var weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//func to disply the current time on screen
function time() {
  //get object  today's date and time
  var date = new Date();
  var period = "";
 
  //fetch hours from date object
  var hr = date.getHours();
  period = updatePeriod(hr, period); //updating Am/Pm with respect to hours before converting hr into 12hr format
  hr = update(hr); //convert into 12-hr format

  //fetch minutes and seconds from date object
  var min = date.getMinutes();
  var sec = date.getSeconds();

  

  //fetching today's date/month/year
  var todayDate = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getUTCFullYear();

  //updating values below 10
  hr = correction(hr);
  min = correction(min);
  sec = correction(sec);

  ringAlarm(weekDay[date.getDay()], hr, min, sec, period);

  if (todayDate < 10) {
    todayDate = "0" + todayDate;
  }
  if (month < 10) {
    month = "0" + month;
  }
  document.getElementById("date").innerText =
    todayDate + "/" + month + "/" + date.getUTCFullYear();
  text.innerText = hr + " : " + min + " : " + sec + "   " + period;

  weekday.innerText = weekDay[date.getDay()];
}

//to add 0 as prefix on values below 10
function correction(evt) {
  if (evt < 10) {
    evt = "0" + evt;
  }
  return evt;
}
//to convert into 12-hrs format

function update(hr) {
  if (hr >= 12) {
    hr = hr - 12;
  }

  return hr;
}

//func to set Am/Pm
function updatePeriod(hr, period) {
  if (hr > 12) {
    period = "Pm";
  } else {
    period = "Am";
  }
  return period;
}

//making option of select tag 1-60
function setHours() {
  // hrs.options[0]="Enter Hours"
  for (var i = 0; i <= 12; i++) {
    //console.log(hrs);
    if (i < 10) {
      hrs.options[i] = new Option("0" + i);
    } else {
      hrs.options[i] = new Option(i);
    }
  }
}

//making option of select tag 1-60
function setMin() {
  // hrs.options[0]="Enter Hours"
  for (var i = 0; i <= 59; i++) {
    //console.log(hrs);
    if (i < 10) {
      mins.options[i] = new Option("0" + i);
    } else {
      mins.options[i] = new Option(i);
    }
  }
}

//making option of select tag 1-60
function setSec() {
  // hrs.options[0]="Enter Hours"
  for (var i = 0; i <= 59; i++) {
    //console.log(hrs);
    if (i < 10) {
      secs.options[i] = new Option("0" + i);
    } else {
      secs.options[i] = new Option(i);
    }
  }
}

//making option of select tag sunday-saturday
function setWeekDays() {
  for (var i = 0; i < 7; i++) {
    weekdayList.options[i] = new Option(weekDay[i]);
  }
}

var ul = document.getElementById("lists");
var bt = document.getElementById("delete");

//func to set-Alarm
function setAlarm() {
  var localWeekday = weekdayList.options[weekdayList.selectedIndex].value;
  var localhr = hrs.options[hrs.selectedIndex].value;
  var localmin = mins.options[mins.selectedIndex].value;
  var localsec = secs.options[secs.selectedIndex].value;
  var localAmPm = amPm.options[am_pm.selectedIndex].value;

  newAlarm =
    localWeekday +
    " " +
    localhr +
    " : " +
    localmin +
    " : " +
    localsec +
    "   " +
    localAmPm;
  console.log(newAlarm);

  //creating li tag and adding delete button to 1st added list
  var li = document.createElement("li");
  var deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "button-74");

  ul.appendChild(li);
  deleteButton.appendChild(document.createTextNode("Delete"));

  li.appendChild(document.createTextNode(newAlarm));
  li.appendChild(deleteButton).addEventListener("click", removeItem);
}

//loop to add even on each li node
var elements = document.getElementsByClassName("button-74");
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", removeItem);
}

//func to remove the selective alarm
function removeItem() {
  this.parentNode.remove();
}

//logic to ring the alarm
function ringAlarm(weekday, hrs, min, sec, period) {
  var li = document.getElementsByTagName("li");
  for (var i = 0; i < li.length; i++) {
    var globalTime =
      weekday + " " + hrs + " : " + min + " : " + sec + " " + period;
    var alarm = li[i].innerText.replace("Delete", "");
  
    if (globalTime == alarm) {
      // body.addEventListener('onclick', function () {
      //   console.log('eokring');
      //     audio.pause()();
        
      // });

      body.onclick=function(){
        console.log("woeling");
        ringTune.pause()
      }
      console.log('eokring');
      ringTune.play();
      setTimeout(function () {
        alert("Wake Up!!");
      }, 6000);
      
      
    }
  }
}

//updating selection
setHours();
setMin();
setSec();
setWeekDays();

setInterval(time, 1000);

//click event
btn.onclick = setAlarm;
