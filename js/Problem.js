function Problem(one, two, operator, solution, missing) {
    this.one = one;
    this.two = two;
    this.operator = operator;
    this.solution = solution;
    this.missing = missing;
    this.answer = null;
    this.timeElapsed = 0;
}

Problem.prototype.isCorrect = function () {
    if (this.answer !== null) {
        return this.getMissingValue() === this.answer.toString();
    } else {
        return false;
    }
};

Problem.prototype.getMissingValue = function() {
    return [this.one.toString(), this.two.toString(), this.solution.toString()][this.missing - 1];
};

Problem.prototype.toString = function () {
    var problemString = this.one + " " + this.operator + " " + this.two + " = " + this.solution;
    return problemString.replace("/", ":").replace("*", "x")
};
