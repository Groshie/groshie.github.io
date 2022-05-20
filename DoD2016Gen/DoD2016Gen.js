/*
###################################
### Drakar och Demoner (2016)	###
### -- Karaktärsgenerator --	###
###				###
### Av: Groshie (2020)		###
###################################
*/
/*
##########################
### Variabler & Objekt ###
##########################
*/
var statValues = [];
var charStats = {"STY": 0, "FYS": 0, "SMI": 0, "PER": 0, "PSY": 0, "INT": 0, "KAR": 0}

var races = {
	"Alv": {"STY": -1, "FYS": -1, "SMI": 1, "PER": 0, "PSY": 0, "INT": 0, "KAR": 1, "L": 8},
	"Anka": {"STY": -2, "FYS": -1, "SMI": 1, "PER": 2, "PSY": 0, "INT": 0, "KAR": 0, "L": 8},
	"Dvärg": {"STY": 1, "FYS": 1, "SMI": -2, "PER": 0, "PSY": 1, "INT": 0, "KAR": -1, "L": 8},
	"Halvlängdsfolk": {"STY": -2, "FYS": -1, "SMI": 1, "PER": 1, "PSY": 1, "INT": 0, "KAR": 1, "L": 8},
	"Människa": {"STY": 0, "FYS": 0, "SMI": 0, "PER": 0, "PSY": 0, "INT": 0, "KAR": 0, "L": 8},
	"Vargfolk": {"STY": 1, "FYS": 0, "SMI": 2, "PER": 0, "PSY": -1, "INT": -1, "KAR": -1, "L": 10}
}

