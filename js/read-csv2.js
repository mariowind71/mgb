function handleFiles(files) {
	// Check for the various File API support.
	if (window.FileReader) {
		// FileReader are supported.
		getAsText(files[0]);
	} else {
		alert('FileReader wird von diesem Browser nicht unterstützt.');
	}
}

function getAsText(fileToRead) {
	var reader = new FileReader();
	// Handle errors load
	reader.onload = loadHandler;
	reader.onerror = errorHandler;
	// Read file into memory as UTF-8      
	reader.readAsText(fileToRead);
}

function loadHandler(event) {
	var csv = event.target.result;
	processData(csv);             
}

function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    var SchuelerTabelle = [];
    var SchuelerTabelleM = [];
    var SchuelerTabelleW = [];
	while (allTextLines.length) {
        SchuelerTabelle.push(allTextLines.shift().split(';'));
    }
	for (var i = 0; i < SchuelerTabelle.length; i++) {
		if(SchuelerTabelle[i][2] == 'm'){SchuelerTabelleM.push(SchuelerTabelle[i])};
		if(SchuelerTabelle[i][2] == 'w'){SchuelerTabelleW.push(SchuelerTabelle[i])};
	}
	console.log(SchuelerTabelle);
	console.log(SchuelerTabelleM);
	console.log(SchuelerTabelleW);
	//return SchuelerTabelle;
	Schueler_bereitstellen(SchuelerTabelle);
	//Schueler_setzen(SchuelerTabelle);
	//drawOutput(SchuelerTabelle);
}

function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		alert("Datei nicht lesbar!");
	}
}

function drawOutput(SchuelerTabelle){
	//Clear previous data
	document.getElementById("output").innerHTML = "";
	var table = document.createElement("table");
	for (var i = 0; i < SchuelerTabelle.length; i++) {
		var row = table.insertRow(-1);
		for (var j = 0; j < SchuelerTabelle[i].length; j++) {
			var firstNameCell = row.insertCell(-1);
			firstNameCell.appendChild(document.createTextNode(SchuelerTabelle[i][j]));
		}
	}
	document.getElementById("output").appendChild(table);
}

function Tische_aufstellen(){
	for (var i=1; i<33; i++) {
		var Tisch = document.createElement("div");
		Tisch.className = "tisch";
		Tisch.id = "t" + i;
		document.getElementById("Schueler_Mitte").appendChild(Tisch);
	}
}

Tische_aufstellen();

function Schueler_bereitstellen(SchuelerTabelle){
	for (var i=0; i<27; i++) {
		var Schueler = document.createElement("div");
		var SchuelerG = document.createElement("div");
		var SchuelerV = document.createElement("div");
		var SchuelerN = document.createElement("div");
		Schueler.className = "schueler";
		var j = i + 1;
		Schueler.id = "s" + j;
		//var Tischid = "t" + j;
		Schueler.style="float: left; text-align:center;position: relative; left: 5px;height: 45px;width:40px";
		SchuelerN.style="width:40px";
		SchuelerV.style="width:40px";
		if (SchuelerTabelle[i][0].length < 10){SchuelerN.style="font-size:8px;"};		
		if (SchuelerTabelle[i][0].length > 9){SchuelerN.style="font-size:5px;"};		
		if (SchuelerTabelle[i][1].length < 10){SchuelerV.style="font-size:8px;"};		
		if (SchuelerTabelle[i][1].length > 9){SchuelerV.style="font-size:5px;"};		
		if (SchuelerTabelle[i][2] == "m"){SchuelerG.innerHTML = '<img src="img/boy.png" height=20>'};
		if (SchuelerTabelle[i][2] == "w"){SchuelerG.innerHTML = '<img src="img/girl.png" height=20>'};
		SchuelerV.innerHTML = SchuelerTabelle[i][1];
		SchuelerN.innerHTML = SchuelerTabelle[i][0];
		Schueler.appendChild(SchuelerG);
		Schueler.appendChild(SchuelerV);
		Schueler.appendChild(SchuelerN);
		//document.getElementById("Schueler_rechts").appendChild(Schueler);
		document.getElementById("Schueler_links").appendChild(Schueler);
	}
}

function Schueler_setzen(SchuelerTabelle){
	for (var i=0; i<27; i++) {
		var Schueler = document.createElement("div");
		var SchuelerG = document.createElement("div");
		var SchuelerV = document.createElement("div");
		var SchuelerN = document.createElement("div");
		Schueler.className = "schueler";
		var j = i + 1;
		Schueler.id = "s" + j;
		var Tischid = "t" + j;
		Schueler.style="text-align:center;position: relative; padding: 1px;";
		SchuelerN.style="width:78px";
		SchuelerV.style="width:78px";
		console.log(SchuelerTabelle[i][0]);
		console.log(SchuelerTabelle[i][1]);
		console.log(SchuelerTabelle[i][2]);
		if (SchuelerTabelle[i][0].length < 10){SchuelerN.style="font-size:12px;"};		
		if (SchuelerTabelle[i][0].length > 9){SchuelerN.style="font-size:8px;"};		
		if (SchuelerTabelle[i][1].length < 10){SchuelerV.style="font-size:12px;"};		
		if (SchuelerTabelle[i][1].length > 9){SchuelerV.style="font-size:8px;"};		
		if (SchuelerTabelle[i][2] == "m"){SchuelerG.innerHTML = '<img src="img/boy.png" height=50>'};
		if (SchuelerTabelle[i][2] == "w"){SchuelerG.innerHTML = '<img src="img/girl.png" height=50>'};
		SchuelerV.innerHTML = SchuelerTabelle[i][1];
		SchuelerN.innerHTML = SchuelerTabelle[i][0];
		Schueler.appendChild(SchuelerG);
		Schueler.appendChild(SchuelerV);
		Schueler.appendChild(SchuelerN);
		document.getElementById(Tischid).appendChild(Schueler);
	}
}

function Schueler_setzen2(SchuelerTabelle){
	for (var i=0; i<27; i++) {
		var Schueler = document.createElement("div");
		Schueler.className = "schueler";
		var j = i + 1;
		Schueler.id = "s" + j;
		var Tischid = "t" + j;
		Schueler.style="text-align:center;font-size:12px;position: relative; left: 5px; top: -5px;padding: 1px;";
		Schueler.innerHTML = '<img src="img/girl.png" height=50>' + SchuelerTabelle[i][1] + ' ' + SchuelerTabelle[i][0];
		document.getElementById(Tischid).appendChild(Schueler);
	}
}