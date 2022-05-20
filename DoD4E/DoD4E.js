/*
###################################
### Drakar & Demoner Expert + 4	###
### Karaktärsgenerator Husregel ###
###################################
### 1. Variabler och objekt		###
### 2. Funktioner				###
### 3. Classes					###
###################################
*/
/*
###############################
### 1. Variabler och objekt	###
###############################
*/

var races = {
	"Halvalv": {"STY": [3,6,0], "FYS": [3,6,0], "STO": [2,6,6], "SMI": [3,6,2], "INT": [3,6,0], "PSY": [3,6,0], "KAR": [3,6,1], "F": "L10"},
	"Halvlängdsman": {"STY": [2,6,0], "FYS": [2,6,6], "STO": [1,3,2], "SMI": [4,6,0], "INT": [3,6,0], "PSY": [2,6,6], "KAR": [3,6,0], "F": "L8"},
	"Högman": {"STY": [3,6,3], "FYS": [3,6,3], "STO": [3,6,5], "SMI": [3,6,0], "INT": [3,6,0], "PSY": [3,6,0], "KAR": [2,6,3], "F": "L10"},
	"Magir": {"STY": [2,6,1], "FYS": [4,6,1], "STO": [2,6,0], "SMI": [2,6,3], "INT": [3,6,0], "PSY": [5,6,0], "KAR": [2,6,2], "F": "L10"},
	"Raggman": {"STY": [4,6,2], "FYS": [4,6,0], "STO": [4,6,0], "SMI": [2,6,1], "INT": [3,6,0], "PSY": [1,6,2], "KAR": [2,6,0], "F": "L10"},
	"Skogsman": {"STY": [3,6,0], "FYS": [3,6,0], "STO": [1,6,4], "SMI": [1,6,2], "INT": [3,6,0], "PSY": [2,6,1], "KAR": [2,6,0], "F": "L10"},
	"Barbier": {"STY": [3,6,2], "FYS": [3,6,0], "STO": [2,6,4], "SMI": [2,6,3], "INT": [3,6,0], "PSY": [3,6,0], "KAR": [3,6,0], "F": "L10"},
	"Dalker": {"STY": [3,6,0], "FYS": [3,6,0], "STO": [3,6,0], "SMI": [3,6,0], "INT": [3,6,0], "PSY": [3,6,0], "KAR": [3,6,0], "F": "L10"},
	"Ereboser": {"STY": [3,6,0], "FYS": [3,6,0], "STO": [2,6,5], "SMI": [3,6,0], "INT": [3,6,0], "PSY": [3,6,0], "KAR": [3,6,1], "F": "L10"},
	"Felicier": {"STY": [3,6,1], "FYS": [3,6,2], "STO": [3,6,0], "SMI": [3,6,0], "INT": [3,6,0], "PSY": [3,6,3], "KAR": [3,6,0], "F": "L10"},
	"Hynsolger": {"STY": [3,6,0], "FYS": [3,6,0], "STO": [2,6,3], "SMI": [3,6,0], "INT": [3,6,0], "PSY": [3,6,0], "KAR": [3,6,0], "F": "L10"},
	"Magiller": {"STY": [3,6,0], "FYS": [3,6,0], "STO": [3,6,0], "SMI": [3,6,0], "INT": [3,6,0], "PSY": [3,6,0], "KAR": [3,6,3], "F": "L10"},
	"Ransarder": {"STY": [3,6,2], "FYS": [3,6,1], "STO": [3,6,0], "SMI": [2,6,2], "INT": [3,6,0], "PSY": [3,6,1], "KAR": [2,6,2], "F": "L10"},
	"Frostalv": {"STY": [2,6,5], "FYS": [2,6,8], "STO": [2,4,5], "SMI": [3,6,3], "INT": [3,6,0], "PSY": [3,6,0], "KAR": [3,6,2], "F": "L10"},
	"Grottalv": {"STY": [2,6,2], "FYS": [2,6,3], "STO": [2,4,5], "SMI": [3,6,2], "INT": [4,6,0], "PSY": [3,6,0], "KAR": [3,6,0], "F": "L10"},
	"Gråalv": {"STY": [2,6,1], "FYS": [2,6,2], "STO": [2,4,7], "SMI": [3,6,1], "INT": [4,6,0], "PSY": [3,6,0], "KAR": [3,6,2], "F": "L10/S8"},
	"Högalv": {"STY": [2,6,3], "FYS": [1,6,2], "STO": [2,4,7], "SMI": [3,6,0], "INT": [4,6,0], "PSY": [4,6,1], "KAR": [3,6,0], "F": "L10"},
	"Ljusalv": {"STY": [2,6,3], "FYS": [3,6,0], "STO": [2,4,6], "SMI": [3,6,3], "INT": [4,6,0], "PSY": [3,6,0], "KAR": [3,6,2], "F": "L10"},
	"Silveralv": {"STY": [2,6,3], "FYS": [3,6,0], "STO": [2,4,5], "SMI": [3,6,3], "INT": [4,6,0], "PSY": [3,6,0], "KAR": [3,6,2], "F": "L10/F100"},
	"Skogsalv": {"STY": [2,6,3], "FYS": [3,6,0], "STO": [2,4,6], "SMI": [3,6,3], "INT": [4,6,0], "PSY": [3,6,0], "KAR": [3,6,2], "F": "L10"},
	"Dvärg": {"STY": [4,6,0], "FYS": [2,6,6], "STO": [2,4,1], "SMI": [3,6,0], "INT": [3,6,0], "PSY": [2,6,6], "KAR": [3,6,0], "F": "L8"},
	"Anka": {"STY": [2,6,0], "FYS": [2,6,6], "STO": [1,4,2], "SMI": [2,6,6], "INT": [3,6,0], "PSY": [3,6,0], "KAR": [2,6,1], "F": "L10"},
	"Karkion": {"STY": [3,6,0], "FYS": [4,6,0], "STO": [2,4,3], "SMI": [4,6,0], "INT": [3,6,6], "PSY": [3,6,6], "KAR": [3,6,0], "F": "L8/F30"},
	"Kattman": {"STY": [2,6,4], "FYS": [2,6,5], "STO": [2,3,4], "SMI": [2,6,9], "INT": [2,6,6], "PSY": [3,6,0], "KAR": [3,6,0], "F": "L10"},
	"Kentaur": {"STY": [3,6,6], "FYS": [3,6,0], "STO": [4,6,12], "SMI": [3,6,0], "INT": [3,6,0], "PSY": [3,6,0], "KAR": [3,6,0], "F": "L24"},
	"Vargman": {"STY": [4,6,0], "FYS": [3,6,3], "STO": [3,6,0], "SMI": [2,6,9], "INT": [3,6,0], "PSY": [3,6,0], "KAR": [2,6,2], "F": "L10"},
	"Människa": {"STY": [3,6,0], "FYS": [3,6,0], "STO": [3,6,0], "SMI": [3,6,0], "INT": [3,6,0], "PSY": [3,6,0], "KAR": [3,6,0], "F": "L10"},
	"Halvorch": {"STY": [3,6,2], "FYS": [3,6,2], "STO": [2,6,4], "SMI": [2,6,2], "INT": [3,6,0], "PSY": [3,6,0], "KAR": [2,6,1], "F": "L10"},
	"Alv": {"STY": [2,6,3], "FYS": [3,6,0], "STO": [2,6,2], "SMI": [3,6,3], "INT": [4,6,0], "PSY": [3,6,0], "KAR": [3,6,2], "F": "L10"},
	"Orch": {"STY": [4,6,0], "FYS": [3,6,0], "STO": [3,6,0], "SMI": [3,6,0], "INT": [2,6,3], "PSY": [3,6,0], "KAR": [2,6,0], "F": "L10"},
	"Jätte": {"STY": [3,6,50], "FYS": [1,6,18], "STO": [3,6,50], "SMI": [3,6,0], "INT": [2,6,3], "PSY": [3,6,0], "KAR": [1,6,0], "F": "L14"},
	"Grottroll": {"STY": [3,6,6], "FYS": [2,6,6], "STO": [3,6,6], "SMI": [3,6,0], "INT": [2,6,3], "PSY": [3,6,0], "KAR": [1,6,0], "F": "L10"},
	"Svartalf": {"STY": [2,6,2], "FYS": [3,6,0], "STO": [2,4,2], "SMI": [3,6,0], "INT": [2,6,2], "PSY": [3,6,0], "KAR": [2,6,0], "F": "L10"}
};