var professions = {
	"Hantverkare": {
		"Besvärjelsekonst": 0,
		"Dyrka": 2,
		"Finna dolda ting": 1,
		"Flora och fauna": 2,
		"Förhandla": 3,
		"Första hjälpen": 1,
		"Geografi": 1,
		"Hantverk": 4,
		"Heraldik": 1,
		"Historia": 1,
		"Jakt och fällor": 1,
		"Kulturer": 1,
		"Läsa och skriva": 0,
		"Orientera": 1,
		"Riddjur": 1,
		"Rörlighet": 1,
		"Simma": 0,
		"Sjökunnighet": 1,
		"Spel": 1,
		"Spåra": 1,
		"Språk (modersmål)": 3,
		"Strid (avstånd)": 1,
		"Strid (närstrid)": 1,
		"Strid (obeväpnad)": 1,
		"Tjuveri": 1,
		"Underhålla": 1,
		"Vildmarksliv": 0,
		"Värdesätta": 3
		},
		
	"Jägare": {
		"Besvärjelsekonst": 0,
		"Dyrka": 1,
		"Finna dolda ting": 2,
		"Flora och fauna": 3,
		"Förhandla": 1,
		"Första hjälpen": 1,
		"Geografi": 3,
		"Hantverk": 2,
		"Heraldik": 1,
		"Historia": 1,
		"Jakt och fällor": 4,
		"Kulturer": 1,
		"Läsa och skriva": 0,
		"Orientera": 4,
		"Riddjur": 2,
		"Rörlighet": 3,
		"Simma": 2,
		"Sjökunnighet": 1,
		"Spel": 1,
		"Språk (modersmål)": 3,
		"Spåra": 4,
		"Strid (avstånd)": 4,
		"Strid (närstrid)": 2,
		"Strid (obeväpnad)": 2,
		"Tjuveri": 1,
		"Underhålla": 1,
		"Vildmarksliv": 4,
		"Värdesätta": 1		
	},
	
	"Krigare": {
		"Besvärjelsekonst": 0,
		"Dyrka": 1,
		"Finna dolda ting": 1,
		"Flora och fauna": 1,
		"Förhandla": 1,
		"Första hjälpen": 1,
		"Geografi": 1,
		"Hantverk": 1,
		"Heraldik": 1,
		"Historia": 1,
		"Jakt och fällor": 1,
		"Kulturer": 1,
		"Läsa och skriva": 0,
		"Orientera": 1,
		"Riddjur": 2,
		"Rörlighet": 2,
		"Simma": 0,
		"Sjökunnighet": 1,
		"Spel": 1,
		"Språk (modersmål)": 3,
		"Spåra": 1,
		"Strid (avstånd)": 3,
		"Strid (närstrid)": 4,
		"Strid (obeväpnad)": 3,
		"Tjuveri": 1,
		"Underhålla": 1,
		"Vildmarksliv": 1,
		"Värdesätta": 1		
	},
	
	"Köpman": {
		"Besvärjelsekonst": 0,
		"Dyrka": 1,
		"Finna dolda ting": 1,
		"Flora och fauna": 1,
		"Förhandla": 4,
		"Första hjälpen": 1,
		"Geografi": 2,
		"Hantverk": 1,
		"Heraldik": 1,
		"Historia": 1,
		"Jakt och fällor": 1,
		"Kulturer": 2,
		"Läsa och skriva": 1,
		"Orientera": 1,
		"Riddjur": 1,
		"Rörlighet": 1,
		"Simma": 0,
		"Sjökunnighet": 1,
		"Spel": 1,
		"Språk (modersmål)": 3,
		"Spåra": 1,
		"Strid (avstånd)": 1,
		"Strid (närstrid)": 1,
		"Strid (obeväpnad)": 1,
		"Tjuveri": 1,
		"Underhålla": 1,
		"Vildmarksliv": 1,
		"Värdesätta": 4		
	},
	
	"Lärd": {
		"Besvärjelsekonst": 0,
		"Dyrka": 1,
		"Finna dolda ting": 1,
		"Flora och fauna": 3,
		"Förhandla": 2,
		"Första hjälpen": 1,
		"Geografi": 4,
		"Hantverk": 1,
		"Heraldik": 4,
		"Historia": 4,
		"Jakt och fällor": 1,
		"Kulturer": 4,
		"Läsa och skriva": 4,
		"Orientera": 1,
		"Riddjur": 1,
		"Rörlighet": 1,
		"Simma": 0,
		"Sjökunnighet": 1,
		"Spel": 1,
		"Språk (modersmål)": 4,
		"Spåra": 1,
		"Strid (avstånd)": 1,
		"Strid (närstrid)": 1,
		"Strid (obeväpnad)": 1,
		"Tjuveri": 1,
		"Underhålla": 1,
		"Vildmarksliv": 4,
		"Värdesätta": 1		
	},
	
	"Magiker": {
		"Besvärjelsekonst": 4,
		"Dyrka": 1,
		"Finna dolda ting": 1,
		"Flora och fauna": 1,
		"Förhandla": 2,
		"Första hjälpen": 1,
		"Geografi": 1,
		"Hantverk": 1,
		"Heraldik": 1,
		"Historia": 2,
		"Jakt och fällor": 1,
		"Kulturer": 1,
		"Läsa och skriva": 4,
		"Orientera": 1,
		"Riddjur": 1,
		"Rörlighet": 1,
		"Simma": 0,
		"Sjökunnighet": 1,
		"Spel": 1,
		"Språk (modersmål)": 4,
		"Spåra": 4,
		"Strid (avstånd)": 1,
		"Strid (närstrid)": 1,
		"Strid (obeväpnad)": 1,
		"Tjuveri": 1,
		"Underhålla": 1,
		"Vildmarksliv": 1,
		"Värdesätta": 1		
	},
	
	"Riddare": {
		"Besvärjelsekonst": 0,
		"Dyrka": 1,
		"Finna dolda ting": 1,
		"Flora och fauna": 1,
		"Förhandla": 2,
		"Första hjälpen": 1,
		"Geografi": 2,
		"Hantverk": 2,
		"Heraldik": 1,
		"Historia": 1,
		"Jakt och fällor": 1,
		"Kulturer": 2,
		"Läsa och skriva": 2,
		"Orientera": 1,
		"Riddjur": 4,
		"Rörlighet": 2,
		"Simma": 0,
		"Sjökunnighet": 1,
		"Spel": 1,
		"Språk (modersmål)": 3,
		"Spåra": 1,
		"Strid (avstånd)": 2,
		"Strid (närstrid)": 3,
		"Strid (obeväpnad)": 2,
		"Tjuveri": 1,
		"Underhålla": 2,
		"Vildmarksliv": 1,
		"Värdesätta": 2	
	},
	
	"Sjöfarare": {
		"Besvärjelsekonst": 0,
		"Dyrka": 1,
		"Finna dolda ting": 1,
		"Flora och fauna": 1,
		"Förhandla": 2,
		"Första hjälpen": 1,
		"Geografi": 4,
		"Hantverk": 1,
		"Heraldik": 1,
		"Historia": 1,
		"Jakt och fällor": 1,
		"Kulturer": 2,
		"Läsa och skriva": 0,
		"Orientera": 2,
		"Riddjur": 1,
		"Rörlighet": 3,
		"Simma": 4,
		"Sjökunnighet": 4,
		"Spel": 2,
		"Språk (modersmål)": 3,
		"Spåra": 1,
		"Strid (avstånd)": 2,
		"Strid (närstrid)": 1,
		"Strid (obeväpnad)": 2,
		"Tjuveri": 1,
		"Underhålla": 1,
		"Vildmarksliv": 2,
		"Värdesätta": 1	
	},
	
	"Tjuv": {
		"Besvärjelsekonst": 0,
		"Dyrka": 4,
		"Finna dolda ting": 3,
		"Flora och fauna": 1,
		"Förhandla": 2,
		"Första hjälpen": 1,
		"Geografi": 1,
		"Hantverk": 1,
		"Heraldik": 1,
		"Historia": 1,
		"Jakt och fällor": 1,
		"Kulturer": 1,
		"Läsa och skriva": 0,
		"Orientera": 1,
		"Riddjur": 1,
		"Rörlighet": 4,
		"Simma": 0,
		"Sjökunnighet": 1,
		"Spel": 2,
		"Språk (modersmål)": 3,
		"Spåra": 1,
		"Strid (avstånd)": 1,
		"Strid (närstrid)": 1,
		"Strid (obeväpnad)": 2,
		"Tjuveri": 4,
		"Underhålla": 1,
		"Vildmarksliv": 1,
		"Värdesätta": 3		
	}
}

