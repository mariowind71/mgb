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
    var natural = $("#natuerlicheZahlen").prop("checked");

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

    var statistic1 = $("<p>", {id: "total", text: "Du hast " + this.round.getCorrectProblemsCount() + " von " + this.round.problemCount + " Aufgaben richtig gerechnet."});
    var statistic2 = $("<p>", {id: "prozentual", text: "Das entspricht " + Math.round(this.round.getCorrectProblemsCount() / this.round.problemCount * 1000) / 10 + "%."});
    var statistic3 = $("<p>", {id: "verbrauchteZeit", text: "Dafür hast du genau  " + Math.round(this.round.getTimeElapsed() * 10) / 10 + " Sekunden benötigt."});

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
        var currentProblem = this.round.getCurrentProblem();
        var currentAnswer = currentProblem.answer;

        if (!isNaN(parseFloat(pressedButton.value)) && isFinite(pressedButton.value)) {
            if (currentAnswer === null) {
                currentAnswer = pressedButton.value;
            } else {
                var tmpAnswerNums = currentAnswer === "-" ? "" : Math.abs(parseInt(currentAnswer)).toString();
                if (currentProblem.missing === 1 && tmpAnswerNums.length < 2) {
                    currentAnswer += "" + pressedButton.value;
                } else if (currentProblem.missing === 2 && tmpAnswerNums.length < 2) {
                    currentAnswer += "" + pressedButton.value;
                } else if (currentProblem.missing === 3 && tmpAnswerNums.length < 3) {
                    currentAnswer += "" + pressedButton.value;
                }

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
                    } else {
                        currentAnswer = "-" + currentAnswer;
                    }
                }
            }
        }

        this.round.getCurrentProblem().answer = currentAnswer;

        this.renderDisplay();
    }
};