var ages = {
	"Ung": {"STY": 0, "FYS": 0, "STO": 0, "SMI": 1, "INT": 0, "PSY": 0, "KAR": 0, "Startkapital": 1, "BP": 160},
	"Mogen": {"STY": 0, "FYS": 0, "STO": 0, "SMI": 0, "INT": 0, "PSY": 0, "KAR": 0, "Startkapital": 1.5, "BP": 220},
	"Medelålders": {"STY": -2, "FYS": -1, "STO": 0, "SMI": -1, "INT": 1, "PSY": 1, "KAR": 1, "Startkapital": 2, "BP": 280},
	"Gammal": {"STY": -3, "FYS": -2, "STO": 0, "SMI": -2, "INT": 0, "PSY": 2, "KAR": 0, "Startkapital": 2.5, "BP": 340}
};


var classes = {
	"Gycklare": {"SMI": 9, "Färdigheter": "Första Hjälpen, Områdeskännedom, Lätt vapen,  Judo, Slagsmål, Djurträning, Fiska, Jaga, Kanot, Köra Vagn, Orientering, Rida, Simma, Sjökunnighet, Skidåkning, Alla kommunikationsfärdigheter, Alla uppfattningsfärdigheter, Alla tjuvfärdigheter"},
	"Jägare": {"SMI": 0, "Färdigheter": "Första Hjälpen, Områdeskännedom, Zoologi, Båge, Lätt vapen, Hoppa, Klättra, Smyga, Alla uppfattningsfärdigheter, Alla vildmarksfärdigheter"},
	"Munk": {"INT": 0, "Färdigheter": "Astrologi, Botanik, Drogkunskap, Första Hjälpen, Läkeörtskunskap, Kulturkännedom, Läkekonst, Läsa/skriva språk, Områdeskännedom, Schack & Brädspel, Zoologi, Judo, Karate, Trästav, Hoppa, Klättra, Alla vildmarksfärdigheter, Alla kommunikationsfärdigheter (ej Överklass)"},
	"Köpman": {"INT": 9, "Färdigheter": "Administration/Juridik, Kulturkännedom, Första Hjälpen, Geografi, Hantverk, Historia, Läsa/skriva språk, Områdeskännedom, Räkning, Språkkunskap, Värdesätta, Lätt vapen, Stadskännedom, Kamouflage, Kanot, Köra Vagn, Rida, Alla kommunikationsfärdigheter, Alla uppfattningsfärdigheter"},
	"Lärd Man": {"INT": 9, "Färdigheter": "Alla lärdomsfärdigheter"},
	"Stråtrövare": {"SMI": 0, "Färdigheter": "Första Hjälpen, Områdeskännedom, Värdesätta, Slagsmål, Lätt vapen, Sköld, Bluff, Förhöra, Muta, Teckenspråk, Hoppa, Klättra, Smyga, Hasardspel, Undre Världen, Änterhake, Alla uppfattningsfärdigheter, Alla vildmarksfärdigheter (utom Navigera och Sjökunnighet)"},
	"Pirat": {"SMI": 0, "Färdigheter": "Första Hjälpen, Geografi, Värdesätta, Förhöra, Tala språk, Upptäcka Fara, Hoppa, Klättra, Hasardspel, Stadskännedom, Undre Världen, Änterhake, Fiska, Navigera, Simma, Sjökunnighet, Alla stridsfärdigheter (utom Judo och Karate)"},
	"Sjöfarare": {"SMI": 0, "Färdigheter": "Första Hjälpen, Geografi, Värdesätta, Förhöra, Tala språk, Upptäcka Fara, Hoppa, Klättra, Hasardspel, Stadskännedom, Undre Världen, Änterhake, Fiska, Navigera, Simma, Sjökunnighet, Alla stridsfärdigheter (utom Judo och Karate)"},
	"Tjuv": {"SMI": 9, "Färdigheter": "Första Hjälpen, Värdesätta, Judo, Slagsmål, Dolk, Dra Vapen, Alla uppfattningsfärdigheter, Alla tjuvfärdigheter, Alla kommunikationsfärdigheter (utom Överklasstil och Tala Språk)"},
	"Trollkarl": {"INT": 9, "Färdigheter": "Magiskolor, Besvärjelser, Fyra Valfria Färdigheter"},
	"Riddare": {"STY": 9, "Färdigheter": "Administation/Juridik, Första Hjälpen, Kulturkännedom, Geografi, Heraldik, Historia, Kunskap om Magi, Läsa/Skriva Språk, Områdeskännedom, Räkning, Schack & Brädspel, Språkkunskap, Upptäcka Fara, Ilmarsch, Orientering, Rida, Alla kommunikationsfärdigheter, Alla stridsfärdigheter (utom Judo och Karate)"},
	"Krigare": {"STY": 9, "Färdigheter": "Geografi, Första Hjälpen, Områdeskännedom, Värdesätta, Alla vapenfärdigheter (ej Judo och Karate), Förhöra, Upptäcka Fara, Klättra, Hoppa, Fiska, Ilmarsch, Jaga, Kamouflage, Orientering, Rida, Simma"}
}


