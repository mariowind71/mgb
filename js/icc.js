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
ZeitproFrage = 10 * this.value;
gesamt.innerHTML = 10 * slider1.value * 5 * slider2.value;

// Update the current slider value (each time you drag the slider handle)
slider1.oninput = function () {
    output1.innerHTML = 10 * this.value;
    FragenAnzahl = 10 * this.value;
    //console.log(Fragenanzahl);
    gesamt.innerHTML = 10 * slider1.value * 5 * slider2.value;
}

slider2.oninput = function () {
    output2.innerHTML = 5 * this.value;
    //ZeitproFrage = 5*this.value;
    //console.log(ZeitproFrage);
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

var typeWriter = new TypeWriter();


$('#start').click(function () {
    $("#start").remove();
    typeWriter.element = document.getElementById("Willkommenstext");
    typeWriter.text = 'Herzlich willkommen! Ick bin Icc. Das bedeutet: I can calculate!!! Wir trainieren hier das schnelle Kopfrechnen. Klick mich und es geht los. Klick den Stempel und ich sage dir, ob du richtig gerechnet hast!';
    typeWriter.type();
});

$('#results').click(function () {
    $("#results").css("visibility", "hidden");
    $("#icc").bind("click", function () {
        Aufgabe_ausgeben();
        $("#icc").unbind("click");
    });
    //$( "#Menu_oeffnen").bind( "click", function() {	modal.style.display = "block"; });			//unbind geht nicht ...
    $("#Menu_oeffnen").css("opacity", "1");
    //$( "#Menu_oeffnen").show();
    $("#percentage-right").css("height", "0");
    $("#percentage-wrong").css("height", "0");
    var element = document.getElementById("bar-accuracy");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    Variablen_initialisieren();
    $("#Willkommenstext").css("color", "black");
    $("#Willkommenstext").css("font-size", "18px");
    $("#Willkommenstext").empty();

    typeWriter.element = document.getElementById("Willkommenstext");
    typeWriter.text = 'Nächste Runde! Klick mich und es geht von vorne los. Vielleicht willst du ja auch die Einstellungen (Aufgabenart, Zeitvorgabe, Anzahl der Aufgaben ändern? Schau doch mal im Menu über mir nach!';
    typeWriter.type();
});


function Zeit_animieren(t) {
    $("#bar-timeleft").css("backgroundColor", "green");
    $("#bar-timeleft").css("height", "300");
    $("#bar-timeleft").css("top", "0");
    $("#bar-timeleft").animate({
        backgroundColor: "#80ff00",
        //color: "#fff",
        height: 240,
        top: '+=60'
    }, t / 5);
    $("#bar-timeleft").animate({
        backgroundColor: "#ffff00",
        //color: "#fff",
        height: 180,
        top: '+=60'
    }, t / 5);
    $("#bar-timeleft").animate({
        backgroundColor: "#ff8000",
        //color: "#fff",
        height: 120,
        top: '+=60'
    }, t / 5);
    $("#bar-timeleft").animate({
        backgroundColor: "#ff0000",
        //color: "#fff",
        height: 60,
        top: '+=60'
    }, t / 5);
    $("#bar-timeleft").animate({
        backgroundColor: "#aa0000",
        //color: "#fff",
        height: 0,
        top: '+=60'
    }, t / 5, function () {
        Rundestarten();
    });
};


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Variablen_initialisieren() {
    FragenAnzahl = 10 * slider1.value;
    ZeitproFrage = 5 * slider2.value;
    verbrauchteZeit = 0;
    GesamtverbrauchteZeit = 0;
    Anzahl_richtig = 0;
    /*Balkenhoehe = 150/(10*slider1.value);
    console.log(FragenAnzahl);
    console.log(ZeitproFrage);
    console.log(Balkenhoehe);*/
    Fragennummer = 0;
    richtig = false;
    Einer = 200;
    Zehner = 200;
    Hunderter = 200;
    Ziffern = new Array();
    //var Fragen = new Array();
    //var Punkte = 0;
    //var Runden = 0;
    //var aktZiff = 0;
    //var vorzeichen = "+";
    //var gesperrt = true;
    var richtigeAntwort;

    $("#icc").attr("src", "pic/icc.png");
    $("#bar-timeleft").css("backgroundColor", "green");
    $("#bar-timeleft").css("height", "300");
    $("#bar-timeleft").css("top", "0");
    Ziffern[0] = "pic/d0.png";
    Ziffern[1] = "pic/d1.png";
    Ziffern[2] = "pic/d2.png";
    Ziffern[3] = "pic/d3.png";
    Ziffern[4] = "pic/d4.png";
    Ziffern[5] = "pic/d5.png";
    Ziffern[6] = "pic/d6.png";
    Ziffern[7] = "pic/d7.png";
    Ziffern[8] = "pic/d8.png";
    Ziffern[9] = "pic/d9.png";
    Ziffern[10] = "pic/stempel3.png";			//abändern!
    Ziffern[11] = "pic/plusminus.png";
    Ziffern[12] = "pic/plus_k.png";
    Ziffern[13] = "pic/minus_k.png";
    Ziffern[14] = "pic/klammerauf.png";
    Ziffern[15] = "pic/klammerzu.png";
    Ziffern[16] = "pic/gl.png";
    Ziffern[17] = "pic/mal_k.png";
    Ziffern[18] = "pic/durch_k.png";



    document.getElementById('z1-0').src = Ziffern[13];
    document.getElementById('z1-1').src = Ziffern[1];
    document.getElementById('z1-2').src = Ziffern[1];
    document.getElementById('operator').src = Ziffern[12];
    document.getElementById('klammer_auf').src = Ziffern[14];
    document.getElementById('z2-0').src = Ziffern[13];
    document.getElementById('z2-1').src = Ziffern[4];						//ANPASSEN JQUERY!!!
    document.getElementById('z2-2').src = Ziffern[1];
    document.getElementById('klammer_zu').src = Ziffern[15];
    document.getElementById('gl').src = Ziffern[16];
    //document.getElementById('ziffer').src = Ziffern[11];
    document.getElementById('z3-0').src = Ziffern[13];
    document.getElementById('z3-1').src = Ziffern[5];
    document.getElementById('z3-2').src = Ziffern[7];
    document.getElementById('z3-3').src = Ziffern[2];
    $("#z1-1").hide();
    $("#z1-0").hide();
    $("#z2-1").hide();
    $("#z2-0").hide();
    $("#z3-1").hide();
    $("#z3-0").hide();
    $("#z3-2").hide();
    $("#klammer_auf").hide();
    $("#klammer_zu").hide();
}

Variablen_initialisieren();

function Aufgabe_ausgeben() {
    if (Fragennummer < FragenAnzahl) {
        Fragennummer++;
        console.log(Fragennummer);
        //z1 = getRandomIntInclusive(0, 10);
        //z2 = getRandomIntInclusive(0, 10);
        var richtig = false;
        var klammer = $("#klammer_auf,#klammer_zu");
        var minus = $("#Dz2-0");														//WEITER BEARBEITEN!!!
        var minusb = $("#z2-0");
        var Aufgabe = $("#Aufgabentext");
        zuratendeZahl = getRandomIntInclusive(1, 3);		//Globale Variable!!!
        if ($("#plusminus").is(":checked")) {
            var o = getRandomIntInclusive(0, 1);
            if ($("#natuerlicheZahlen").is(":checked")) {
                $("#btn-plusminus").css("opacity", "0");
                //$("#btn-plusminus").hide();
                z1 = getRandomIntInclusive(0, 99);				//Nur positive Zahlen!!!
                if (o == 0) {
                    z2 = getRandomIntInclusive(0, z1)
                }
                else {
                    z2 = getRandomIntInclusive(0, 99)
                }
                ;
            }
            if ($("#ganzeZahlen").is(":checked")) {
                //$("#btn-plusminus").show();
                $("#btn-plusminus").css("opacity", "1");
                z1 = getRandomIntInclusive(-99, 99);										//WEITER BEARBEITEN!!!
                z2 = getRandomIntInclusive(-99, 99)
            }
            ;
        }
        ;
        if ($("#maldurch").is(":checked")) {
            o = getRandomIntInclusive(2, 3);
            var div1 = getRandomIntInclusive(1, 10);
            var div2 = getRandomIntInclusive(1, 10);
            if ($("#natuerlicheZahlen").is(":checked")) {
                $("#btn-plusminus").css("opacity", "0");
                //$("#btn-plusminus").hide();
                if ((o == 3) && (div1 == 10) && (div2 == 10)) {
                    div2 = getRandomIntInclusive(1, 9)
                }
                ;
                if (o == 2) {
                    z1 = div1;
                    z2 = div2
                }
                ;
                if (o == 3) {
                    z1 = div1 * div2;
                    z2 = div2
                }
                ;
            }
            ;
            if ($("#ganzeZahlen").is(":checked")) {
                $("#btn-plusminus").css("opacity", "1");
                //$("#btn-plusminus").show();
                if ((o == 3) && (Math.abs(div1 * div2) == 100)) {
                    div2 = getRandomIntInclusive(1, 9)
                }
                ;
                if (o == 2) {
                    z1 = div1;
                    z2 = div2
                }
                ;
                if (o == 3) {
                    var vz1 = getRandomIntInclusive(0, 1);
                    var vz2 = getRandomIntInclusive(0, 1);
                    if (vz1 == 0) {
                        div1 = -div1
                    }
                    ;
                    if (vz2 == 1) {
                        div2 = -div2
                    }
                    ;
                    z1 = div1 * div2;
                    z2 = div2;
                }
                ;
            }
            ;
        }
        ;
        Ergebnis = 200;

        var farbe = "#FFFFFF";					//"#EEE8AA";
        var k1 = "";
        var k2 = "";
        Text_Aufgabe = "";
        //var Ergebnis = 0;
        if (o == 0) {
            op = "-"
        }
        ;
        if (o == 1) {
            op = "+"
        }
        ;
        if (o == 2) {
            op = "*"
        }
        ;
        if (o == 3) {
            op = "/"
        }
        ;
        if (z2 < 0) {
            k1 = "(";
            k2 = ")"
        }
        ;
        Text_Aufgabe = z1 + " " + op + " " + k1 + " " + z2 + " " + k2;
        Ergebnis = eval(Text_Aufgabe);
        Aufgabe.text(Text_Aufgabe + " = " + Ergebnis);
        errechneteZahl = 200;

        $("#z1-0").hide();
        $("#z1-1").hide();
        $("#z1-2").hide();
        $("#z2-0").hide();
        $("#z2-1").hide();								//DOPPELT!!!
        $("#z2-2").hide();
        $("#z3-0").hide();
        $("#z3-1").hide();
        $("#z3-2").hide();
        $("#z3-3").hide();

        if (zuratendeZahl == 1) {
            $("#Dz1-1").css("background", farbe);
            $("#z1-1").hide();
            $("#Dz1-2").css("background", farbe);
            $("#z1-2").hide();
            $("#Dz1-0").css("background", farbe);
            $("#z1-0").hide();
            $("#Dz2-1").css("background", "#FFFFFF");
            $("#z2-1").show();
            $("#Dz2-2").css("background", "#FFFFFF");
            $("#z2-2").show();
            $("#Dz2-0").css("background", "#FFFFFF");
            $("#z2-0").show();
            $("#Dz3-1").css("background", "#FFFFFF");
            $("#z3-1").show();
            $("#Dz3-2").css("background", "#FFFFFF");
            $("#z3-2").show();
            $("#Dz3-3").css("background", "#FFFFFF");
            $("#z3-2").show();
            $("#Dz3-0").css("background", "#FFFFFF");
            $("#z3-0").show();
        }
        ;
        if (zuratendeZahl == 2) {
            $("#Dz2-1").css("background", farbe);
            $("#z2-1").hide();
            $("#Dz2-2").css("background", farbe);
            $("#z2-2").hide();
            $("#Dz2-0").css("background", farbe);
            $("#z2-0").hide();
            klammer.hide();
            $("#Dz1-1").css("background", "#FFFFFF");
            $("#z1-1").show();
            $("#Dz1-2").css("background", "#FFFFFF");
            $("#z1-2").show();
            $("#Dz1-0").css("background", "#FFFFFF");
            $("#z1-0").show();
            $("#Dz3-1").css("background", "#FFFFFF");
            $("#z3-1").show();
            $("#Dz3-2").css("background", "#FFFFFF");
            $("#z3-2").show();
            $("#Dz3-3").css("background", "#FFFFFF");
            $("#z3-2").show();
            $("#Dz3-0").css("background", "#FFFFFF");
            $("#z3-0").show();
        }
        ;
        if (zuratendeZahl == 3) {
            $("#Dz3-1").css("background", farbe);
            $("#z3-1").hide();
            $("#Dz3-2").css("background", farbe);
            $("#z3-2").hide();
            $("#Dz3-3").css("background", farbe);
            $("#z3-2").hide();
            $("#Dz3-0").css("background", farbe);
            $("#z3-0").hide();
            $("#Dz1-1").css("background", "#FFFFFF");
            $("#z1-1").show();
            $("#Dz1-2").css("background", "#FFFFFF");
            $("#z1-2").show();
            $("#Dz1-0").css("background", "#FFFFFF");
            $("#z1-0").show();
            $("#Dz2-1").css("background", "#FFFFFF");
            $("#z2-1").show();
            $("#Dz2-2").css("background", "#FFFFFF");
            $("#z2-2").show();
            $("#Dz2-0").css("background", "#FFFFFF");
            $("#z2-0").show();
        }
        ;

        z11 = Math.floor(Math.abs(z1) / 10);
        z12 = Math.abs(z1) % 10;
        document.getElementById('z1-1').src = Ziffern[z11];
        document.getElementById('z1-2').src = Ziffern[z12];
        if (z1 >= 0) {
            $("#z1-0").hide();
        }
        ;
        if (z11 == 0) {
            $("#z1-1").hide();
        }
        ;

        if (o == 0) {
            document.getElementById('operator').src = Ziffern[13];
        }
        if (o == 1) {
            document.getElementById('operator').src = Ziffern[12];
        }
        if (o == 2) {
            document.getElementById('operator').src = Ziffern[17];
        }			//ERGÄNZEN!!!
        if (o == 3) {
            document.getElementById('operator').src = Ziffern[18];
        }

        z21 = Math.floor(Math.abs(z2) / 10);
        z22 = Math.abs(z2) % 10;
        document.getElementById('z2-1').src = Ziffern[z21];
        document.getElementById('z2-2').src = Ziffern[z22];

        if (zuratendeZahl != 2) {
            $("#z2-1").show();
            $("#z2-2").show();
            if (z2 >= 0) {
                klammer.animate({width: '0px'}, "fast");
                //minus.animate({width: '0px'}, "fast");
                minusb.hide()
            }
            ;
            if (z2 < 0) {
                klammer.animate({width: '9px'}, "fast");
                //minus.animate({width: '20px'}, "fast");
                minusb.show()
            }
            ;
            //if (z21==0){$("#z2-1").animate({width: '0px'}, "fast");$("#Dz2-1").animate({width: '0px'}, "fast")};
            //if (z21!=0){$("#z2-1").animate({width: '20px'}, "fast");$("#Dz2-1").animate({width: '21px'}, "fast")};
            if (z21 == 0) {
                $("#z2-1").hide()
            }
            ;
            if (z21 != 0) {
                $("#z2-1").show()
            }
            ;
        }
        ;
        if (zuratendeZahl != 3) {
            z31 = Math.floor(Math.abs(Ergebnis) / 100);
            z31a = Math.abs(Ergebnis) % 100;
            z32 = Math.floor(Math.abs(z31a) / 10);
            z33 = Math.abs(z31a) % 10;
            document.getElementById('z3-1').src = Ziffern[z31];
            document.getElementById('z3-2').src = Ziffern[z32];
            document.getElementById('z3-3').src = Ziffern[z33];
            if (zuratendeZahl != 3) {
                $("#z3-1").show();
                $("#z3-2").show();
                $("#z3-3").show();
                if (Ergebnis >= 0) {
                    $("#z3-0").hide();
                }
                ;
                if (Ergebnis < 0) {
                    $("#z3-0").show();
                }
                ;
                if (z31 == 0) {
                    $("#z3-1").hide();
                }
                ;
                if ((z32 == 0) && (z31 == 0)) {
                    $("#z3-2").hide();
                }
                ;
            }
        }
        ;


        $("#btn-solve").bind("click", function () {
            Rundestarten()
        });
        //Zeit_animieren(FragenAnzahl*1000);
        Zeit_animieren(5 * slider2.value * 1000);
    } else {
        Statistik_Uebersicht();
        $("#results").css("visibility", "visible");
    }									//KOMPLETTE AUSWERTUNG!!!
};


function Rundestarten() {
    $("#btn-solve").unbind("click");
//		if (($("#z1-2").is(':visible')) && ($("#z2-2").is(':visible')) && ($("#z3-3").is(':visible'))&&(zuratendeZahl>0)){
//			$("#btn-solve").bind( "click", function(){Rundestarten()} );
//		} 	
    $("#bar-timeleft").stop(true);
    Auswertung();
    var Einer = 200;
    var Zehner = 200;			//überschreiben!!!
    var Hunderter = 200;
    if (richtig) {
        setTimeout(function () {
            Aufgabe_ausgeben();
        }, 1500);
    } else {
        setTimeout(function () {
            Aufgabe_ausgeben();
        }, 5000);
    }
    ;
}

function Balken_aktualisieren(farbe) {
    var Balkenhoehe = 150 / (10 * slider1.value);
    var Balken = document.createElement("div");
    Balken.style = "position: absolute;width:40px;";
    Balken.style.background = farbe;
    Balken.style.height = Balkenhoehe + "px";
    Balken.style.bottom = (Fragennummer - 1) * Balkenhoehe + "px";
    document.getElementById("bar-accuracy").appendChild(Balken);
    $("#percentage-right").animate({height: Anzahl_richtig / Fragennummer * 150,}, "slow");
    $("#percentage-wrong").animate({height: (Fragennummer - Anzahl_richtig) / Fragennummer * 150,}, "slow");
}

function Auswertung() {
    $("#Willkommenstext").css("font-size", "22px");
    if (zuratendeZahl == 1) {
        if ($("#z1-0").is(':hidden')) {
            errechneteZahl = errechneteZahl
        } else {
            errechneteZahl = -errechneteZahl
        }
        ;
        if ($("#z1-2").is(':hidden')) {
            errechneteZahl = 200;
            vergleichszahl = z1
        }
    }
    if (zuratendeZahl == 2) {
        if ($("#z2-0").is(':hidden')) {
            errechneteZahl = errechneteZahl
        } else {
            errechneteZahl = -errechneteZahl
        }
        ;
        if ($("#z2-2").is(':hidden')) {
            errechneteZahl = 200;
            vergleichszahl = z2
        }
    }
    if (zuratendeZahl == 3) {
        if ($("#z3-0").is(':hidden')) {
            errechneteZahl = errechneteZahl
        } else {
            errechneteZahl = -errechneteZahl
        }
        ;
        if ($("#z3-3").is(':hidden')) {
            errechneteZahl = 200;
            vergleichszahl = Ergebnis
        }
    }
    if (errechneteZahl == vergleichszahl) {
        richtig = true
    } else {
        richtig = false
    }
    ;
    Loes = "#solution" + zuratendeZahl;												//WEITER!!!

    verbrauchteZeit = (300 - $("#bar-timeleft").height()) / 300 * 5 * slider2.value;
    GesamtverbrauchteZeit = GesamtverbrauchteZeit + verbrauchteZeit;

    if (richtig) {
        Anzahl_richtig++;
        $("#icc").attr("src", "pic/icc.png");
        Icc_animieren();
        $(Loes).css("background", "green");
        $(Loes).text(vergleichszahl);
        if (zuratendeZahl == 2) {
            if (vergleichszahl < 0) {
                $(Loes).text("(" + vergleichszahl + ")");
            }
        }
        ;
        $(Loes).animate({opacity: '1'}, "fast");
        setTimeout(function () {
            $(Loes).animate({opacity: '0'}, "fast");
        }, 500);
        $("#Willkommenstext").css("color", "green");
        $("#Willkommenstext").empty();
        typeWriter.textposition = -3;

        typeWriter.text = "Ja! Ja! Ja! Ja! Das ist genau richtig! Super!!!!! Das ist ja sensationell!!! " + Text_Aufgabe + " = " + Ergebnis;
        typeWriter.text = typeWriter.text.replace("/", ":");
        typeWriter.text = typeWriter.texttxt.replace("*", "x");
        typeWriter.type();

        Balken_aktualisieren("green");
    } else {
        $("#icc").attr("src", "pic/icc_traurig.png");
        Icc_animieren();
        $(Loes).css("background", "red");
        $(Loes).text(vergleichszahl);
        if (zuratendeZahl == 2) {
            if (vergleichszahl < 0) {
                $(Loes).text("(" + vergleichszahl + ")");
            }
        }
        ;
        $(Loes).animate({opacity: '1'}, "slow");
        $(Loes).animate({opacity: '0'}, "slow");
        $(Loes).animate({opacity: '1'}, "slow");
        $(Loes).animate({opacity: '0'}, "slow");
        $(Loes).animate({opacity: '1'}, "slow");
        setTimeout(function () {
            $(Loes).animate({opacity: '0'}, "slow");
        }, 4000);
        $("#Willkommenstext").css("color", "red");
        $("#Willkommenstext").empty();

        typeWriter.textposition = -3;
        typeWriter.speed = 10;
        typeWriter.text = "Nein! Nein!! Nein!!! Nein!!!! Das ist leider falsch!!!!! Hier ist die Berichtigung: " + Text_Aufgabe + " = " + Ergebnis;
        typeWriter.text = typeWriter.text.replace("/", ":");
        typeWriter.text = typeWriter.text.replace("*", "x");
        typeWriter.type();
        Balken_aktualisieren("red");
    }
    ;
};

function Statistik_Uebersicht() {
    //$( "#statistics" ).css("color", "red");
    var Statistik1 = document.createElement("p");
    var Statistik2 = document.createElement("p");
    var Statistik3 = document.createElement("p");
    var t1 = "";
    var t2 = "";
    var t3 = "";
    Statistik1.id = "total";
    Statistik2.id = "prozentual";
    Statistik3.id = "verbrauchteZeit";
    document.getElementById("statistics").appendChild(Statistik1);
    document.getElementById("statistics").appendChild(Statistik2);
    document.getElementById("statistics").appendChild(Statistik3);
    t1 = "Du hast " + Anzahl_richtig + " von " + FragenAnzahl + " Aufgaben richtig gerechnet.";
    t2 = "Das entspricht " + Math.round(Anzahl_richtig / FragenAnzahl * 1000) / 10 + "%."
    t3 = "Dafür hast du genau  " + Math.round(GesamtverbrauchteZeit * 10) / 10 + " Sekunden benötigt."
    $("#total").text(t1);
    $("#prozentual").text(t2);
    $("#verbrauchteZeit").text(t3);
};

$("#numberpad .btn-calc").on("click", function() {
    var gewaehlterButton = this;
    if ($("#sound").is(":checked")) {
        document.getElementById('audiofile2').play();
    }
    var klammer = $("#klammer_auf,#klammer_zu");
    if (zuratendeZahl == 1) {
        vergleichszahl = z1;
        if ((gewaehlterButton.getAttribute("value") != "btn-plusminus") && ((gewaehlterButton.getAttribute("value") != "C"))) {
            if ($("#z1-2").is(':hidden')) {
                document.getElementById('z1-2').src = Ziffern[gewaehlterButton.getAttribute("value")];
                $("#z1-2").show();
                speicher = Ziffern[gewaehlterButton.getAttribute("value")];
                Einer = eval(gewaehlterButton.getAttribute("value"));			//var a = fruits.indexOf("Apple"); (Beispiel)
                errechneteZahl = Einer;
            }
            else {
                if ($("#z1-1").is(':hidden')) {
                    document.getElementById('z1-1').src = speicher;
                    $("#z1-1").show();
                    Zehner = 10 * errechneteZahl;
                    document.getElementById('z1-2').src = Ziffern[gewaehlterButton.getAttribute("value")];
                    $("#z1-2").show();
                    Einer = eval(gewaehlterButton.getAttribute("value"));
                    errechneteZahl = eval(Zehner + Einer);
                }
            }
        }
        if (gewaehlterButton.getAttribute("value") == "C") {
            Zehner = "";
            Einer = "";
            $("#z1-0").hide();
            $("#z1-2").hide();
            $("#z1-1").hide();
        }
    }
    if (zuratendeZahl == 2) {
        vergleichszahl = z2;
        if ((gewaehlterButton.getAttribute("value") != "btn-plusminus") && ((gewaehlterButton.getAttribute("value") != "C"))) {
            if ($("#z2-2").is(':hidden')) {
                document.getElementById('z2-2').src = Ziffern[gewaehlterButton.getAttribute("value")];
                $("#z2-2").show();
                speicher = Ziffern[gewaehlterButton.getAttribute("value")];
                Einer = eval(gewaehlterButton.getAttribute("value"));			//var a = fruits.indexOf("Apple"); (Beispiel)
                errechneteZahl = Einer;
            }
            else {
                if ($("#z2-1").is(':hidden')) {
                    document.getElementById('z2-1').src = speicher;
                    $("#z2-1").show();
                    Zehner = 10 * errechneteZahl;
                    document.getElementById('z2-2').src = Ziffern[gewaehlterButton.getAttribute("value")];
                    $("#z2-2").show();
                    Einer = eval(gewaehlterButton.getAttribute("value"));
                    errechneteZahl = eval(Zehner + Einer);
                }
            }
        }
        if (gewaehlterButton.getAttribute("value") == "C") {
            klammer.animate({width: '0px'}, "fast");
            $("#z2-0").hide();
            $("#z2-2").hide();
            $("#z2-1").hide();
        }
    }
    if (zuratendeZahl == 3) {
        vergleichszahl = eval(Ergebnis);
        if ((gewaehlterButton.getAttribute("value") != "btn-plusminus") && ((gewaehlterButton.getAttribute("value") != "C"))) {
            if ($("#z3-3").is(':hidden')) {
                document.getElementById('z3-3').src = Ziffern[gewaehlterButton.getAttribute("value")];
                $("#z3-3").show();
                sp3 = Ziffern[gewaehlterButton.getAttribute("value")];
                Einer = eval(gewaehlterButton.getAttribute("value"));			//var a = fruits.indexOf("Apple"); (Beispiel)
                Zehner = 0;
                Hunderter = 0;
                errechneteZahl = Einer;
            }
            else {
                if ($("#z3-2").is(':hidden')) {
                    document.getElementById('z3-2').src = sp3;
                    $("#z3-2").show();
                    Zehner = 10 * errechneteZahl;
                    document.getElementById('z3-3').src = Ziffern[gewaehlterButton.getAttribute("value")];
                    sp2 = Ziffern[gewaehlterButton.getAttribute("value")];
                    Einer = eval(gewaehlterButton.getAttribute("value"));
                    errechneteZahl = eval(Zehner + Einer);
                }
                else {
                    if ($("#z3-1").is(':hidden')) {
                        document.getElementById('z3-1').src = sp3;
                        $("#z3-1").show();
                        Hunderter = 10 * Zehner;
                        Zehner = 10 * Einer;
                        Einer = eval(gewaehlterButton.getAttribute("value"));
                        document.getElementById('z3-3').src = Ziffern[gewaehlterButton.getAttribute("value")];
                        document.getElementById('z3-2').src = sp2;
                        errechneteZahl = eval(Hunderter + Zehner + Einer);
                    }
                }
            }
        }
        if (gewaehlterButton.getAttribute("value") == "C") {
            $("#z3-0").hide();
            $("#z3-3").hide();
            $("#z3-2").hide();
            $("#z3-1").hide();
        }
    }

});

function Button_reset(id) {
    document.getElementById(id).style.boxShadow = "5px 5px 5px grey";
    document.getElementById(id).style.background = "#EEEEEE";
}

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
});

$(document).ready(function () {
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

$("#icc").click(function () {
    Aufgabe_ausgeben();
    $("#icc").unbind("click");
});

function Icc_animieren() {
    var img = $("#icc");
    //img.animate({top: '70%', height: '30%', width: '30%'}, 3000);
    for (i = 0; i < 3; i++) {
        img.animate({top: '+=40px', height: '80px'}, "fast");
        img.animate({top: '-=40px', height: '120px'}, "fast");
    }
}

