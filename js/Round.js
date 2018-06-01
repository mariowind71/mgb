function Round(time, problemCount, plusminus, multiplydivide, natural) {
    this.time = time;
    this.problemCount = problemCount;
    this.problemList = [];
    this.problemIndex = 0;
    this.plusminus = plusminus;
    this.multiplydivide = multiplydivide;
    this.natural = natural;

    this.generateProblems();
}

Round.prototype.generateProblems = function () {
    for (var i = 0; i < this.problemCount; i++) {

        var isPlusMinus = this.plusminus && this.getRandomInt(1,2) === 1;
        if (isPlusMinus) {
            this.problemList.push(this.getPlusminusProblem());
        } else {
            this.problemList.push(this.getMultiplyDivideProblem());
        }

    }
};

Round.prototype.getCurrentProblem = function() {
    return this.problemList[this.problemIndex];
};

Round.prototype.nextProblem = function () {
    if (!this.isOver()) {
        this.problemIndex++;
    }
};

Round.prototype.getTimeElapsed = function() {
    var sum = 0;
    this.problemList.forEach(function (problem) {
       sum += problem.timeElapsed;
    });
    return sum;
};

Round.prototype.getCorrectProblemsCount = function() {
    var correctlySolved = 0;
    for (var i = 0; i <= this.problemIndex;i++) {
        if (this.problemList[i].isCorrect()) {
            correctlySolved++;
        }
    }
    return correctlySolved;
};

Round.prototype.isOver = function() {
    return this.problemIndex + 1 === this.problemCount;
};

Round.prototype.getPlusminusProblem = function() {
    var min = this.getLowerLimit(-99);
    var one = this.getRandomInt(min, 99);
    var two = this.getRandomInt(min, one);

    var operator = ['+', '-'][this.getRandomInt(0, 1)];
    var solution = new Function('return ' + one + '' + operator + '(' + two + ')')() + "";

    if (solution < -100 || solution > 100 || !this.isInteger(solution)) {
        return this.getPlusminusProblem();
    }

    var missing = this.getRandomInt(1, 3);
    return new Problem(one, two, operator, solution, missing);
};

Round.prototype.getMultiplyDivideProblem = function() {
    var min = this.getLowerLimit(-10);
    var one = this.getRandomInt(min, 10);
    var two = this.getRandomInt(min, 10);
    var operator = ['*', '/'][this.getRandomInt(0, 1)];
    var solution = new Function('return ' + one + '' + operator + '(' + two + ')')() + "";

    if (solution < -100 || solution > 100 || !this.isInteger(solution)) {
        return this.getMultiplyDivideProblem();
    }

    var missing = this.getRandomInt(1, 3);
    return new Problem(one, two, operator, solution, missing);
};

Round.prototype.getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

Round.prototype.isInteger = function (number) {
    return number % 1 === 0;
};

Round.prototype.getLowerLimit = function(min) {
    if (this.natural) {
        return 1;
    } else {
        return min;
    }
};