var skills = {
	"Administration/Juridik": {"GC": 0, "Kostnad": 4},
	"Astrologi": {"GC": 0, "Kostnad": 4},
	"Botanik": {"GC": 0, "Kostnad": 2},
	"Drogkunskap": {"GC": 0, "Kostnad": 5},
	"Läkeörtskunskap": {"GC": 0, "Kostnad": 3},
	"Giftkunskap": {"GC": 0, "Kostnad": 3},
	"Första Hjälpen": {"GC": "INT", "Kostnad": 1},
	"Geografi": {"GC": 0, "Kostnad": 5},
	"Geologi": {"GC": 0, "Kostnad": 2},
	"Hantverk (B)": {"GC": 0, "Kostnad": 8},
	"Heraldik": {"GC": 0, "Kostnad": 1},
	"Historia": {"GC": 0, "Kostnad": 3},
	"Kulturkännedom": {"GC": 0, "Kostnad": 1},
	"Kunskap om Magi": {"GC": 0, "Kostnad": 10},
	"Magiskolor": {"GC": 0, "Kostnad": 5},
	"Besvärjelse (S1-3)": {"GC": 0, "Kostnad": 2},
	"Besvärjelse (S4-6)": {"GC": 0, "Kostnad": 4},
	"Besvärjelse (S7-9)": {"GC": 0, "Kostnad": 6},
	"Besvärjelse (S10-12)": {"GC": 0, "Kostnad": 8},
	"Besvärjelse (S13-15)": {"GC": 0, "Kostnad": 10},
	"Besvärjelse (S16-18)": {"GC": 0, "Kostnad": 12},
	"Besvärjelse (S19-21)": {"GC": 0, "Kostnad": 14},
	"Besvärjelse (S22-24)": {"GC": 0, "Kostnad": 16},
	"Besvärjelse (S25-27)": {"GC": 0, "Kostnad": 18},
	"Läkekonst": {"GC": 0, "Kostnad": 5},
	"Områdeskännedom": {"GC": 0, "Kostnad": 2},
	"Räkning": {"GC": 0, "Kostnad": 4},
	"Schack & Brädspel": {"GC": 0, "Kostnad": 1},
	"Språkkunskap": {"GC": 0, "Kostnad": 2},
	"Värdesätta": {"GC": 0, "Kostnad": 5},
	"Zoologi": {"GC": 0, "Kostnad": 3},
	"Dra Vapen": {"GC": "SMI", "Kostnad": 2},
	"Judo": {"GC": 0, "Kostnad": 2},
	"Karate": {"GC": 0, "Kostnad": 3},
	"Taktik": {"GC": 0, "Kostnad": 3},
	"Två Vapen": {"GC": 0, "Kostnad": 4},
	"Bluff": {"GC": "KAR", "Kostnad": 2},
	"Förhöra": {"GC": 0, "Kostnad": 3},
	"Köpslå": {"GC": 0, "Kostnad": 3},
	"Muta": {"GC": 0, "Kostnad": 2},
	"Sjunga & Spela (B)": {"GC": 0, "Kostnad": 8},
	"Teckenspråk (B)": {"GC": 0, "Kostnad": 8},
	"Överklasstil": {"GC": 0, "Kostnad": 2},
	"Övertala": {"GC": "KAR", "Kostnad": 2},
	"Akrobatik (B)": {"GC": 0, "Kostnad": 8},
	"Förklädnad": {"GC": 0, "Kostnad": 2},
	"Gömma Sig": {"GC": "INT", "Kostnad": 2},
	"Hantera Fällor": {"GC": 0, "Kostnad": 4},
	"Hasardspel": {"GC": "INT", "Kostnad": 2},
	"Hoppa": {"GC": "SMI", "Kostnad": 1},
	"Klättra": {"GC": "SMI", "Kostnad": 1},
	"Låsdyrkning": {"GC": 0, "Kostnad": 2},
	"Skugga": {"GC": 0, "Kostnad": 2},
	"Smyga": {"GC": "SMI", "Kostnad": 2},
	"Stadskännedom": {"GC": 0, "Kostnad": 1},
	"Stjäla Föremål": {"GC": 0, "Kostnad": 3},
	"Undre Världen": {"GC": 0, "Kostnad": 1},
	"Änterhake": {"GC": "SMI", "Kostnad": 1},
	"Finna Dolda Ting": {"GC": "INT", "Kostnad": 2},
	"Lyssna": {"GC": "INT", "Kostnad": 2},
	"Provsmaka": {"GC": 0, "Kostnad": 3},
	"Upptäcka Fara": {"GC": "PSY", "Kostnad": 4},
	"Djurträning": {"GC": 0, "Kostnad": 3},
	"Fiska": {"GC": "INT", "Kostnad": 1},
	"Grottorientering": {"GC": 0, "Kostnad": 5},
	"Ilmarsch": {"GC": "FYS", "Kostnad": 2},
	"Jaga": {"GC": 0, "Kostnad": 2},
	"Kamouflage": {"GC": 0, "Kostnad": 2},
	"Kanot": {"GC": "SMI", "Kostnad": 2},
	"Köra Vagn": {"GC": "SMI", "Kostnad": 2},
	"Navigera": {"GC": 0, "Kostnad": 3},
	"Orientering": {"GC": "INT", "Kostnad": 2},
	"Rida": {"GC": "SMI", "Kostnad": 2},
	"Simma (B)": {"GC": 0, "Kostnad": 6},
	"Sjökunnighet": {"GC": 0, "Kostnad": 2},
	"Skidåkning": {"GC": "SMI", "Kostnad": 2},
	"Skridskoåkning": {"GC": 0, "Kostnad": 2},
	"Spåra": {"GC": 0, "Kostnad": 2},
	"Överlevnad": {"GC": 0, "Kostnad": 5},
	"Vapenfärdigheter": {"GC": "SMI", "Kostnad": 2},
	"Människospråk (B) (Tala)": {"GC": 0, "Kostnad": 4},
	"Människospråk (B) (Läsa/Skriva)": {"GC": 0, "Kostnad": 8},
	"Modersmålet (B) (Läsa/Skriva)": {"GC": 0, "Kostnad": 8},
	"Alvspråket (B) (Tala)": {"GC": 0, "Kostnad": 12},
	"Alvspråket (B) (Läsa/Skriva)": {"GC": 0, "Kostnad": 12},
	"Dvärgspråket (B) (Tala)": {"GC": 0, "Kostnad": 12},
	"Dvärgspråket (B) (Läsa/Skriva)": {"GC": 0, "Kostnad": 16},
	"Svartiska (B) (Tala)": {"GC": 0, "Kostnad": 8},
	"Svartiska (B) (Läsa/Skriva)": {"GC": 0, "Kostnad": 12},
	"Ödlespråken (B) (Tala)": {"GC": 0, "Kostnad": 14},
	"Ödlespråken (B) (Läsa/Skriva)": {"GC": 0, "Kostnad": 14},
	"Uråldriga språk (B) (Tala)": {"GC": 0, "Kostnad": 14},
	"Uråldriga språk (B) (Läsa/Skriva)": {"GC": 0, "Kostnad": 14},
	"Drakspråk (B) (Tala)": {"GC": 0, "Kostnad": 20},
	"Drakspråk (B) (Läsa/Skriva)": {"GC": 0, "Kostnad": 20},
	"Insektoidspråk (B) (Tala)": {"GC": 0, "Kostnad": 20},
	"Insektoidspråk (B) (Läsa/Skriva)": {"GC": 0, "Kostnad": 20}
};