var skills = {
		"Besvärjelsekonst": ["INT", "PSY"],
		"Dyrka": ["INT", "SMI"],
		"Finna dolda ting": ["PER"],
		"Flora och fauna": ["INT"],
		"Förhandla": ["KAR"],
		"Första hjälpen": ["INT"],
		"Geografi": ["INT"],
		"Hantverk": ["SMI"],
		"Heraldik": ["INT"],
		"Historia": ["INT"],
		"Jakt och fällor": ["PER", "SMI"],
		"Kulturer": ["INT"],
		"Läsa och skriva": ["INT"],
		"Orientera": ["INT", "PER"],
		"Riddjur": ["SMI"],
		"Rörlighet": ["SMI"],
		"Simma": ["SMI", "FYS"],
		"Sjökunnighet": ["INT", "PER"],
		"Spel": ["PER"],
		"Språk (modersmål)": ["INT"],
		"Spåra": ["PER"],
		"Strid (avstånd)": ["SMI"],
		"Strid (närstrid)": ["STY", "SMI"],
		"Strid (obeväpnad)": ["SMI"],
		"Tjuveri": ["SMI"],
		"Underhålla": ["KAR"],
		"Vildmarksliv": ["FYS", "PSY"],
		"Värdesätta": ["PER"]
}

var levels = {
	"Nybörjare": {"Färdigheter": 0, "Procent": 0},
	"Utövare": {"Färdigheter": 2, "Procent": 25},
	"Expert": {"Färdigheter": 3, "Procent": 50}
}

/* 
##################
### Funktioner ###
##################
*/

function initGen() {
// Startar initieringen av applikationen
	console.log("Init startas!");
	rollStats(); // Slår fram initiala värden
	document.getElementById("first").checked = true;
	addStatValues(document.getElementById("first")); 
	
	for (i in races) {
		var raceOption = document.createElement("option");
		raceOption.text = i;
		document.getElementById("folkslagsLista").options.add(raceOption);
	}
	
	for (i in professions) {
		var profOption = document.createElement("option");
		profOption.text = i;
		document.getElementById("yrkesLista").options.add(profOption);
	}
	
	for (i in levels) {
		var levelOption = document.createElement("option");
		levelOption.text = i;
		document.getElementById("nivåLista").options.add(levelOption);
	}
	
	document.getElementById("folkslag").innerHTML = document.getElementById("folkslagsLista").value;
	document.getElementById("yrke").innerHTML = document.getElementById("yrkesLista").value;
	document.getElementById("nivå").innerHTML = document.getElementById("nivåLista").value;
	document.getElementById("Hand").innerHTML = calcHand();
	setFinalStats();
	setCL();
	calcKapital();
	/*
	for (i in skills) {
		var raceOption = document.createElement("option");
		raceOption.text = i;
		document.getElementById("färdighetsLista").options.add(raceOption);
	}
	*/
	return
}


