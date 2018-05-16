function Status() {
    this.element = $("#status");
    this.textElement = $("#status-text");
    this.typeWriter = new TypeWriter();
    this.typeWriter.element = this.textElement[0];
    return this;
}

Status.prototype.typeText = function (speed, color, text) {
    this.textElement.empty();
    this.textElement.css("color", color);
    this.typeWriter.speed = this.getSpeed(speed);
    this.typeWriter.text = text;
    this.typeWriter.type();
};

Status.prototype.getSpeed = function(speed) {
    switch (speed) {
        case "slow":
            return 10;
        case "normal":
            return 5;
        case "fast":
            return 2;
        default:
            return 5;
    }
};