Icc.prototype.renderAnswer = function() {
    $("#status-text").css("font-size", "22px");
    var currentProblem = this.round.getCurrentProblem();

    currentProblem.timeElapsed = (300 - $("#bar-timeleft").height()) / 300 * 5 * slider2.value;


    if (currentProblem.isCorrect()) {
        this.animateMascot("happy");
        this.animateMissingField();
        this.status.typeText("normal", "green", "Ja! Ja! Ja! Ja! Das ist genau richtig! Super!!!!! Das ist ja sensationell!!! " + currentProblem.toString());

        this.addRightWrongBarSegment("green");
    } else {
        this.animateMascot("sad");
        this.animateMissingField();
        this.status.typeText("slow", "red", "Nein! Nein!! Nein!!! Nein!!!! Das ist leider falsch!!!!! Hier ist die Berichtigung: " + currentProblem.toString());

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
    var $missingField = $("#solution" + currentProblem.missing);
    var fieldColor = currentProblem.isCorrect() ? "green" : "red";

    $missingField.css("background", fieldColor);
    $missingField.text(currentProblem.getMissingValue());
    if (currentProblem.missing === 2) {
        if (currentProblem.getMissingValue() < 0) {
            $missingField.text("(" + $missingField.text() + ")");
        }
    }

    if (currentProblem.isCorrect()) {
        $missingField.animate({opacity: '1'}, "fast");
        setTimeout(function () {
            $missingField.animate({opacity: '0'}, "fast");
        }, 500);
    } else {
        $missingField.animate({opacity: '1'}, "slow");
        $missingField.animate({opacity: '0'}, "slow");
        $missingField.animate({opacity: '1'}, "slow");
        $missingField.animate({opacity: '0'}, "slow");
        $missingField.animate({opacity: '1'}, "slow");
        setTimeout(function () {
            $missingField.animate({opacity: '0'}, "slow");
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
    this.renderDisplay();
    this.animateTime(slider2.value * 1000);
};

Icc.prototype.showNextProblem = function() {
    this.round.nextProblem();
    this.renderDisplay();
    this.animateTime(slider2.value * 1000);
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
            $("#z1-0").attr("src", oneString.charAt(0) === "-" ? "pic/minus_k.png" : blankImage).css("display", "block");
            $("#z1-1").attr("src", "pic/d" + oneString.charAt(1) + ".png").css("display", "block");
            $("#z1-2").attr("src", "pic/d" + oneString.charAt(2) + ".png").css("display", "block");
            break;
        case 2:
            $("#z1-0").attr("src", blankImage).css("display", "block");
            $("#z1-1").attr("src", oneString.charAt(0) === "-" ? "pic/minus_k.png" : "pic/d" + oneString.charAt(0) + ".png").css("display", "block");
            $("#z1-2").attr("src", "pic/d" + oneString.charAt(1) + ".png").css("display", "block");
            break;
        case 1:
            $("#z1-0").attr("src", blankImage).css("display", "block");
            $("#z1-1").attr("src", blankImage).css("display", "block");
            $("#z1-2").attr("src", oneString.charAt(0) === "-" ? "pic/minus_k.png" : "pic/d" + oneString.charAt(0) + ".png").css("display", "block");
            break;
    }


    var twoString = currentProblem.two.toString();
    if (currentProblem.missing === 2) {
        twoString = currentProblem.answer === null ? "" : currentProblem.answer;
    }

    switch (twoString.length) {
        case 3:
            $("#z2-0").attr("src", twoString.charAt(0) === "-" ? ("pic/minus_k.png") : blankImage).css("display", "block");
            $("#z2-1").attr("src", "pic/d" + twoString.charAt(1) + ".png").css("display", "block");
            $("#z2-2").attr("src", "pic/d" + twoString.charAt(2) + ".png").css("display", "block");
            break;
        case 2:
            $("#z2-0").attr("src", blankImage).css("display", "block");
            $("#z2-1").attr("src", twoString.charAt(0) === "-" ? "pic/minus_k.png" : "pic/d" + twoString.charAt(0) + ".png").css("display", "block");
            $("#z2-2").attr("src", "pic/d" + twoString.charAt(1) + ".png").css("display", "block");
            break;
        case 1:
            $("#z2-0").attr("src", blankImage).css("display", "block");
            $("#z2-1").attr("src", blankImage).css("display", "block");
            $("#z2-2").attr("src", twoString.charAt(0) === "-" ? "pic/minus_k.png" : "pic/d" + twoString.charAt(0) + ".png").css("display", "block");
            break;
    }

    var klammer = $("#klammer_auf,#klammer_zu");
    klammer.css("width", "0px");
    if (twoString.startsWith("-")) {
        klammer.animate({width: '9px'}, "fast");
    }

    var solutionString = currentProblem.solution.toString();
    if (currentProblem.missing === 3) {
        solutionString = currentProblem.answer === null ? "" : currentProblem.answer;
    }

    switch (solutionString.length) {

        case 4:
            $("#z3-0").attr("src", solutionString.charAt(0) === "-" ? "pic/minus_k.png" : blankImage).css("display", "block");
            $("#z3-1").attr("src", "pic/d" + solutionString.charAt(1) + ".png").css("display", "block");
            $("#z3-2").attr("src", "pic/d" + solutionString.charAt(2) + ".png").css("display", "block");
            $("#z3-3").attr("src", "pic/d" + solutionString.charAt(3) + ".png").css("display", "block");
            break;
        case 3:
            $("#z3-0").attr("src", blankImage).css("display", "block");
            $("#z3-1").attr("src", solutionString.charAt(0) === "-" ? "pic/minus_k.png" : "pic/d" + solutionString.charAt(0) + ".png").css("display", "block");
            $("#z3-2").attr("src", "pic/d" + solutionString.charAt(1) + ".png").css("display", "block");
            $("#z3-3").attr("src", "pic/d" + solutionString.charAt(2) + ".png").css("display", "block");
            break;
        case 2:
            $("#z3-0").attr("src", blankImage).css("display", "block");
            $("#z3-1").attr("src", blankImage).css("display", "block");
            $("#z3-2").attr("src", solutionString.charAt(0) === "-" ? "pic/minus_k.png" : "pic/d" + solutionString.charAt(0) + ".png").css("display", "block");
            $("#z3-3").attr("src", "pic/d" + solutionString.charAt(1) + ".png").css("display", "block");
            break;
        case 1:
            $("#z3-0").attr("src", blankImage).css("display", "block");
            $("#z3-1").attr("src", blankImage).css("display", "block");
            $("#z3-2").attr("src", blankImage).css("display", "block");
            $("#z3-3").attr("src", solutionString.charAt(0) === "-" ? "pic/minus_k.png" : "pic/d" + solutionString.charAt(0) + ".png").css("display", "block");
            break;
    }

};