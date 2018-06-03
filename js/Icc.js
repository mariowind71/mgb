function Icc() {
    this.status = new Status();
    this.problem = new Problem();
    this.display = new Display();
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

        currentProblem.answer = currentAnswer;

        this.display.render(currentProblem);
    }
};

Icc.prototype.renderAnswer = function() {
    $("#status-text").css("font-size", "22px");
    var currentProblem = this.round.getCurrentProblem();

    currentProblem.timeElapsed = (300 - $("#bar-timeleft").height()) / 300 * 5 * slider2.value;


    if (currentProblem.isCorrect()) {
        this.animateMascot("happy");
        this.display.animateMissingField();
        this.status.typeText("normal", "green", "Ja! Ja! Ja! Ja! Das ist genau richtig! Super!!!!! Das ist ja sensationell!!! " + currentProblem.toString());

        this.addRightWrongBarSegment("green");
    } else {
        this.animateMascot("sad");
        this.display.animateMissingField();
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
    this.display.render(this.round.getCurrentProblem());
    this.animateTime(slider2.value * 1000);
};

Icc.prototype.showNextProblem = function() {
    this.round.nextProblem();
    this.display.render(this.round.getCurrentProblem());
    this.animateTime(slider2.value * 1000);
};