var skillsList = [];

var stands = {
	"Adel": {"Tärning": [4,3,0], "Multipel": 150}, 
	"Borgare": {"Tärning": [3,3,0], "Multipel": 150}, 
	"Skattebonde": {"Tärning": [3,3,0], "Multipel": 150}, 
	"Egendomslös": {"Tärning": [1,3,0], "Multipel": 100}
}


/*
#######################
### 2. Funktioner	###
#######################
*/

// Rullar tärning utifrån array: [antal, maxvärde, plus]
function roll(array) {
	var rollSum = 0;
	for (rolls=0;rolls<array[0];rolls++) {
		var currentRoll = Math.floor(Math.random() * array[1]) + 1;
		rollSum += currentRoll;
	}
	return rollSum + array[2]
}

// Räknar ut höger/vänster/dubbelhänt
function calcHand(handRoll) {
	if (handRoll < 15) {
		return "Höger"
	}
	else if (handRoll > 14 && handRoll < 19) {
		return "Vänster"
	}
	else if (handRoll == 19) {
		return "Dubbelhänt"
	}
	else {
		return "Ambidextriös"
	}
}

// Räknar ut socialt stånd
function calcStand() {
	var humans = ["Människa","Barbier","Hynsolger","Felicier","Ransarder","Ereboser","Dalker"];
	var race = document.getElementById("ras").innerHTML;
	var diceRoll = roll([1,20,0]);
	if (humans.includes(race)) {
		if (diceRoll < 3) {
			return "Adel"
		}
		else if (diceRoll < 7 && diceRoll > 2) {
			return "Borgare"
		}
		else if (diceRoll < 11 && diceRoll > 6) {
			return "Skattebonde"
		}
		else {
			return "Egendomslös"
		}
	}
	else if (race == "Halvlängdsman") {
		if (diceRoll < 6) {
			return "Borgare"
		}
		else if (diceRoll < 16 && diceRoll > 5) {
			return "Skattebonde"
		}
		else {
			return "Egendomslös"
		}
	}
	else if (race == "Dvärg") {
		if (diceRoll < 4) {
			return "Adel"
		}
		else if (diceRoll < 12 && diceRoll > 3) {
			return "Borgare"
		}
		else {
			return "Egendomslös"
		}
	}
	else {
		return "Egendomslös"
	}
}

