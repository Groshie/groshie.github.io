// Skill stat relationship [Con, Dex, Int, Str, Wis]
const skills = {
    "covert": {
        "stealth": {
        "inside": [0, 3, 1, 1, 0],
        "outside": [0, 3, 1, 1, 0],
        "underwater": [0, 3, 1, 1, 0]
        },
        "hiding": {
        "person": [0, 2, 2, 1, 0],
        "object": [0, 2, 2, 1, 0]
        },
        "lockpick": {
        "doors": [0, 4, 1, 0, 0],
        "safes": [0, 4, 1, 0, 0],
        "traps": [0, 4, 1, 0, 0]
        },
        "manipulation": {
        "palming": [0, 2, 1, 2, 0],
        "passing": [0, 2, 1, 2, 0],
        "sleight-of-hand": [0, 2, 1, 2, 0],
        "stealing": [0, 2, 1, 2, 0]
        },
        "casing": {
        "person": [0, 1, 2, 0, 2],
        "place": [0, 1, 2, 0, 2]
        },
        "items": {
        "poisons": [0, 1, 4, 0, 0],
        "traps": [0, 1, 4, 0, 0],
        "weapons": [0, 1, 4, 0, 0]
        },
        "points": [1, 2, 2, 0, 0]
    },
    "crafts": {
        "smithing": {
        "gold": [0, 2, 2, 1, 0],
        "silver": [0, 2, 2, 1, 0],
        "black": {
            "tools": [0, 2, 2, 1, 0],
            "weapons": [0, 2, 2, 1, 0],
            "armour": [0, 2, 2, 1, 0]
        },
        "gem": {
            "cutting": [0, 2, 2, 1, 0],
            "polishing": [0, 2, 2, 1, 0],
            "setting": [0, 2, 2, 1, 0]
        },
        "locks": [0, 2, 2, 1, 0]
        },
        "mining": {
        "gem": [0, 1, 2, 2, 0],
        "ore": {
            "panning": [0, 1, 2, 2, 0]
        },
        "mineral": [0, 1, 2, 2, 0]
        },
        "hunting": {
        "tracking": [0, 2, 3, 0, 0],
        "fishing": [0, 2, 3, 0, 0],
        "trapping": [0, 2, 3, 0, 0],
        "foraging": [0, 2, 3, 0, 0]
        },
        "carpentry": {
        "furniture": [0, 2, 2, 1, 0],
        "coopering": [0, 2, 2, 1, 0],
        "turning": [0, 2, 2, 1, 0],
        "whittling": [0, 2, 2, 1, 0]
        },
        "pottery": {
        "forming": {
            "throwing": [0, 3, 2, 0, 0],
            "shaping": [0, 3, 2, 0, 0]
        },
        "glazing": [0, 3, 2, 0, 0],
        "staining": [0, 3, 2, 0, 0],
        "firing": [0, 3, 2, 0, 0]
        },
        "materials": {
        "tanning": [0, 2, 2, 1, 0],
        "leatherwork": [0, 2, 2, 1, 0],
        "weaving": [0, 2, 2, 1, 0],
        "spinning": [0, 2, 2, 1, 0],
        "needlework": [0, 2, 2, 1, 0],
        "dyeing": [0, 2, 2, 1, 0]
        },
        "husbandry": {
        "plant": {
            "edible": [0, 0, 3, 0, 2],
            "herbal": [0, 0, 3, 0, 2],
            "milling": [0, 0, 3, 0, 2],
            "tree": [0, 0, 3, 0, 2]
        },
        "animal": {
            "grooming": [0, 0, 3, 0, 2],
            "breeding": [0, 0, 3, 0, 2],
            "slaughtering": [0, 0, 3, 0, 2]
        }
        },
        "culinary": {
        "cooking": [0, 2, 3, 0, 0],
        "baking": [0, 2, 3, 0, 0],
        "butchering": [0, 2, 3, 0, 0],
        "preserving": [0, 2, 3, 0, 0],
        "brewing": [0, 2, 3, 0, 0],
        "distilling": [0, 2, 3, 0, 0]
        },
        "medicine": {
        "firstaid": [0, 1, 2, 0, 2],
        "diagnosis": [0, 1, 2, 0, 2],
        "treatment": {
            "disease": [0, 1, 2, 0, 2],
            "injury": [0, 1, 2, 0, 2],
            "poison": [0, 1, 2, 0, 2]
        }
        },
        "arts": {
        "design": [0, 1, 4, 0, 0],
        "calligraphy": [0, 1, 4, 0, 0],
        "drawing": [0, 1, 4, 0, 0],
        "painting": [0, 1, 4, 0, 0],
        "printing": [0, 1, 4, 0, 0],
        "sculpture": [0, 1, 4, 0, 0],
        "theatre": [0, 1, 4, 0, 0]
        },
        "music": {
        "instruments": {
            "percussion": [0, 1, 4, 0, 0],
            "wind": [0, 1, 4, 0, 0],
            "stringed": [0, 1, 4, 0, 0],
            "keyboard": [0, 1, 4, 0, 0],
            "vocal": [0, 1, 4, 0, 0]
        },
        "special": [0, 1, 4, 0, 0],
        "theory": [0, 1, 4, 0, 0],
        "performance": [0, 1, 4, 0, 0]
        },
        "points": [0, 2, 2, 0, 1]
    },
    "faith": {
        "rituals": {
        "offensive": {
            "area": [0, 0, 1, 2, 2],
            "target": [0, 0, 1, 2, 2]
        },
        "defensive": {
            "area": [0, 2, 1, 0, 2],
            "self": [0, 2, 1, 0, 2],
            "target": [0, 2, 1, 0, 2]
        },
        "curing": {
            "self": [2, 0, 1, 0, 2],
            "target": [2, 0, 1, 0, 2]
        },
        "misc": {
            "area": [0, 0, 2, 0, 3],
            "self": [0, 0, 2, 0, 3],
            "target": [0, 0, 2, 0, 3]
        },
        "special": [0, 0, 1, 1, 3]
        },
        "items": {
        "rod": [0, 1, 2, 0, 2],
        "scroll": [0, 1, 2, 0, 2]
        },
        "points": [1, 0, 2, 0, 2]
    },
    "fighting": {
        "melee": {
        "dagger": [0, 4, 0, 1, 0],
        "sword": [0, 3, 0, 2, 0],
        "heavy-sword": [1, 1, 0, 3, 0],
        "axe": [1, 1, 0, 3, 0],
        "mace": [2, 1, 0, 2, 0],
        "flail": [1, 2, 0, 2, 0],
        "polearm": [2, 0, 0, 3, 0],
        "misc": [1, 2, 0, 2, 0]
        },
        "range": {
        "thrown": [0, 3, 0, 2, 0],
        "fired": [0, 4, 0, 1, 0]
        },
        "unarmed": {
        "striking": [0, 2, 0, 1, 2],
        "grappling": [0, 2, 0, 2, 1]
        },
        "defence": {
        "parrying": [0, 3, 0, 1, 1],
        "blocking": [0, 2, 0, 2, 1],
        "dodging": [0, 4, 0, 0, 1]
        },
        "special": {
        "weapon": [0, 1, 3, 1, 0],
        "unarmed": [0, 2, 3, 0, 0],
        "tactics": [0, 0, 3, 0, 2],
        "mounted": [2, 2, 0, 0, 1]
        },
        "points": [2, 1, 0, 2, 0]
    },
    "magic": {
        "spells": {
        "offensive": [0, 0, 2, 2, 1],
        "defensive": [2, 0, 2, 0, 1],
        "misc": [0, 2, 2, 0, 1],
        "special": [0, 0, 2, 0, 3]
        },
        "methods": {
        "elemental": {
            "air": [3, 0, 2, 0, 0],
            "earth": [3, 0, 2, 0, 0],
            "fire": [3, 0, 2, 0, 0],
            "water": [3, 0, 2, 0, 0]
        },
        "mental": {
            "animating": [0, 0, 5, 0, 0],
            "channeling": [0, 0, 5, 0, 0],
            "charming": [0, 0, 5, 0, 0],
            "convoking": [0, 0, 5, 0, 0],
            "cursing": [0, 0, 5, 0, 0]
        },
        "physical": {
            "binding": [0, 3, 2, 0, 0],
            "brewing": [0, 3, 2, 0, 0],
            "chanting": [0, 3, 2, 0, 0],
            "dancing": [0, 3, 2, 0, 0],
            "enchanting": [0, 3, 2, 0, 0],
            "evoking": [0, 3, 2, 0, 0],
            "healing": [0, 3, 2, 0, 0],
            "scrying": [0, 3, 2, 0, 0]
        },
        "spiritual": {
            "abjuring": [0, 0, 2, 0, 3],
            "banishing": [0, 0, 2, 0, 3],
            "conjuring": [0, 0, 2, 0, 3],
            "divining": [0, 0, 2, 0, 3],
            "summoning": [0, 0, 2, 0, 3]
        }
        },
        "items": {
        "held": {
            "wand": [0, 1, 2, 0, 2],
            "rod": [0, 1, 2, 0, 2],
            "staff": [0, 1, 2, 0, 2],
            "broom": [0, 1, 2, 0, 2]
        },
        "worn": {
            "amulet": [0, 1, 2, 0, 2],
            "ring": [0, 1, 2, 0, 2]
        },
        "scroll": [0, 1, 2, 0, 2],
        "talisman": [0, 1, 2, 0, 2]
        },
        "points": [0, 0, 2, 1, 2]
    },
    "people": {
        "trading": {
        "buying": [0, 0, 4, 0, 1],
        "selling": [0, 0, 4, 0, 1],
        "valueing": {
            "gems": [0, 0, 4, 0, 1],
            "jewellery": [0, 0, 4, 0, 1],
            "weapons": [0, 0, 4, 0, 1],
            "armour": [0, 0, 4, 0, 1]
        }
        },
        "teaching": {
        "covert": [1, 2, 2, 0, 0],
        "crafts": [0, 2, 2, 0, 1],
        "faith": [1, 0, 2, 0, 2],
        "fighting": [1, 2, 0, 2, 0],
        "magic": [0, 0, 2, 1, 2],
        "people": [1, 1, 1, 1, 1],
        "adventuring": [1, 1, 1, 1, 1]
        },
        "culture": {
        "ankh-morporkian": [0, 0, 3, 0, 2],
        "klatchian": [0, 0, 3, 0, 2],
        "agatean": [0, 0, 3, 0, 2],
        "lancrastian": [0, 0, 3, 0, 2],
        "genuan": [0, 0, 3, 0, 2]
        },
        "points": [1, 1, 1, 1, 1]
    },
    "adventuring": {
        "movement": {
        "swimming": [2, 2, 0, 1, 0],
        "riding": {
            "horse": [2, 2, 0, 1, 0],
            "camel": [2, 2, 0, 1, 0]
        },
        "climbing": {
            "tree": [2, 2, 0, 1, 0],
            "rock": [2, 2, 0, 1, 0],
            "rope": [2, 2, 0, 1, 0]
        },
        "sailing": [2, 2, 0, 1, 0],
        "following": {
            "pursuit": [2, 2, 0, 1, 0],
            "evade": [2, 2, 0, 1, 0]
        }
        },
        "acrobatics": {
        "tumbling": [1, 2, 0, 2, 0],
        "vaulting": [1, 2, 0, 2, 0],
        "balancing": [1, 2, 0, 2, 0]
        },
        "evaluating": {
        "weapons": [0, 0, 4, 0, 1],
        "armour": [0, 0, 4, 0, 1]
        },
        "perception": [0, 0, 2, 0, 3],
        "direction": [0, 2, 2, 0, 1],
        "health": [4, 0, 0, 1, 0],
        "points": [1, 1, 1, 1, 1]
    }
};

