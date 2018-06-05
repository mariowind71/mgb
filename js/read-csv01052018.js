function handleFiles(files) {
	if (window.FileReader) {								// Check for the various File API support.
		getAsText(files[0]);								// FileReader are supported.
	} else {
		alert('FileReader wird von diesem Browser nicht unterstützt.');
	}
}

function getAsText(fileToRead) {
	var reader = new FileReader();
	reader.onload = loadHandler;							// Handle errors load
	reader.onerror = errorHandler;   
	reader.readAsText(fileToRead);							// Read file into memory as UTF-8
}

function loadHandler(event) {
	var csv = event.target.result;
	processData(csv);             
}

function processData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    SchuelerTabelle = [];
    SchuelerTabelleM = [];									//GLOBAL!!!!!
    SchuelerTabelleW = [];
	while (allTextLines.length) {
        SchuelerTabelle.push(allTextLines.shift().split(';'));
    }
	for (var i = 0; i < SchuelerTabelle.length; i++) {
		if(SchuelerTabelle[i][2] == 'm'){SchuelerTabelleM.push(SchuelerTabelle[i])};
		if(SchuelerTabelle[i][2] == 'w'){SchuelerTabelleW.push(SchuelerTabelle[i])};
	}
	//console.log(SchuelerTabelle);
	//console.log(SchuelerTabelleM);
	//console.log(SchuelerTabelleW);
	Schueler_bereitstellen(SchuelerTabelle);
}

function errorHandler(evt) {
	if(evt.target.error.name == "NotReadableError") {
		alert("Datei nicht lesbar!");
	}
}

function drawOutput(SchuelerTabelle){									//Original => Tabelle!!!
	document.getElementById("output").innerHTML = "";					//Clear previous data
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



            var dragSrcEl = null;
            
            function dragStart(ev) 
            {                   
                dragSrcEl = ev.target;
				console.log("ID:"+dragSrcEl.id);
                ev.dataTransfer.effectAllowed='move';
                ev.dataTransfer.setData('text/html', ev.target.innerHTML);
                return true;
            }       

            function dragEnter(ev) 
            {
                ev.preventDefault();
                return true;
            }
            
            function dragOver(ev) 
            {
                return false;
            }
            
            function dragDrop(ev) 
            {
                ev.stopPropagation();
                dragSrcEl.innerHTML = ev.target.innerHTML;
                ev.target.innerHTML = ev.dataTransfer.getData('text/html');
                return false;
            }




function Tische_aufstellen(){
	Tischnummern = [];
	for (var i=1; i<33; i++) {
		Tisch = document.createElement("div");						//GLOBAL!!!
		Tisch.className = "tisch";
		Tisch.id = "t" + i;
		Tisch.setAttribute("ondrop","return dragDrop(event)");
		Tisch.setAttribute("ondragover","return dragOver(event)");
		Tischnummern.push(i);
		//Tisch.style="position:relative;font-size: 8px;marginLeft:5px;marginTop:5px";
		//Tisch.innerHTML = i;															//Nummerierung
		document.getElementById("Schueler_Mitte").appendChild(Tisch);
	}
}

function Tische_mischen(){													//nicht nötig
	shuffle(Tischnummern);
	for (var i=1; i<33; i++) {
		if(document.getElementById("t" + Tischnummern[i])){document.getElementById("t" + Tischnummern[i]).remove()};
		var Tisch = document.createElement("div");
		Tisch.className = "tisch";
		Tisch.id = "t" + Tischnummern[i];
		document.getElementById("Schueler_Mitte").appendChild(Tisch);
	}
}

Tische_aufstellen();

function Schueler_bereitstellen(SchuelerTabelle){
	for (var i=0; i<SchuelerTabelle.length; i++) {
		Schueler = document.createElement("div");							//GLOBAL!!!
		var SchuelerG = document.createElement("div");
		var SchuelerV = document.createElement("div");
		var SchuelerN = document.createElement("div");
		var Alle = []; Alle_Zufall = [];
		var Jungen = [];
		var Maedchen = [];
		Schueler.className = "schueler";
		var j = i + 1;
		Schueler.id = "s" + j;
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
		if (SchuelerTabelle[i][2] == "m"){
			Jungen.push(Schueler);
			document.getElementById("Schueler_links").appendChild(Schueler);};
		if (SchuelerTabelle[i][2] == "w"){
			Maedchen.push(Schueler);
			document.getElementById("Schueler_rechts").appendChild(Schueler);};
	}
}

function Schueler_setzen(SchuelerTabelle){
	schuelertabelle_original = SchuelerTabelle;							//Kopie!!!
	shuffle(SchuelerTabelle);
	shuffle(Tischnummern);	
	
	for (var i=0; i<SchuelerTabelle.length; i++) {
		var j = i + 1;
		var id = "s" + j;
		if(document.getElementById(id)){document.getElementById(id).remove()};	//löscht auch am Seitenrand!!!
		Schueler = document.createElement("div");								//GLOBAL!!!
		var SchuelerG = document.createElement("div");
		var SchuelerV = document.createElement("div");
		var SchuelerN = document.createElement("div");
		var Alle = [];
		Schueler.id = "s" + j;													//GLOBAL!!!
		var Tischid = "t" + j;												//alle nebeneinander
		//var Tischid = "t" + Tischnummern[j];									//alle Tische möglich
		Schueler.className = "schueler";
		//Schueler.setAttribute("draggable","true");
		//Schueler.setAttribute("ondragstart","drag(event)");
		
		Schueler.setAttribute("draggable","true");
		Schueler.setAttribute("ondragstart","return dragStart(event)");
		Schueler.setAttribute("ondragenter","return dragEnter(event)");
			
		Schueler.style="text-align:center;position: relative;padding: 1px;opacity:0;height:0px;width:78px;marginLeft:auto";
		SchuelerN.style="width:78px";
		SchuelerV.style="width:78px";
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
		Alle.push(Schueler);												//funktioniert nicht

		//Schueler.links = getRandomIntInclusive(-50, 50);
		//Schueler.hoch = getRandomIntInclusive(-50, 50);
		
		$(Schueler).animate({
			opacity: '1',
			height:'78px',
			width:'78px',
			//marginLeft: Schueler.links,
			//marginTop: Schueler.hoch
		}, 1000);
		
		//setTimeout(warten, 1000)
	}
}

function warten() {
    //alert("Hello");
}

function shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {									// While there are elements in the array
        index = Math.floor(Math.random() * ctr);		// Pick a random index
        ctr--;											// Decrease ctr by 1
        temp = arra1[ctr];								// And swap the last element with it
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; 
}

/*
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.currentTarget.id);
	console.log("ID:"+ev.currentTarget.id);

}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
*/