// Räknar ut kroppspoäng
function calcKP(fys, sto) {
	return Math.ceil((Number(fys) + Number(sto))/2)
}

// Räknar ut storlek i centimeter
function calcSize(size) {
	if (size < 3) {
		//console.log("Lägre än 3");
		var sizes = {0: "1-20", 1: "21-50", 2: "51-90"};
		return sizes[size] + " cm"
	}
	if (size > 2 && size < 12) {
		//console.log("Mellan 3 och 11");
		var minSize = 95;
		for (i=3;i<size;i++) {
			minSize += 10;
		}
		return minSize + " cm"
	}
	else {
		//console.log("12 eller mer");
		var minSize = 180;
		for (i=12;i<size;i++) {
			minSize += 5;
		}
		return minSize + " cm"
	}
}

// Räknar ut baschanser
function calcBC(number) {
	if (Number(number) < 4) {
		return 0
	}
	else if (Number(number) > 3 && Number(number) < 9) {
		return 1
	}
	else if (Number(number) > 8 && Number(number) < 13) {
		return 2
	}
	else if (Number(number) > 12 && Number(number) < 17) {
		return 3
	}
	else if (Number(number) > 16 && Number(number) < 21) {
		return 4
	}
	else {
		return 5
	}
}

// Räknar ut skadebonus (SB)
function calcSB(sty, sto) {
	var skadeBonus = Math.ceil((Number(sty) + Number(sto))/2);
	//console.log(Number(sty) + " + " + Number(sto) + " / 2 = " + skadeBonus);
	if (skadeBonus < 17) {
		return "Ingen"
	}
	else if (skadeBonus > 16 && skadeBonus < 21) {
		return "1T4"
	}
	else if (skadeBonus > 20 && skadeBonus < 26) {
		return "1T6"
	}
	else if (skadeBonus > 25 && skadeBonus < 31) {
		return "1T10"
	}	
	else if (skadeBonus > 30 && skadeBonus < 41) {
		return "2T6"
	}
	else if (skadeBonus > 40 && skadeBonus < 51) {
		return "3T6"
	}
	else {
		var baseDice = 4;
		var overKill = skadeBonus - 51;
		var extraDice = Math.floor(overKill/20);
		return baseDice + extraDice + "T6"
	}
}