// Function to calculate the Capped ETB (CETB)
function calculateCETB(etb, studentBonus, isSpecialised) {
    if (isSpecialised) {
        return Math.min(etb, Math.max(studentBonus + 200, studentBonus * 1.5));
    } else {
        return Math.min(etb, Math.max(studentBonus + 150, studentBonus * 1.35));
    }
}

// Function to calculate the maximum relevant ETB
function maximumRelevantETB(studentBonus) {
    return Math.max(studentBonus + 200, studentBonus * 1.5);
}

// Function to compute the teaching cost
function computeTeachingCost(studentLevel, studentBonus, cetb) {
    let cost = 250;
    let minimum_k = 0.5 * studentBonus / 800 + 1;
    let maximum_k = 1.5;
    let simple_k = 0.5 * studentBonus / (cetb || 1) + 1;
    let k = maximum_k - (cetb - studentBonus * 1.0) /
            (maximumRelevantETB(studentBonus) - studentBonus) * (maximum_k - minimum_k);
    if (simple_k < k) k = simple_k;
    return 500 + Math.round(cost * studentLevel * Math.exp(studentLevel / 500.0) * k);
}

// Function to start the calculation and add the result to the page from form
function startCalc() {
    let thisSkill = document.getElementById("skill-select").value;
    let currentLevel = parseInt(document.getElementById("current-level").value);
    let wantedLevel = parseInt(document.getElementById("wanted-level").value);
    let teacherEtb = parseInt(document.getElementById("teacher-etb").value);
    let teacherSpec = document.getElementById("teacher-spec").value;
    let stats = setSkillStatRelation();

    if (teacherSpec == "No")
        teacherSpec = 0;
    else {
        teacherSpec = 1;
    }

    let result = calculateCostsForLevels(currentLevel, wantedLevel, stats, teacherEtb, teacherSpec);

    let thisRow = document.createElement("tr");
    let thisTd = document.createElement("td");
    thisTd.append(`The cost would be approximately ${result.toLocaleString()} xp to learn ${thisSkill} to level ${wantedLevel} (bonus: ${calculateSkillBonus(wantedLevel, stats)}) from ${teacherSpec == 0 ? 'an unspecialised' : 'a specialised'} teacher that has a teaching bonus of ${teacherEtb}.`);
    thisRow.append(thisTd);
    document.getElementById("log-table").append(thisRow);
    return
}

