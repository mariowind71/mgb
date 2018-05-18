$(function () {

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
};

slider2.oninput = function () {
    output2.innerHTML = 5 * this.value;
    gesamt.innerHTML = 10 * slider1.value * 5 * slider2.value;
};

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("Menu_oeffnen");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
/* Full Page Tabs */