// Sätter generella värdet i karaktärsbladet
function setThis(element) {
	//console.log(element.name);
	document.getElementById(element.name).innerHTML = document.getElementsByName(element.name).item(0).value;
	if (element.name == "yrke") {
		var classYrke = document.getElementById("yrke").innerHTML;
		document.getElementById("yrkesfärdigheter").innerHTML = classes[classYrke]["Färdigheter"];
	}
	else {
		rollStats();
	}
	return
}

/*
// Sätter åldersnivån och räknar ut grundegenskaper
function setAge(element) {
	setThis(element);
	return
}

// Sätter rollpersonens ras
function setRace(element) {
	setThis(element);
	return
}

// Sätter rollspersonens yrke
function setClass(element) {
	setThis(element);
	return
}
*/

// Sätter kostnad per vald färdighet
function setSkillCost() {
	var thisSkill = document.getElementById("färdighetsLista").value;
	document.getElementById("kostnad").value = skills[thisSkill]["Kostnad"];
	return
}

// Räknar ut BP-kostnad för färdigheter
function calcBPCost(färdighet="", bas=0, värde=0, custom=0) {
	if (custom == 0) {
		färdighet = document.getElementById("färdighetsLista").value;
		bas = document.getElementById("från").value;
		värde = document.getElementById("till").value;
		console.log(färdighet);
	}
	
	if (isNaN(document.getElementById("kostnad".value))) {
		alert("Kostnad måste anges som siffra!");
		return
	}
	
	document.getElementById("kostnad").value = Math.floor(document.getElementById("kostnad").value);
	
	if (isNaN(bas) || isNaN(värde)) {
		alert("Du behöver ange en siffra i fältet!");
		return
	}
	
	bas = Math.floor(bas);
	värde = Math.floor(värde);
	
	if (värde < bas) {
		alert("Till behöver ha ett större värde än Från!");
		return
	}
	
	if (färdighet.includes("(B)") && värde > 5) {
		alert("B-färdigheter kan högst vara 5, kostnad enbart beräknad till nivå 5!");
		värde = 5;
	}
	
	var multipel = skills[färdighet]["Kostnad"];
	var cost = 0;
	for (i=bas;i<värde;i++) {
		if (färdighet.includes("(B)")) {
			if (i < 3) {
				cost += multipel;
			}
			else if (i > 2 && i < 5) {
				cost += multipel * 2;
			}
			else {
				cost += multipel * 3;
			}
		}
		else {
			if (i < 11) {
				cost += multipel;			
			}
			else if (i > 10 && i < 15) {
				cost += multipel * 2;
			}
			else {
				cost += multipel * (3 + (Math.floor((i-15)/3)));
			}
		}
	}
	document.getElementById("BPkostnad").innerHTML = cost + " BP";
	return cost
}