// Function to calculate the Raw Level Bonus (R)
function calculateRawLevelBonus(level) {
    if (level >= 0 && level <= 20) {
        return 5 * level;
    } else if (level >= 21 && level <= 40) {
        return Math.floor(2.5 * (level - 20) + 100);
    } else if (level >= 41 && level <= 60) {
        return 1 * (level - 40) + 150;
    } else if (level >= 61) {
        return Math.floor(0.5 * (level - 60) + 170);
    } else {
        throw new Error("Invalid level");
    }
}

// Function to calculate the Stat Multiplicator (M)
function calculateStatMultiplicator(a, b, c, d, e) {
    return (1 / 9.8) * Math.log(a * b * c * d * e) - 0.25;
}

// Function to calculate the Skill Bonus from stats and skill/stat relationship
function calculateSkillBonus(level, stats) {
    const [a, b, c, d, e] = stats;
    const M = calculateStatMultiplicator(a, b, c, d, e);
    const R = calculateRawLevelBonus(level);
    return Math.floor(M * R);
}

// Function to read the skill Json-data to make the select options
function readSkillList() {
    let skillList = [];

    for (skilltree in skills) {
        for (subcategory in skills[skilltree]) {
            if (Array.isArray(skills[skilltree][subcategory])) {
                skillList.push(skilltree + "." + subcategory); // e.g. ["fighting.points"]
            } else {
                for (subskill in skills[skilltree][subcategory]) {
                    if (Array.isArray(skills[skilltree][subcategory][subskill])) {
                        skillList.push(skilltree + "." + subcategory + "." + subskill);
                    } else {
                        for (leafskill in skills[skilltree][subcategory][subskill]) {
                            skillList.push(skilltree + "." + subcategory + "." + subskill + "." + leafskill);
                        }
                    }
                }
            }
        }
    }
    return skillList
}

