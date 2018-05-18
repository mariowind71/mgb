/* Full Page Tabs */
function openPage(pageName, elmnt, color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

var slider1 = document.getElementById("SL_AnzahlAufgaben");
var output1 = document.getElementById("AnzahlAufgaben");
slider2 = document.getElementById("SL_ZeitproAufgabe");
var output2 = document.getElementById("ZeitproAufgabe");
var gesamt = document.getElementById("Gesamtzeit");

output1.innerHTML = 10 * slider1.value; // Display the default slider value
output2.innerHTML = 5 * slider2.value; // Display the default slider value
gesamt.innerHTML = 10 * slider1.value * 5 * slider2.value;

// Update the current slider value (each time you drag the slider handle)
slider1.oninput = function () {
    output1.innerHTML = 10 * this.value;

    gesamt.innerHTML = 10 * slider1.value * 5 * slider2.value;
}

slider2.oninput = function () {
    output2.innerHTML = 5 * this.value;
    gesamt.innerHTML = 10 * slider1.value * 5 * slider2.value;
}

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("Menu_oeffnen");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
/* Full Page Tabs */

function Icc() {
    this.status = new Status();
    this.problem = new Problem();
    this.round = null;
    this.addEventHandlers();
    this.init();
}

Icc.prototype.init = function() {

    $("#bar-timeleft").css("backgroundColor", "green");
    $("#bar-timeleft").css("height", "300");
    $("#bar-timeleft").css("top", "0");

    $("#results").css("visibility", "hidden");
    $("#percentage-right").css("height", "0");
    $("#percentage-wrong").css("height", "0");
    $("#bar-right-wrong").empty();

    var blankImg = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    $('#z1-0').attr("src", blankImg);
    $('#z1-1').attr("src", blankImg);
    $('#z1-2').attr("src", "pic/d1.png");
    $('#operator').attr("src", "pic/plus_k.png");
    $('#klammer_auf').attr("src", "pic/klammerauf.png");
    $('#z2-0').attr("src", blankImg);
    $('#z2-1').attr("src", blankImg);
    $('#z2-2').attr("src", "pic/d1.png");
    $('#klammer_zu').attr("src", "pic/klammerzu.png");
    $('#gl').attr("src", "pic/gl.png");
    $('#z3-0').attr("src", blankImg);
    $('#z3-1').attr("src", blankImg);
    $('#z3-2').attr("src", blankImg);
    $('#z3-3').attr("src", "pic/d2.png");

    $("#klammer_auf").hide();
    $("#klammer_zu").hide();
};

Icc.prototype.startRound = function() {
    var timePerProblem = 5 * slider2.value;
    var problemCount = 10 * slider1.value;
    var plusminus = $("#plusminus").is(":checked");
    var multiplydivide = $("#maldurch").is(":checked");
    var natural = $("#ganzeZahlen").is(":checked");

    this.round = new Round(timePerProblem, problemCount, plusminus, multiplydivide, natural);
    this.showProblem();
};

Icc.prototype.nextRound = function() {

    this.init();

    $("#status-text").css("font-size", "18px");
    this.status.typeText("normal", "black", "Nächste Runde! Klick mich und es geht von vorne los. Vielleicht willst du ja auch die Einstellungen (Aufgabenart, Zeitvorgabe, Anzahl der Aufgaben ändern? Schau doch mal im Menu über mir nach!");

};

Icc.prototype.addEventHandlers = function() {
    $('#start').on("click", this.closeWelcomeScreen.bind(this));
    $('#icc').on("click", this.startRound.bind(this));
    $('#results').on("click", this.nextRound.bind(this));
    $("#btn-solve").on("click", this.solve.bind(this));
    $("#numberpad .btn-calc").on("click", this.buttonPressed.bind(this));
};

Icc.prototype.closeWelcomeScreen = function() {
    $("#start").remove();
    this.status.typeText("normal", "black", "Herzlich willkommen! Ick bin Icc. Das bedeutet: I can calculate!!! Wir trainieren hier das schnelle Kopfrechnen. Klick mich und es geht los. Klick den Stempel und ich sage dir, ob du richtig gerechnet hast!");
};

Icc.prototype.animateTime = function(milliseconds) {
    var that = this;
    var $bar = $("#bar-timeleft");
    $bar.css("backgroundColor", "green");
    $bar.css("height", "300");
    $bar.css("top", "0");
    $bar.animate({
        backgroundColor: "#80ff00",
        height: 240,
        top: '+=60'
    }, milliseconds).animate({
        backgroundColor: "#ffff00",
        height: 180,
        top: '+=60'
    }, milliseconds).animate({
        backgroundColor: "#ff8000",
        height: 120,
        top: '+=60'
    }, milliseconds).animate({
        backgroundColor: "#ff0000",
        height: 60,
        top: '+=60'
    }, milliseconds).animate({
        backgroundColor: "#aa0000",
        height: 0,
        top: '+=60'
    }, milliseconds, function () {
        that.solve();
    });
};

Icc.prototype.showResults = function() {

    var statistic1 = $("<p>", {id: "total", text: "Du hast " + icc.round.getCorrectProblemsCount() + " von " + icc.round.problemCount + " Aufgaben richtig gerechnet."});
    var statistic2 = $("<p>", {id: "prozentual", text: "Das entspricht " + Math.round(icc.round.getCorrectProblemsCount() / icc.round.problemCount * 1000) / 10 + "%."});
    var statistic3 = $("<p>", {id: "verbrauchteZeit", text: "Dafür hast du genau  " + Math.round(this.round.timeElapsed * 10) / 10 + " Sekunden benötigt."});

    $("#statistics").empty().append([statistic1, statistic2, statistic3]);
    $("#results").css("visibility", "visible");
};

Icc.prototype.solve = function () {
    $("#bar-timeleft").stop(true);
    this.renderAnswer();
    var that = this;

    if (this.round.isOver()) {
        this.showResults();
    } else {
        var pause = this.round.getCurrentProblem().isCorrect() ? 1500 : 5000;
        setTimeout(function () {
            that.showNextProblem();
        }, pause);
    }

};

Icc.prototype.buttonPressed = function(event) {
    var pressedButton = event.currentTarget;

    if ($("#sound").is(":checked")) {
        $('#audiofile2')[0].play();
    }

    if (this.round !== null) {
        var currentAnswer = this.round.getCurrentProblem().answer;

        if (isNumeric(pressedButton.value)) {
            if (currentAnswer === null) {
                currentAnswer = pressedButton.value;
            } else {
                currentAnswer += "" + pressedButton.value;
            }
        } else {
            if (pressedButton.value === "c") {
                currentAnswer = null;
            } else if (pressedButton.value === "+-") {
                if (currentAnswer === null) {
                    currentAnswer = "-";
                } else {
                    if (currentAnswer.charAt(0) === "-") {
                        currentAnswer = currentAnswer.substr(1);
                    }
                }
            }
        }

        icc.round.getCurrentProblem().answer = currentAnswer;

        icc.renderDisplay();
    }
};

Icc.prototype.renderAnswer = function() {
    $("#status-text").css("font-size", "22px");
    var currentProblem = icc.round.getCurrentProblem();

    currentProblem.timeElapsed = (300 - $("#bar-timeleft").height()) / 300 * 5 * slider2.value;
    this.round.timeElapsed += currentProblem.timeElapsed;

    if (currentProblem.isCorrect()) {
        this.animateMascot("happy");
        icc.animateMissingField();
        icc.status.typeText("normal", "green", "Ja! Ja! Ja! Ja! Das ist genau richtig! Super!!!!! Das ist ja sensationell!!! " + currentProblem.toString());

        this.addRightWrongBarSegment("green");
    } else {
        this.animateMascot("sad");
        icc.animateMissingField();
        icc.status.typeText("slow", "red", "Nein! Nein!! Nein!!! Nein!!!! Das ist leider falsch!!!!! Hier ist die Berichtigung: " + currentProblem.toString());

        this.addRightWrongBarSegment("red");
    }

    this.animateAccuracyBar();
};

Icc.prototype.animateMascot = function(mood) {
    var img = $("#icc");

    switch(mood) {
        case "sad":
            img.attr("src", "pic/icc_traurig.png");
            break;
        case "happy":
            img.attr("src", "pic/icc.png");
            break;
    }

    for (var i = 0; i < 3; i++) {
        img.animate({top: '+=40px', height: '80px'}, "fast");
        img.animate({top: '-=40px', height: '120px'}, "fast");
    }
};

Icc.prototype.animateMissingField = function () {
    var currentProblem = this.round.getCurrentProblem();
    var missingField = $("#solution" + currentProblem.missing);
    var fieldColor = currentProblem.isCorrect() ? "green" : "red";

    $(missingField).css("background", fieldColor);
    $(missingField).text(currentProblem.getMissingValue());
    if (currentProblem.missing === 2) {
        if (currentProblem.getMissingValue() < 0) {
            $(missingField).text("(" + $(missingField).text + ")");
        }
    }

    if (currentProblem.isCorrect()) {
        $(missingField).animate({opacity: '1'}, "fast");
        setTimeout(function () {
            $(missingField).animate({opacity: '0'}, "fast");
        }, 500);
    } else {
        $(missingField).animate({opacity: '1'}, "slow");
        $(missingField).animate({opacity: '0'}, "slow");
        $(missingField).animate({opacity: '1'}, "slow");
        $(missingField).animate({opacity: '0'}, "slow");
        $(missingField).animate({opacity: '1'}, "slow");
        setTimeout(function () {
            $(missingField).animate({opacity: '0'}, "slow");
        }, 4000);
    }
};

Icc.prototype.addRightWrongBarSegment = function(color) {
    var barHeight = 150 / this.round.problemCount;
    var barSegment = document.createElement("div");
    barSegment.style = "position: absolute;width:40px;";
    barSegment.style.background = color;
    barSegment.style.height = barHeight + "px";
    barSegment.style.bottom = (this.round.problemIndex) * barHeight + "px";
    document.getElementById("bar-right-wrong").appendChild(barSegment);
};

Icc.prototype.animateAccuracyBar = function() {
    $("#percentage-right").animate({height: this.round.getCorrectProblemsCount() / (this.round.problemIndex + 1) * 150}, "slow");
    $("#percentage-wrong").animate({height: ((this.round.problemIndex + 1) - this.round.getCorrectProblemsCount()) / (this.round.problemIndex + 1) * 150}, "slow");
};

Icc.prototype.showProblem = function() {
    var problem = this.round.getCurrentProblem();
    this.renderDisplay();
    icc.animateTime(slider2.value * 1000);
};

Icc.prototype.showNextProblem = function() {
    var problem = this.round.getNextProblem();
    this.renderDisplay();
    icc.animateTime(slider2.value * 1000);
};

Icc.prototype.renderDisplay = function() {

    var currentProblem = this.round.getCurrentProblem();
    var blankImage = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

    $("#z1-0").attr("src", blankImage);
    $("#z1-1").attr("src", blankImage);
    $("#z1-2").attr("src", blankImage);

    $("#z2-0").attr("src", blankImage);
    $("#z2-1").attr("src", blankImage);
    $("#z2-2").attr("src", blankImage);

    $("#z3-0").attr("src", blankImage);
    $("#z3-1").attr("src", blankImage);
    $("#z3-2").attr("src", blankImage);
    $("#z3-3").attr("src", blankImage);

    $("#operator").attr("src", {"+": "pic/plus_k.png", "-": "pic/minus_k.png", "*": "pic/mal_k.png", "/": "pic/durch_k.png"}[currentProblem.operator]);

    var oneString = currentProblem.one.toString();
    if (currentProblem.missing === 1) {
        oneString = currentProblem.answer === null ? "" : currentProblem.answer;
    }

    switch (oneString.length) {
        case 3:
            $("#z1-0").attr("src", oneString.charAt(0) === "-" ? "pic/minus_k.png" : blankImage);
            $("#z1-1").attr("src", "pic/d" + oneString.charAt(1) + ".png");
            $("#z1-2").attr("src", "pic/d" + oneString.charAt(2) + ".png");
            break;
        case 2:
            $("#z1-0").attr("src", blankImage);
            $("#z1-1").attr("src", oneString.charAt(0) === "-" ? "pic/minus_k.png" : "pic/d" + oneString.charAt(0) + ".png");
            $("#z1-2").attr("src", "pic/d" + oneString.charAt(1) + ".png");
            break;
        case 1:
            $("#z1-0").attr("src", blankImage);
            $("#z1-1").attr("src", blankImage);
            $("#z1-2").attr("src", "pic/d" + oneString.charAt(0) + ".png");
            break;
    }


    var twoString = currentProblem.two.toString();
    if (currentProblem.missing === 2) {
        twoString = currentProblem.answer === null ? "" : currentProblem.answer;
    }

    switch (twoString.length) {
        case 3:
            $("#z2-0").attr("src", twoString.charAt(0) === "-" ? "pic/minus_k.png" : blankImage);
            $("#z2-1").attr("src", "pic/d" + twoString.charAt(1) + ".png");
            $("#z2-2").attr("src", "pic/d" + twoString.charAt(2) + ".png");
            break;
        case 2:
            $("#z2-0").attr("src", blankImage);
            $("#z2-1").attr("src", twoString.charAt(0) === "-" ? "pic/minus_k.png" : "pic/d" + twoString.charAt(0) + ".png");
            $("#z2-2").attr("src", "pic/d" + twoString.charAt(1) + ".png");
            break;
        case 1:
            $("#z2-0").attr("src", blankImage);
            $("#z2-1").attr("src", blankImage);
            $("#z2-2").attr("src", "pic/d" + twoString.charAt(0) + ".png");
            break;
    }

    var solutionString = currentProblem.solution.toString();
    if (currentProblem.missing === 3) {
        solutionString = currentProblem.answer === null ? "" : currentProblem.answer;
    }

    switch (solutionString.length) {

        case 4:
            $("#z3-0").attr("src", solutionString.charAt(0) === "-" ? "pic/minus_k.png" : blankImage);
            $("#z3-1").attr("src", "pic/d" + solutionString.charAt(1) + ".png");
            $("#z3-2").attr("src", "pic/d" + solutionString.charAt(2) + ".png");
            $("#z3-3").attr("src", "pic/d" + solutionString.charAt(3) + ".png");
            break;
        case 3:
            $("#z3-0").attr("src", solutionString.charAt(0) === "-" ? "pic/minus_k.png" : blankImage);
            $("#z3-1").attr("src", "pic/d" + solutionString.charAt(1) + ".png");
            $("#z3-2").attr("src", "pic/d" + solutionString.charAt(2) + ".png");
            break;
        case 2:
            $("#z3-0").attr("src", blankImage);
            $("#z3-1").attr("src", solutionString.charAt(0) === "-" ? "pic/minus_k.png" : "pic/d" + solutionString.charAt(0) + ".png");
            $("#z3-2").attr("src", "pic/d" + solutionString.charAt(1) + ".png");
            break;
        case 1:
            $("#z3-0").attr("src", blankImage);
            $("#z3-1").attr("src", blankImage);
            $("#z3-2").attr("src", "pic/d" + solutionString.charAt(0) + ".png");
            break;
    }

};

$(document).ready(function () {
    $("#btn-plusminus").click(function () {
        var klammer = $("#klammer_auf,#klammer_zu");
        if (zuratendeZahl == 1) {
            if ($("#z1-0").is(':hidden')) {				//if (vorzeichen=="-"){
                $("#z1-0").show();
            } else {
                $("#z1-0").hide();
            }
        }
        if (zuratendeZahl == 2) {
            if ($("#z2-0").is(':hidden')) {				//if (vorzeichen=="-"){
                $("#z2-0").show();
                klammer.animate({width: '9px'}, "fast");
            } else {
                $("#z2-0").hide();
                klammer.animate({width: '0px'}, "fast");
            }
        }
        if (zuratendeZahl == 3) {
            if ($("#z3-0").is(':hidden')) {				//if (vorzeichen=="-"){
                $("#z3-0").show();
            } else {
                $("#z3-0").hide();
            }
        }
    });

    $("#plusminus").change(function () {
        if (!this.checked) {
            $('#maldurch').attr('checked', !this.checked);				//FUNKTIONIERT NICHT!!!
        }
    });
    $("#maldurch").change(function () {
        if (!this.checked) {
            $('#plusminus').attr('checked', !this.checked);
        }
    });
});

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}