// Sätter rollpersonens grundegenskaper och räknar ut deriverade värden
function setStats(element) {
	var thisSet = document.getElementsByName(element.id);
	var race = document.getElementById("ras").innerHTML;
	var classYrke = document.getElementById("yrke").innerHTML;
	
	// Sätter attribut
	for (i in thisSet) {
		var thisSource = thisSet.item(i).innerHTML;
		//console.log(document.getElementById(thisSet.item(i).attributes.stat.value));
		document.getElementById(thisSet.item(i).attributes.stat.value).innerHTML = thisSource;
	}
	var thisSTY = document.getElementById("STY").innerHTML;
	var thisFYS = document.getElementById("FYS").innerHTML;
	var thisSTO = document.getElementById("STO").innerHTML;
	
	// Sätter beräknade värden
	document.getElementById("kp").innerHTML = calcKP(thisFYS, thisSTO);
	document.getElementById("bep").innerHTML = thisSTY;
	document.getElementById("sb").innerHTML = calcSB(thisSTY, thisSTO);
	document.getElementById("längd").innerHTML = calcSize(thisSTO);
	
	// Räknar ut grundchanser och sätter värdena
	var grundChanser = document.getElementsByName("gc");
	for (i in grundChanser) {
		var currentSkill = skills[grundChanser.item(i).id];
		//console.log(skills[grundChanser.item(i).id]);
		if (currentSkill.GC == 0) {
			grundChanser.item(i).innerHTML = 0;
			continue
		}
		var currentLevel = document.getElementById(skills[grundChanser.item(i).id].GC).innerHTML;
		console.log(document.getElementById(grundChanser.item(i).id).innerHTML);
		grundChanser.item(i).innerHTML = calcBC(Number(currentLevel));
	}
	
	// Sätter ut extra grundchanser beroende på vald ras
	var alvFolk = ["Alv", "Frostalv", "Gråalv", "Högalv", "Ljusalv"];
	console.log(race);
	if (race == "Skogsalv") {
		document.getElementById("Orientering").innerHTML = Number(document.getElementById("Orientering").innerHTML) + Number(roll([1,2,0]));
		document.getElementById("Finna Dolda Ting").innerHTML = Number(document.getElementById("Finna Dolda Ting").innerHTML) + Number(roll([1,3,0]));
	}
	else if (race == "Silveralv") {
		document.getElementById("Orientering").innerHTML = Number(document.getElementById("Orientering").innerHTML) + 1;
		document.getElementById("Finna Dolda Ting").innerHTML = Number(document.getElementById("Finna Dolda Ting").innerHTML) + Number(roll([1,3,0]));
	}
	else if (race == "Grottalv") {
		document.getElementById("Lyssna").innerHTML = Number(document.getElementById("Lyssna").innerHTML) + roll([1,2,0]);
		document.getElementById("Finna Dolda Ting").innerHTML = Number(document.getElementById("Finna Dolda Ting").innerHTML) + Number(roll([1,3,0]));
	}
	else if (alvFolk.includes(race)) {
		document.getElementById("Finna Dolda Ting").innerHTML = Number(document.getElementById("Finna Dolda Ting").innerHTML) + Number(roll([1,3,0]));
	}
	else if (race == "Dvärg") {
		document.getElementById("Finna Dolda Ting").innerHTML = Number(document.getElementById("Finna Dolda Ting").innerHTML) + Number(roll([1,4,0]));
	}
	else if (race == "Kattman") {
		document.getElementById("Finna Dolda Ting").innerHTML = Number(document.getElementById("Finna Dolda Ting").innerHTML) + Number(roll([1,3,0]));
		document.getElementById("Upptäcka Fara").innerHTML = Number(document.getElementById("Upptäcka Fara").innerHTML) + Number(roll([1,2,0]));
		document.getElementById("Spåra").innerHTML = Number(document.getElementById("Spåra").innerHTML) + Number(roll([1,2,0]));
		document.getElementById("Jaga").innerHTML = Number(document.getElementById("Jaga").innerHTML) + Number(roll([1,2,0]));
	}
	else if (race == "Vargman") {
		document.getElementById("Upptäcka Fara").innerHTML = Number(document.getElementById("Upptäcka Fara").innerHTML) + Number(roll([1,2,0]));
		document.getElementById("Spåra").innerHTML = Number(document.getElementById("Spåra").innerHTML) + Number(roll([1,3,0]));
		document.getElementById("Jaga").innerHTML = Number(document.getElementById("Jaga").innerHTML) + Number(roll([1,3,0]));
		document.getElementById("Lyssna").innerHTML = Number(document.getElementById("Lyssna").innerHTML) + roll([1,3,0]);
		document.getElementById("Provsmaka").innerHTML = Number(document.getElementById("Provsmaka").innerHTML) + roll([1,3,0]);
	}
	else if (race == "Halvlängdsman") {
		document.getElementById("Provsmaka").innerHTML = Number(document.getElementById("Provsmaka").innerHTML) + roll([1,3,0]);
	}
	
	// Skriver ut yrkesfärdigheter
	document.getElementById("yrkesfärdigheter").innerHTML = classes[classYrke]["Färdigheter"];
	return
}

