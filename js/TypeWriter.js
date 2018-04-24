function TypeWriter() {
    this.element = null;
    this.text = "";
    this.textposition = 0;
    this.speed = 5;
}

TypeWriter.prototype.type = function() {
    if (this.textposition < this.text.length) {
        this.element.innerHTML += this.text.charAt(this.textposition);
        if (this.isSoundEnabled()) {
            $("#audiofile")[0].play(); //Der Index 0 ist in diesem Fall das Element im DOM, das Jquery gekapselt hat.
        }
        this.textposition++;
        setTimeout(TypeWriter.prototype.type.bind(this), this.speed);
    }
};

TypeWriter.prototype.isSoundEnabled = function() {
    return $("#sound").is(":checked");
};