function roll(array) {
// Slår tärning utifrån värde i lista: [antal, tärning, bonus]
	var rollSum = 0;
	for (rolls=0;rolls<array[0];rolls++) {
		var currentRoll = Math.floor(Math.random() * array[1]) + 1;
		rollSum += currentRoll;
	}
	return rollSum + array[2]
}


function rollStat() {
// Rullar 4T6, tar bort minsta värdet och summerar resten
	var thisRoll = [];
	var sum = 0;
	for (i=0;i<4;i++) {
		thisRoll.push(roll([1,6,0]))
	}
	thisRoll.sort(function (a, b){return b-a});
	thisRoll.pop();
	for (i=0;i<thisRoll.length;i++) {
		sum += thisRoll[i];
	}
	return sum
}


function rollStats() {
// Rullar 4T6 * 7 * 3 och sätter ut värdena i kolumnerna
	var firstCol = document.getElementsByName("first");
	var secondCol = document.getElementsByName("second");
	var thirdCol = document.getElementsByName("third");
	var len = firstCol.length;
	for (var i=0;i<len;i++) {
		firstCol.item(i).innerHTML = rollStat();;
		secondCol.item(i).innerHTML = rollStat();;
		thirdCol.item(i).innerHTML = rollStat();;
	}
	document.getElementById("first").checked = true;
	addStatValues(document.getElementById("first"));
	return
}


function addStatValues(element) {
// Adderar vald kolumn till listan med valbara värden
	statValues = [];
	var thisList = document.getElementsByName(element.id);
	for (var i=0;i<thisList.length;i++) {
		statValues.push(Number(thisList.item(i).innerHTML));
	}
	for (var i=0;i<statValues.length;i++) {
		document.getElementsByName("chosenStats").item(i).value = statValues[i];
	}
	return thisList
}


function moveStatUp(element) {
// Flyttar byter värde på detta och övre värdet i listan
	var statMovedUp = document.getElementsByName("chosenStats").item(Number(element.id)).value;
	var statMovedDown = document.getElementsByName("chosenStats").item(Number(element.id) - 1).value;
	document.getElementsByName("chosenStats").item(element.id).value = statMovedDown;
	document.getElementsByName("chosenStats").item(Number(element.id) - 1).value = statMovedUp;
	setFinalStats();
	setCL();
	return
}


function moveStatDown(element) {
// Flyttar byter värde på detta och undre värdet i listan
	var statMovedDown = document.getElementsByName("chosenStats").item(Number(element.id) + 1).value;
	var statMovedUp = document.getElementsByName("chosenStats").item(Number(element.id)).value;
	document.getElementsByName("chosenStats").item(Number(element.id) + 1).value = statMovedUp;
	document.getElementsByName("chosenStats").item(Number(element.id)).value = statMovedDown;
	setFinalStats();
	setCL();
	return
}


function setThisText(name, element) {
// Sätter innerHTML i en name-grupp utifrån värdet i textinput
	var elements = document.getElementsByName(name);
	for (i=0;i<elements.length;i++) {
		if (elements[i].id == element.id) {
			elements[i].innerHTML = element.value;
		}
	}
	return element.id
}


function setFinalStats() {
// Beräknar och sätter grundegenskaperna utifrån valt folkslag
	var src = document.getElementsByName("chosenStats");
	var dest = document.getElementsByName("finalStats");
	var race = document.getElementById("folkslag").innerHTML;
	
	for (var i=0;i<src.length;i++) {
		dest.item(i).innerHTML = Number(src.item(i).value) + Number(races[race][dest.item(i).id]);
	}
	setCL();
	
	document.getElementById("Bärförmåga").innerHTML = document.getElementById("STY").innerHTML + " kg";
	document.getElementById("Skadebonus").innerHTML = "+" + calcSB(document.getElementById("STY").innerHTML);
	document.getElementById("Förflyttning").innerHTML = calcFF(document.getElementById("SMI").innerHTML);
	document.getElementById("KP").innerHTML = calcKP(document.getElementById("STY").innerHTML, document.getElementById("FYS").innerHTML);
	document.getElementById("Läkning").innerHTML = calcNL(document.getElementById("FYS").innerHTML);
	document.getElementById("Vila").innerHTML = calcVila(document.getElementById("PSY").innerHTML);
	document.getElementById("Forcera").innerHTML = calcFR();
	
	
	
	return
}


function calcKP(FYS, STY) {
// Beräknar KP utifrån FYS och STY
	return (Number(FYS) + Number(STY))
}


