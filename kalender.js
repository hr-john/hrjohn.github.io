var cal = {
  // (A) PROPERTIES
  mName : ["Jaan", "Veeb", "Märts", "Apr", "Mai", "Juuni", "Juuli", "Aug", "Sep", "Okt", "Nov", "Dets"], // Month Names
  data : null, // Events for the selected period
  sDay : 14, // Current selected day
  sMth : 3, // Current selected month
  sYear : 2021, // Current selected year
  sMon : true, // Week start on Monday?

  // (B) DRAW CALENDAR FOR SELECTED MONTH
  list : function () {
    // (B1) BASIC CALCULATIONS - DAYS IN MONTH, START + END DAY
    // Note - Jan is 0 & Dec is 11 in JS.
    // Note - Sun is 0 & Sat is 6
    cal.sMth = parseInt(document.getElementById("cal-mth").value); // selected month
    cal.sYear = parseInt(document.getElementById("cal-yr").value); // selected year
    var daysInMth = new Date(cal.sYear, cal.sMth+1, 0).getDate(), // number of days in selected month
        startDay = new Date(cal.sYear, cal.sMth, 1).getDay(), // first day of the month
        endDay = new Date(cal.sYear, cal.sMth, daysInMth).getDay(); // last day of the month

   // (B2) LOAD DATA FROM LOCALSTORAGE
   // (B3) DRAWING CALCULATIONS
    // Determine the number of blank squares before start of month
    var squares = [];
    if (cal.sMon && startDay != 1) {
      var blanks = startDay==0 ? 7 : startDay ;
      for (var i=1; i<blanks; i++) { squares.push("b"); }
    }
    if (!cal.sMon && startDay != 0) {
      for (var i=0; i<startDay; i++) { squares.push("b"); }
    }

    // Populate the days of the month
    for (var i=1; i<=daysInMth; i++) { squares.push(i); }

    // Determine the number of blank squares after end of month
    if (cal.sMon && endDay != 0) {
      var blanks = endDay==6 ? 1 : 7-endDay;
      for (var i=0; i<blanks; i++) { squares.push("b"); }
    }
    if (!cal.sMon && endDay != 6) {
      var blanks = endDay==0 ? 6 : 6-endDay;
      for (var i=0; i<blanks; i++) { squares.push("b"); }
    }

    // (B4) DRAW HTML CALENDAR
    // Container & Table
    var container = document.getElementById("cal-container"),
        cTable = document.createElement("table");
    cTable.id = "calendar";
    container.innerHTML = "";
    container.appendChild(cTable);

    // First row - Days
    var cRow = document.createElement("tr"),
        cCell = null,
//        days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
        days = ["P", "E", "T", "K", "N", "R", "L"];
        if (cal.sMon) { days.push(days.shift()); }
    for (var d of days) {
      cCell = document.createElement("td");
      cCell.innerHTML = d;
      cRow.appendChild(cCell);
    }
    cRow.classList.add("head");
    cTable.appendChild(cRow);

    // Days in Month
    var total = squares.length;
    cRow = document.createElement("tr");
    cRow.classList.add("day");
    for (var i=0; i<total; i++) {
      cCell = document.createElement("td");
      if (squares[i]=="b") { cCell.classList.add("blank"); }
      else {
        cCell.innerHTML = "<div class='dd'>"+squares[i]+"</div>";
        cCell.addEventListener("click", function (){
          var vaeg = new Date(cal.sYear,cal.sMth,this.getElementsByClassName("dd")[0].innerHTML);
          kp = vaeg ;
          document.getElementById("cal-day").innerHTML = this.getElementsByClassName("dd")[0].innerHTML ;
 //        alert ( "! " + kp + " !" + this.getElementsByClassName("dd")[0].innerHTML) ; 
        });
      }
      cRow.appendChild(cCell);
       if (i!=0 && (i+1)%7==0) {
         cTable.appendChild(cRow);
         cRow = document.createElement("tr");
         cRow.classList.add("day");
       }
    }
  }

};

// (G) INIT - DRAW MONTH & YEAR SELECTOR
window.addEventListener("load", function () {
  // (G1) DATE NOW
  var now = new Date(),
      nowMth = now.getMonth(),
      nowYear = parseInt(now.getFullYear());

  // (G2) APPEND MONTHS
  var month = document.getElementById("cal-mth");
  for (var i = 0; i < 12; i++) {
    var opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = cal.mName[i];
    if (i==nowMth) { opt.selected = true; }
    month.appendChild(opt);
  }

  // (G3) APPEND YEARS
  // Set to 10 years range. Change this as you like.
  var year = document.getElementById("cal-yr");
  for (var i = nowYear-10; i<=nowYear; i++) {
    var opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = i;
    if (i==nowYear) { opt.selected = true; }
    year.appendChild(opt);
  }

  // (G4) START - DRAW CALENDAR
  document.getElementById("cal-set").addEventListener("click", cal.list);
 cal.list();
});