// Slår fram tre kolumner med egenskaper samt vapenhand
function rollStats() {
	var race = document.getElementById("ras").innerHTML;
	var age = document.getElementById("ålder").innerHTML;
	var raceStats = races[race];
	var ageStats = ages[age];
	var first = document.getElementsByName("first");
	var second = document.getElementsByName("second");
	var third = document.getElementsByName("third");
	for (i in first) {
		var currentStat = first.item(i).attributes.stat.value;
		var firstRoll = roll(raceStats[currentStat]) + ageStats[currentStat];
		if (firstRoll < 1) {
			firstRoll = 1;
		}
		var secondRoll = roll(raceStats[currentStat]) + ageStats[currentStat];
		if (secondRoll < 1) {
			secondRoll = 1;
		}
		var thirdRoll = roll(raceStats[currentStat]) + ageStats[currentStat];
		if (thirdRoll < 1) {
			thirdRoll = 1;
		}
		first.item(i).innerHTML = firstRoll;
		second.item(i).innerHTML = secondRoll;
		third.item(i).innerHTML = thirdRoll;
	}
	document.getElementById("hand").innerHTML = calcHand(roll([2,10,0]));
	setStats(document.getElementById("first"));
	document.getElementById("first").checked = true;
	document.getElementById("stand").innerHTML = calcStand();
	var stand = document.getElementById("stand").innerHTML;
	document.getElementById("bp").innerHTML = ageStats["BP"] + " BP";
	document.getElementById("kapital").innerHTML = (roll(stands[stand]["Tärning"]) * stands[stand]["Multipel"]) + " silver";
}

// Startfunktion för att ex. fylla i val (options) i listor (selects)
function initGen() {
	// Fyller i raser i raslistan
	for (i in races) {
		var raceOption = document.createElement("option");
		raceOption.text = i;
		document.getElementsByName("ras").item(0).options.add(raceOption);
	}
	
	// Fyller i åldrar i ålderslistan
	for (i in ages) {
		var ageOption = document.createElement("option");
		ageOption.text = i;
		document.getElementsByName("ålder").item(0).options.add(ageOption);
	}
	
	// Fyller i yrken i yrkeslistan
	for (i in classes) {
		var classOption = document.createElement("option");
		classOption.text = i;
		document.getElementsByName("yrke").item(0).options.add(classOption);
	}
	
	for (i in skills) {
		var skillOption = document.createElement("option");
		skillOption.text = i;
		document.getElementById("färdighetsLista").options.add(skillOption);
	}
	
	// Sätter grundvärden i karaktärsbladet
	if (document.getElementsByName("namn").item(0).value == "") {
		document.getElementById("namn").innerHTML = "Ej valt"
	}
	else {
		document.getElementById("namn").innerHTML = document.getElementsByName("namn").item(0).value;
	}
	
	if (document.getElementsByName("kön").item(0).value == "") {
		document.getElementById("kön").innerHTML = "Ej valt"
	}
	else {
		document.getElementById("kön").innerHTML = document.getElementsByName("kön").item(0).value;
	}
	document.getElementById("ras").innerHTML = document.getElementsByName("ras").item(0).value;
	document.getElementById("ålder").innerHTML = document.getElementsByName("ålder").item(0).value;
	document.getElementById("yrke").innerHTML = document.getElementsByName("yrke").item(0).value;
	
	// Påbörjar initial beräkning
	rollStats();
	setStats(document.getElementById("first"));
	setSkillCost();
	document.getElementById("från").value = 0;
	document.getElementById("till").value = 1;
	calcBPCost();
	return
}

function addSkill(state) {
	var skill = document.getElementById("färdighetsLista").value;
	var other = document.getElementById("fÖvrigt").value;
	var fv = document.getElementById("till").value;
	var kost = Number(document.getElementById("BPkostnad").innerHTML.replace("BP",""));
	var totalBP = Number(document.getElementById("bp").innerHTML.replace("BP",""));
	var totalKost = 0;
	var tableText = "<tr><th>Färdighet</th><th>Övrigt</th></th><th>FV</th><th>BP></th></tr>";
	if (state == true) {
		skillsList.push([skill, other, fv, kost]);
	}
	else {
		skillsList.pop();
	}
	for (i=0;i<skillsList.length;i++) {
		tableText += "<tr><td>" + skillsList[i][0] + "</td><td>" + skillsList[i][1] + "</td><td>" + skillsList[i][2] + "</td><td>" + skillsList[i][3] + "</td></tr>";
		totalKost += Number(skillsList[i][3]);
	}
	tableText += "</table><table><tr><th>Total BP-kostnad</th><th>BP Kvar</th></tr>"
	tableText += "<tr><td>" + totalKost + "</td><td>" + (Number(totalBP) - Number(totalKost)) + "</td><tr></table>";
	document.getElementById("köptaFärdigheter").innerHTML = tableText;
	return tableText
}

/*
###################
### 3. Classes	###
###################
*/