function calcSB(STY) {
// Beräknar skadebonus utifrån STY
	if (Number(STY) < 16) {
		return 0
	}
	else {
		if (Number(STY) > 20) {
			STY = 20;
		}
		return (Number(STY) - 15)
	}
}


function calcFR() {
// Beräknar Forcera/Retirera utifrån FYS och SMI
	return Math.floor((Number(document.getElementById("FYS").innerHTML) + Number(document.getElementById("SMI").innerHTML)) / 2)
}


function calcKapital() {
// Räknar ut och sätter socialt stånd och startkapital
	var coinRoll = roll([1,10,0]);
	var standRoll = roll([1,10,0]);
	var coins = 0;
	
	// Beräkna grundstartkapital
	if (coinRoll == 1) {
		coins += roll([2,6,5]);
	}
	else if (coinRoll > 1 && coinRoll < 4) {
		coins += roll([3,6,5]);
	}
	else if (coinRoll > 3 && coinRoll < 8) {
		coins += roll([4,6,5]);
	}
	else if (coinRoll > 7 && coinRoll < 10) {
		coins += roll([5,6,5]);
	}
	else {
		coins += roll([6,6,5]);
	}
	
	// Beräkna socialt stånd och multiplicera startkapital
	if (standRoll == 1) {
		document.getElementById("stand").innerHTML = "Adel";
		document.getElementById("startKapital").innerHTML = coins * 10;
	}
	else if (standRoll > 1 && standRoll < 4) {
		document.getElementById("stand").innerHTML = "Överklass";
		document.getElementById("startKapital").innerHTML = coins * 5;
	}
	else if (standRoll > 3 && standRoll < 8) {
		document.getElementById("stand").innerHTML = "Medelklass";
		document.getElementById("startKapital").innerHTML = coins * 2; 
	}
	else if (standRoll > 7 && standRoll < 10) {
		document.getElementById("stand").innerHTML = "Underklass";
		document.getElementById("startKapital").innerHTML = coins * 1; 
	}
	else {
		document.getElementById("stand").innerHTML = "Egendomslös";
		document.getElementById("startKapital").innerHTML = coins * 0.5;
	}
	return
}


function calcNL(FYS) {
// Beräknar naturlig läkning utifrån FYS
	if (Number(FYS) < 15) {
		return 1 + " KP/Full sömn"
	}
	else if (Number(FYS) > 14 && Number(FYS) < 17) {
		return 2 + " KP/Full sömn"
	}
	else {
		if (Number(FYS) > 19) {
			FYS = 19;
		}
		return (Number(FYS) - 14) + " KP/Full sömn"
	}
}


function calcVila(PSY) {
// Beräknar full sömn utifrån PSY
	if (Number(PSY) < 18) {
		return 8 + " timmar"
	}
	else if (Number(PSY) == 18) {
		return 7 + " timmar"
	}
	else if (Number(PSY) == 19) {
		return 6 + " timmar"
	}
	else {
		return 5 + " timmar"
	}
}


function calcHand() {
// Beräknar hänthet med 1T10
	var handRoll = roll([1,10,0]);
	if (handRoll < 8) {
		return "Höger"
	}
	else {
		return "Vänster"
	}
}


function calcFF(SMI) {
// Beräknar förflyttning utifrån SMI
	var race = document.getElementById("folkslag").innerHTML;
	if (Number(SMI) < 16) {
		var bonus = 0;
	}
	else {
		if (Number(SMI) > 20) {
			SMI = 20;
		}
		var bonus = (Number(SMI) - 15);
	}
	return "L " + (races[race]["L"] + bonus)
}


function setCL() {
// Beräknar och sätter baschans i alla färdigheter
	var skillList = document.getElementsByName("finalSkills");
	var prof = document.getElementById("yrke").innerHTML;
	var thisSkills = [];
	
	for (var i=0;i<skillList.length;i++) {
		var currSkill = skillList.item(i).id;
		var statTotal = 0;
		for (var i2=0;i2<skills[currSkill].length;i2++) {
			statTotal += Number(document.getElementById(skills[currSkill][i2]).innerHTML);
		}
		statTotal = Math.floor((statTotal / skills[currSkill].length));
		statTotal = statTotal * professions[prof][currSkill];
		document.getElementById(currSkill).innerHTML = statTotal;
		thisSkills.push(currSkill + ": " + statTotal);
	}
	return thisSkills
}

/*
###############
### Klasser ###
###############
*/
