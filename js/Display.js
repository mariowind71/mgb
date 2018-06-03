function Display() {
    this.currentProblem = null;
    this.blankImage = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
    this.init();
}

Display.prototype.render = function(problem) {

    this.currentProblem = problem;

    this.clear();
    this.setOperator();

    this.renderFirstSegment();
    this.renderSecondSegment();
    this.renderSolution();

};

Display.prototype.init = function() {
    $('#z1-0').attr("src", this.blankImage);
    $('#z1-1').attr("src", this.blankImage);
    $('#z1-2').attr("src", "pic/d1.png");
    $('#operator').attr("src", "pic/plus_k.png");
    $('#klammer_auf').attr("src", "pic/klammerauf.png");
    $('#z2-0').attr("src", this.blankImage);
    $('#z2-1').attr("src", this.blankImage);
    $('#z2-2').attr("src", "pic/d1.png");
    $('#klammer_zu').attr("src", "pic/klammerzu.png");
    $('#gl').attr("src", "pic/gl.png");
    $('#z3-0').attr("src", this.blankImage);
    $('#z3-1').attr("src", this.blankImage);
    $('#z3-2').attr("src", this.blankImage);
    $('#z3-3').attr("src", "pic/d2.png");

    $("#klammer_auf").hide();
    $("#klammer_zu").hide();
};

Display.prototype.clear = function() {
    $("#z1-0").attr("src", this.blankImage);
    $("#z1-1").attr("src", this.blankImage);
    $("#z1-2").attr("src", this.blankImage);

    $("#operator").attr("src", this.blankImage);

    $("#z2-0").attr("src", this.blankImage);
    $("#z2-1").attr("src", this.blankImage);
    $("#z2-2").attr("src", this.blankImage);

    $("#z3-0").attr("src", this.blankImage);
    $("#z3-1").attr("src", this.blankImage);
    $("#z3-2").attr("src", this.blankImage);
    $("#z3-3").attr("src", this.blankImage);
};

Display.prototype.setOperator = function () {
    $("#operator").attr("src", {"+": "pic/plus_k.png", "-": "pic/minus_k.png", "*": "pic/mal_k.png", "/": "pic/durch_k.png"}[this.currentProblem.operator]);
};

Display.prototype.renderFirstSegment = function () {
    var oneString = this.currentProblem.one.toString();
    if (this.currentProblem.missing === 1) {
        oneString = this.currentProblem.answer === null ? "" : this.currentProblem.answer;
    }

    switch (oneString.length) {
        case 3:
            $("#z1-0").attr("src", oneString.charAt(0) === "-" ? "pic/minus_k.png" : this.blankImage);
            $("#z1-1").attr("src", "pic/d" + oneString.charAt(1) + ".png");
            $("#z1-2").attr("src", "pic/d" + oneString.charAt(2) + ".png");
            break;
        case 2:
            $("#z1-0").attr("src", this.blankImage);
            $("#z1-1").attr("src", oneString.charAt(0) === "-" ? "pic/minus_k.png" : "pic/d" + oneString.charAt(0) + ".png");
            $("#z1-2").attr("src", "pic/d" + oneString.charAt(1) + ".png");
            break;
        case 1:
            $("#z1-0").attr("src", this.blankImage);
            $("#z1-1").attr("src", this.blankImage);
            $("#z1-2").attr("src", oneString.charAt(0) === "-" ? "pic/minus_k.png" : "pic/d" + oneString.charAt(0) + ".png");
            break;
    }
};

Display.prototype.renderSecondSegment = function () {
    var twoString = this.currentProblem.two.toString();
    if (this.currentProblem.missing === 2) {
        twoString = this.currentProblem.answer === null ? "" : this.currentProblem.answer;
    }

    switch (twoString.length) {
        case 3:
            $("#z2-0").attr("src", twoString.charAt(0) === "-" ? ("pic/minus_k.png") : this.blankImage);
            $("#z2-1").attr("src", "pic/d" + twoString.charAt(1) + ".png");
            $("#z2-2").attr("src", "pic/d" + twoString.charAt(2) + ".png");
            break;
        case 2:
            $("#z2-0").attr("src", this.blankImage);
            $("#z2-1").attr("src", twoString.charAt(0) === "-" ? "pic/minus_k.png" : "pic/d" + twoString.charAt(0) + ".png");
            $("#z2-2").attr("src", "pic/d" + twoString.charAt(1) + ".png");
            break;
        case 1:
            $("#z2-0").attr("src", this.blankImage);
            $("#z2-1").attr("src", this.blankImage);
            $("#z2-2").attr("src", twoString.charAt(0) === "-" ? "pic/minus_k.png" : "pic/d" + twoString.charAt(0) + ".png");
            break;
    }

    var klammer = $("#klammer_auf,#klammer_zu");
    klammer.css("width", "0px");
    if (twoString.startsWith("-")) {
        klammer.animate({width: '9px'}, "fast");
    }
};

Display.prototype.renderSolution = function() {
    var solutionString = this.currentProblem.solution.toString();
    if (this.currentProblem.missing === 3) {
        solutionString = this.currentProblem.answer === null ? "" : this.currentProblem.answer;
    }

    switch (solutionString.length) {

        case 4:
            $("#z3-0").attr("src", solutionString.charAt(0) === "-" ? "pic/minus_k.png" : this.blankImage);
            $("#z3-1").attr("src", "pic/d" + solutionString.charAt(1) + ".png");
            $("#z3-2").attr("src", "pic/d" + solutionString.charAt(2) + ".png");
            $("#z3-3").attr("src", "pic/d" + solutionString.charAt(3) + ".png");
            break;
        case 3:
            $("#z3-0").attr("src", this.blankImage);
            $("#z3-1").attr("src", solutionString.charAt(0) === "-" ? "pic/minus_k.png" : "pic/d" + solutionString.charAt(0) + ".png");
            $("#z3-2").attr("src", "pic/d" + solutionString.charAt(1) + ".png");
            $("#z3-3").attr("src", "pic/d" + solutionString.charAt(2) + ".png");
            break;
        case 2:
            $("#z3-0").attr("src", this.blankImage);
            $("#z3-1").attr("src", this.blankImage);
            $("#z3-2").attr("src", solutionString.charAt(0) === "-" ? "pic/minus_k.png" : "pic/d" + solutionString.charAt(0) + ".png");
            $("#z3-3").attr("src", "pic/d" + solutionString.charAt(1) + ".png");
            break;
        case 1:
            $("#z3-0").attr("src", this.blankImage);
            $("#z3-1").attr("src", this.blankImage);
            $("#z3-2").attr("src", this.blankImage);
            $("#z3-3").attr("src", solutionString.charAt(0) === "-" ? "pic/minus_k.png" : "pic/d" + solutionString.charAt(0) + ".png");
            break;
    }
};

Display.prototype.animateMissingField = function () {
    var $missingField = $("#solution" + this.currentProblem.missing);
    var fieldColor = this.currentProblem.isCorrect() ? "green" : "red";

    $missingField.css("background", fieldColor);
    $missingField.text(this.currentProblem.getMissingValue());
    if (this.currentProblem.missing === 2) {
        if (this.currentProblem.getMissingValue() < 0) {
            $missingField.text("(" + $missingField.text() + ")");
        }
    }

    if (this.currentProblem.isCorrect()) {
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