// Function for getting the skill stat relationship
function getSkillStatRelation() {
    let thisSkill = document.getElementById("skill-select").value;

    thisSkill = document.getElementById("skill-select").value.split(".");

    if (thisSkill.length == 2) {
        return skills[thisSkill[0]][thisSkill[1]];
    }
    if (thisSkill.length == 3) {
        return skills[thisSkill[0]][thisSkill[1]][thisSkill[2]];
    }
    if (thisSkill.length == 4) {
        return skills[thisSkill[0]][thisSkill[1]][thisSkill[2]][thisSkill[3]];
    }
    if (thisSkill.length == 5) {
        return skills[thisSkill[0]][thisSkill[1]][thisSkill[2]][thisSkill[3]][thisSkill[4]];
    }
    return "Error!"
}

// Function for applying the current stats to the skill stat relationship
function setSkillStatRelation() {
    let constitution = parseInt(document.getElementById("con").value);
    let dexterity = parseInt(document.getElementById("dex").value);
    let intelligence = parseInt(document.getElementById("int").value);
    let strength = parseInt(document.getElementById("str").value);
    let wisdom = parseInt(document.getElementById("wis").value);
    let stats = [constitution, dexterity, intelligence, strength, wisdom];
    let thisStatRelation = getSkillStatRelation();
    let mySkillStat = [];

    for (let i=0;i<thisStatRelation.length;i++) {
        for (let j=0;j<thisStatRelation[i];j++) {
            mySkillStat.push(stats[i]);
        }
    }
    return mySkillStat
}

// Example usage with a for-loop to calculate costs for multiple levels
function calculateCostsForLevels(startLevel, endLevel, stats, etb, isSpecialised) {
    let costs = 0;
    for (let level = startLevel; level <= endLevel-1; level++) {
        let studentBonus = calculateSkillBonus(level, setSkillStatRelation());
        let cetb = calculateCETB(etb, studentBonus, isSpecialised);
        let cost = computeTeachingCost(level, studentBonus, cetb);
        costs += cost;
    }
    return costs;
}

window.addEventListener("DOMContentLoaded", function() {
    let skillList = readSkillList();
    
    for (skill of skillList) {
        let thisOption = document.createElement("option");
        thisOption.value = skill;
        thisOption.text = skill;

        document.getElementById("skill-select").appendChild(thisOption);
    }

    document.getElementById("calcButton").addEventListener("click", startCalc);
})