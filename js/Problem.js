function Problem(one, two, operator, solution, missing) {
    this.one = one;
    this.two = two;
    this.operator = operator;
    this.solution = solution;
    this.missing = missing;
    this.answer = null;
}

Problem.prototype.isCorrect = function () {
    if (this.answer !== null) {
        return [this.one.toString(), this.two.toString(), this.solution.toString()][this.missing - 1] === this.answer.toString();
    } else {
        return false;
    }
};

Problem.prototype.toString = function () {
    var problemString = this.one + " " + this.operator + " " + this.two + " = " + this.solution;
    return problemString.replace("/", ":").replace("*", "x")
};
