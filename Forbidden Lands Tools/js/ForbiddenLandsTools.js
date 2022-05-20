/* 
#################################
# Tools for Forbidden Lands RPG #
#################################
# Contents:                     #
# 1. Variables & Objects        #
# 2. Functions & Classes        #
# 3. Application                #
#################################
*/
/*
#############################
# 1. Variables & Objects    #
#############################
*/

// Declare allowed dice types and current dice select
const diceList = ["D6", "D8", "D10", "D12"];
const selectedDice = [["D6", "Strength"]]; // Always start with D6
const rollHistory = [];

// Declare general talents + spells and chosen talent list (does not include kin-talent)
const generalTalents = getData("data/generalTalents.json");
const selectedTalents = {};
const selectedItems = {
    "Eq": [],
    "Armors": [],
    "Weapons": []
};

const spells = getData("data/spells.json");

// Declare main skill object
const skills = getData("data/skills.json");

// Declare main kin object
const kins = getData("data/kins.json");

// Declare main profession object
const profs = getData("data/profs.json");

// Declare main age group object
const ages = getData("data/ages.json");

// Declare item objects
const items = getData("data/items.json");
const weapons = getData("data/weapons.json");
const armors = getData("data/armors.json");

// Declare critical injury object
const critDamage = getData("data/critInjuries.json");

/*
#############################
# 2. Functions & Classes    #
#############################
*/

// Function for rolling a Forbidden Lands-dice
function rollFlDice(max=6, successThreshold=max, fail=1) {
    // returns array: [roll, true/false, true/false]
    return [roll = Math.ceil(Math.random() * max), successThreshold-1<roll, fail==roll]
}

// Function for rolling a D66
function rollD66() {
    return parseInt(rollFlDice()[0].toString() + rollFlDice()[0].toString())
}

// Function for rolling and calculating several rollFlDice()
function skillRoll() {
    // Arguments are arrays: [number, "string"]
    let rollObj = {};
    rollObj.successes = 0;
    rollObj.fails = 0;
    rollObj.sum = 0;
    rollObj.rolls = [];

    // Create dice category properties as arrays
    for (var i=0;i<arguments.length;i++) {
        rollObj[arguments[i][1]] = [];
    }

    for (var i=0;i<arguments.length;i++) {
        for (var i2=0;i2<arguments[i][0];i2++) {
            // 1D6 example: rollObj["skill"] = [6, true, false]   
            rollObj[arguments[i][1]].push(rollFlDice(parseInt(arguments[i][1].substr(1)), 6, 1));

            // Count total successes and fails
            if (rollObj[arguments[i][1]][i2][1] == true) {
                // If diceroll is less than 7, add 1 success
                if (rollObj[arguments[i][1]][i2][0] < 8) {
                    rollObj.successes += 1;
                } else {
                    rollObj.successes += Math.floor((rollObj[arguments[i][1]][i2][0] - 6) / 2) + 1;
                }
            }
            if (rollObj[arguments[i][1]][i2][2] == true) {
                rollObj.fails++;
            }

            // Add current roll to list of rolls (array)
            rollObj.rolls.push(rollObj[arguments[i][1]][i2][0]);

            // Add total sum for fun
            rollObj.sum += rollObj[arguments[i][1]][i2][0];
        }
    }
    return rollObj
}

// Create initial table for adding or removing dice to roll
function createAddDiceTable() {
    // Create main table
    let table = document.createElement("table");
    table.id = "addDice-table";
    table.classList.add("table", "table-striped", "table-dark");

    // Create table head
    let tableHead = document.createElement("thead");
    let tableBody = document.createElement("tbody");
    let headRow = document.createElement("tr");
    let head1 = document.createElement("th");
    let head2 = document.createElement("th");
    let head3 = document.createElement("th");

    // Set headers of table head
    head1.innerHTML = "Dice";
    head2.innerHTML = "Type";
    head3.innerHTML = "+/-";

    // Append head to table
    headRow.append(head1, head2, head3);
    tableHead.append(headRow);
    table.append(tableHead, tableBody);

    // Create table control: Select containing dice list
    let diceSelect = document.createElement("select");
    diceSelect.classList.add("form-select-sm")
    diceSelect.id = "diceSelect";
    let thisOption = ""; // Options added later

    // Create table control: Input for typing which dice type
    let typeInput = document.createElement("input");
    typeInput.classList.add("form-control-sm");
    typeInput.id = "diceType";
    typeInput.placeholder = "Type";

    // Create buttons for adding/removing dice
    let addButton = document.createElement("button");
    let removeButton = document.createElement("button");
    addButton.classList.add("btn", "btn-primary", "btn-sm", "w-25", "h-25", "text-center");
    removeButton.classList.add("btn", "btn-primary", "btn-sm", "w-25", "h-25", "text-center");
    addButton.id = "diceAdd";
    removeButton.id = "diceRemove";
    addButton.innerHTML = "+";
    removeButton.innerHTML = "-";
    
    // Create row and cells to contain controls
    let tableRow = document.createElement("tr");
    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");
    let cell3 = document.createElement("td");

    // Append cells to row
    tableRow.append(cell1, cell2, cell3);

    // Append controls to cells;
    cell1.append(diceSelect);
    cell2.append(typeInput);
    cell3.append(addButton, " ", removeButton);

    // Append row to table body
    tableBody.append(tableRow);

    // Create options for dice select and append to select
    for (var i=0;i<diceList.length;i++) {
        thisOption = document.createElement("option");
        thisOption.text = diceList[i];
        diceSelect.options.add(thisOption);
    }

    // Append table to the dice-picker element
    document.getElementById("dice-picker").append(table);

    // Create dice rolling button
    let thisButton = document.createElement("button");
    thisButton.classList.add("btn", "btn-primary", "btn-lg");
    thisButton.id = "rollButton";
    thisButton.innerHTML = "Roll";
    table.append(thisButton);
    return
}

// Function for adding a dice type to roll
function setDiceTable() {
    let table = document.createElement("table");
    table.classList.add("table", "table-dark");
    let tableHead = document.createElement("thead");
    let headRow = document.createElement("tr");
    let head1 = document.createElement("th");
    let head2 = document.createElement("th");
    let head3 = document.createElement("th");
    let tableBody = document.createElement("tbody");

    head1.innerHTML = "Dice";
    head2.innerHTML = "Amount";
    head3.innerHTML = "";

    
    headRow.append(head1, head2, head3);
    tableHead.append(headRow);
    table.append(tableHead, tableBody);

    let thisRow = "";
    let thisCell1 = "";
    let thisCell2 = "";
    let thisCell3 = "";
    let thisRange = "";

    for (var i=0;i<selectedDice.length;i++) {
        thisRow = document.createElement("tr");
        thisCell1 = document.createElement("td");
        thisCell2 = document.createElement("td");
        thisCell3 = document.createElement("td");
        thisRange = document.createElement("input");
        thisRange.id = "diceGroup" + [i];
        thisRange.type = "range";
        thisRange.min = 0;
        thisRange.max = 20;
        thisRange.step = 1;
        thisRange.value = 0;
        thisRange.classList.add("form-range", "sm");
        
        thisCell1.innerHTML = selectedDice[i][0] + " (" + selectedDice[i][1] + ")";
        thisCell2.append(thisRange);
        thisCell3.innerHTML = 0;
        
        thisRow.append(thisCell1, thisCell2, thisCell3);
        table.append(thisRow);
    }
    document.getElementById("dice-list").innerHTML = "";
    document.getElementById("dice-list").append(table);
    document.getElementById("dice-picker").append(document.getElementById("dice-list"));
    if (selectedDice.length > 0) {
        thisRange.addEventListener("change", changeDiceValue);
    }
    document.getElementById("dice-picker").append(document.getElementById("rollButton"));
    return
}

// Adds the selected dice and type to table with range
function addDiceToTable() {
    let diceSides = document.getElementById("diceSelect").value;
    let type = document.getElementById("diceType").value.toString();

    if (type == "") {
        selectedDice.push([diceSides, "Generic"]);
    } else {
        selectedDice.push([diceSides, type]);
    }

    setDiceTable();

    //Set event listener for dice ranges
    for (var dice=0;dice<selectedDice.length;dice++) {
        document.getElementById("diceGroup" + [dice]).addEventListener("change", changeDiceValue);
    }
    return
}

function removeDiceFromTable() {
    removedDice = selectedDice.pop();
    setDiceTable();
    return removedDice
}

// Function to reset and create table per dice roll
function createRollTable() {
    let resultArea = document.getElementById("dice-results");
    let thisRoll = document.createElement("div");
    let thisParagraph = "";
    let thisResult = "";
    let resultText = "";
    let thisDate = "";
    let successes = 0;
    let rollCount = 0;

    // Begin rolling dice from selectedDice-list
    for (let i=0;i<selectedDice.length;i++) {
        // Create paragraph and get values
        thisRolls = parseInt(document.getElementById("diceGroup" + [i]).value);

        // If dice shouldn't be rolled, don't do it!
        if (thisRolls == 0) {
            continue
        }
        thisParagraph = document.createElement("p");
        thisParagraph.classList.add("small");
        thisResult = skillRoll([thisRolls, selectedDice[i][0]]);

        // Create result text for paragraph then append paragraph
        thisDate = new Date();
        resultText = `[${thisDate.toTimeString().substr(0, 5)}]: Rolled for ${selectedDice[i][1]} with ${thisRolls}${selectedDice[i][0]} resulting in ${thisResult.successes} ${thisResult.successes<2?"success":"successes"}! (Rolls: ${thisResult.rolls})`;
        thisParagraph.append(resultText); 
        thisRoll.append(thisParagraph);

        // Push to history array
        if (rollHistory.length > 200) {
            rollHistory.splice(1);
            rollHistory.push(resultText);
        } else {
            rollHistory.push(resultText);
        }

        // Count how many rolls were made in total
        rollCount += thisRolls;

        // Add successes if any
        successes += thisResult.successes;
        // console.log(resultText);
    }
    
    // If more than n entries, remove element before adding
    if (resultArea.childElementCount > 2) {
        resultArea.childNodes[0].remove();
    }

    // Red = Failure (danger), Green = Success
    if (successes == 0) {
        if (rollCount == 0) {
            thisRoll.append(`No dice were rolled!`);
        } else {
            thisRoll.append(`Total: Failure!`);
        }
        thisRoll.classList.add("alert", "alert-danger", "small");
    } else {
        thisRoll.append(`Total: ${successes} ${successes<2 ? "success" : " successes"}!`);
        thisRoll.classList.add("alert", "alert-success", "small");
    }
    
    //thisRoll.append(resultText);
    resultArea.append(thisRoll);
    createDiceHistoryModal();
    return
}

// Function for intiating the skill table+lists
function createSkillTable() {
    let table = document.createElement("table");
    table.id = "skill-table";
    table.classList.add("table", "table-striped", "table-dark");
    
    let tableHead = document.createElement("thead");
    let tableBody = document.createElement("tbody");
    let headRow = document.createElement("tr");
    let head1 = document.createElement("th");
    let head2 = document.createElement("th");
    let head3 = document.createElement("th");

    head1.innerHTML = "Skills";
    head2.innerHTML = "Attribute";
    head3.innerHTML = "Level";

    headRow.append(head1);
    headRow.append(head2);
    headRow.append(head3);
    tableHead.append(headRow);
    table.append(tableHead);
    table.append(tableBody);

    var thisRow = "";
    var thisCell1 = "";
    var thisCell2 = "";
    var thisCell3 = "";
    var thisList1 = "";
    var thisOption1 = "";

    for (attr in skills) {
        for (var i=0;i<skills[attr].length;i++) {
            thisRow = document.createElement("tr");
            thisCell1 = document.createElement("td");
            thisCell2 = document.createElement("td");
            thisCell3 = document.createElement("td");
            thisList1 = document.createElement("select");
            thisList1.id = skills[attr][i];
            thisList1.classList.add("form-select-sm");

            for (i2=0;i2<11;i2++) {
                thisOption1 = document.createElement("option");
                thisOption1.text = parseInt(i2);
                thisList1.options.add(thisOption1);
            }

            thisCell1.innerHTML = skills[attr][i];
            thisCell2.innerHTML = attr;
            thisCell3.append(thisList1);

            thisRow.append(thisCell1, thisCell2, thisCell3);
            tableBody.append(thisRow);
            //console.log("attr: " + attr + ", skill: " + object[attr][i]);
        }
        document.getElementById("attr-skills").append(table);
    }
    return
}

// Function for initiating the attribute table+lists
function createAttrTable() {
    let table = document.createElement("table");
    table.id = "attr-table";
    table.classList.add("table", "table-striped", "table-dark");
    
    let tableHead = document.createElement("thead");
    let tableBody = document.createElement("tbody");
    let headRow = document.createElement("tr");
    let head1 = document.createElement("th");
    let head2 = document.createElement("th");
    let head3 = document.createElement("th");

    head1.innerHTML = "Attributes";
    head2.innerHTML = "Level";
    head3.innerHTML = "Current";

    headRow.append(head1);
    headRow.append(head2);
    headRow.append(head3);
    tableHead.append(headRow);
    table.append(tableHead);
    table.append(tableBody);

    var thisRow = "";
    var thisCell1 = "";
    var thisCell2 = "";
    var thisCell3 = "";
    var thisList1 = "";
    var thisList2 = "";
    var thisOption1 = "";
    var thisOption2 = "";

    for (attr in skills) {
        for (var i=0;i<skills[attr].length;i++) {
            thisRow = document.createElement("tr");
            thisCell1 = document.createElement("td");
            thisCell2 = document.createElement("td");
            thisCell3 = document.createElement("td");
            thisList1 = document.createElement("select");
            thisList2 = document.createElement("select");
            thisList1.id = attr;
            thisList2.id = "current" + attr;
            thisOption2 = document.createElement("option");
            thisOption2.text = 0;
            thisList2.options.add(thisOption2);
            thisList1.classList.add("form-select-sm");
            thisList2.classList.add("form-select-sm");

            for (i=0;i<4;i++) {
                thisOption1 = document.createElement("option");
                thisOption2 = document.createElement("option");

                thisOption1.text = parseInt(i+1);
                thisOption2.text = parseInt(i+1);

                thisList1.options.add(thisOption1);
                thisList2.options.add(thisOption2);
            }

            thisCell1.innerHTML = attr;
            thisCell2.append(thisList1)
            thisCell3.append(thisList2);

            thisRow.append(thisCell1, thisCell2, thisCell3);
            tableBody.append(thisRow);
        }
        document.getElementById("attr-skills").append(table);  
    }
    return
}

// Function for creating the kin list
function createKinList() {
    let thisList = document.createElement("select");
    thisList.id = "kin";
    thisList.classList.add("form-select-sm");

    for (kin in kins) {
        let thisOption1 = document.createElement("option");
        thisOption1.text = kin;
        thisList.options.add(thisOption1)
    }

    document.getElementById("kinCell").append(thisList);
    return
}

// Function for creating the profession list
function createProfList() {
    let thisList = document.createElement("select");
    thisList.id = "prof";
    thisList.classList.add("form-select-sm");

    for (prof in profs) {
        let thisOption1 = document.createElement("option");
        thisOption1.text = prof;
        thisList.options.add(thisOption1)
    }

    document.getElementById("profCell").append(thisList);
    return
}

// Function for creating the age group list
function createAgeList() {
    let thisList = document.createElement("select");
    thisList.id = "age";
    thisList.classList.add("form-select-sm");

    for (age in ages) {
        let thisOption1 = document.createElement("option");
        thisOption1.text = age;
        thisList.options.add(thisOption1)
    }

    document.getElementById("ageCell").append(thisList);
    return
}

// Function for creating select elements for adding equipments
function createAddEqSelects() {
    // First create the select elements
    let itemSelect = document.createElement("input");
    itemSelect.classList.add("form-control");
    itemSelect.id = "addItemSelect";
    itemSelect.setAttribute("list", "itemsData");

    let weaponSelect = document.createElement("input");
    weaponSelect.classList.add("form-control");
    weaponSelect.id = "addWeaponSelect";
    weaponSelect.setAttribute("list", "weaponsData");

    let armorSelect = document.createElement("input");
    armorSelect.classList.add("form-control");
    armorSelect.id = "addArmorSelect";
    armorSelect.setAttribute("list", "armorsData");


    // Then create datalists
    let itemDatalist = document.createElement("datalist");
    itemDatalist.id = "itemsData";

    for (item in items) {
        let thisOption = document.createElement("option");
        thisOption.value = item;
        itemDatalist.append(thisOption);
    }

    itemSelect.append(itemDatalist);

    let weaponDatalist = document.createElement("datalist");
    weaponDatalist.id = "weaponsData";

    for (weapon in weapons) {
        let thisOption = document.createElement("option");
        thisOption.value = weapon;
        weaponDatalist.append(thisOption);
    }

    weaponSelect.append(weaponDatalist);

    let armorDatalist = document.createElement("datalist");
    armorDatalist.id = "armorsData";

    for (armor in armors) {
        let thisOption = document.createElement("option");
        thisOption.value = armor;
        armorDatalist.append(thisOption);
    }
    
    armorSelect.append(armorDatalist);
    

    // Append selects to page
    document.getElementById("addEqListCell").append(itemSelect);
    document.getElementById("addWeaponListCell").append(weaponSelect);
    document.getElementById("addArmorListCell").append(armorSelect);

    // BONUS: Create and add buttons!
    let itemButton = document.createElement("button");
    itemButton.id = "addItemButton";
    itemButton.classList.add("btn", "btn-primary");
    itemButton.innerHTML = "+";

    let weaponButton = document.createElement("button");
    weaponButton.id = "addWeaponButton";
    weaponButton.classList.add("btn", "btn-primary");
    weaponButton.innerHTML = "+";

    let armorButton = document.createElement("button");
    armorButton.id = "addArmorButton";
    armorButton.classList.add("btn", "btn-primary");
    armorButton.innerHTML = "+";

    document.getElementById("addEqButtonCell").append(itemButton);
    document.getElementById("addArmorButtonCell").append(armorButton);
    document.getElementById("addWeaponButtonCell").append(weaponButton);
    return
}

function addItem() {
    let thisItem = document.getElementById("addItemSelect").value;

    if (items.hasOwnProperty(thisItem)) {
        selectedItems.Eq.push(thisItem);
        setItemTables();
    } else {
        console.log("Error: Item doesn't exist!");
    }
    return
}

function addWeapon() {
    let thisItem = document.getElementById("addWeaponSelect").value;

    if (weapons.hasOwnProperty(thisItem)) {
        selectedItems.Weapons.push(thisItem);
        setItemTables();
    } else {
        console.log("Error: Item doesn't exist!");
    }
    return
}

function addArmor() {
    let thisItem = document.getElementById("addArmorSelect").value;

    if (armors.hasOwnProperty(thisItem)) {
        selectedItems.Armors.push(thisItem);
        setItemTables();
    } else {
        console.log("Error: Item doesn't exist!");
    }
    return
}

function removeItem() {
    let thisItem = this.id.replace("Button", "");

    if (selectedItems.Eq.includes(thisItem)) {
        selectedItems.Eq.splice(selectedItems.Eq.at(thisItem), 1);
        setItemTables();
    } else {
        console.log("Error: Item not in list!");
    }
    return
}

function removeWeapon() {
    let thisItem = this.id.replace("Button", "");

    if (selectedItems.Weapons.includes(thisItem)) {
        selectedItems.Weapons.splice(selectedItems.Weapons.at(thisItem), 1);
        setItemTables();
    } else {
        console.log("Error: Item not in list!");
    }
    return
}

function removeArmor() {
    let thisItem = this.id.replace("Button", "");

    if (selectedItems.Armors.includes(thisItem)) {
        selectedItems.Armors.splice(selectedItems.Armors.at(thisItem), 1);
        setItemTables();
    } else {
        console.log("Error: Item not in list!");
    }
    return
}

function setItemTables() {
    // Assign apropriate table-bodies for processing
    let itemTable = document.getElementById("mainEq-body");
    let weaponTable = document.getElementById("mainWeapon-body");
    let armorTable = document.getElementById("mainArmor-body");

    // If table cells are present, empty them
    if (itemTable.childElementCount > 0) {
        itemTable.innerHTML = "";
    }

    if (weaponTable.childElementCount > 0) {
        weaponTable.innerHTML = "";
    }

    if (armorTable.childElementCount > 0) {
        armorTable.innerHTML = "";
    }

    // Make item table
    for (item of selectedItems.Eq) {
        let thisRow = document.createElement("tr");
        let thisCell1 = document.createElement("td");
        let thisCell2 = document.createElement("td");
        let thisCell3 = document.createElement("td");
        let thisCell4 = document.createElement("td");
        let thisCell5 = document.createElement("td");

        let thisButton = document.createElement("button");
        thisButton.id = item + "Button";
        thisButton.classList.add("btn", "btn-sm", "btn-danger");
        thisButton.innerHTML = "-";
        thisButton.addEventListener("click", removeItem);

        thisCell1.innerHTML = item;
        thisCell2.innerHTML = items[item].weight;
        thisCell3.innerHTML = items[item].bonus;
        thisCell4.innerHTML = items[item].type;
        thisCell5.append(thisButton);

        thisRow.append(thisCell1, thisCell2, thisCell3, thisCell4, thisCell5);
        itemTable.append(thisRow);
    }

    // Make weapon table
    for (weapon of selectedItems.Weapons) {
        let thisRow = document.createElement("tr");
        let thisCell1 = document.createElement("td");
        let thisCell2 = document.createElement("td");
        let thisCell3 = document.createElement("td");
        let thisCell4 = document.createElement("td");
        let thisCell5 = document.createElement("td");
        let thisCell6 = document.createElement("td");

        let thisButton = document.createElement("button");
        thisButton.id = weapon + "Button";
        thisButton.classList.add("btn", "btn-sm", "btn-danger");
        thisButton.innerHTML = "-";
        thisButton.addEventListener("click", removeWeapon);

        thisCell1.innerHTML = weapon;
        thisCell2.innerHTML = weapons[weapon].Grip;
        thisCell3.innerHTML = weapons[weapon].Bonus;
        thisCell4.innerHTML = weapons[weapon].Damage;
        thisCell4.innerHTML = weapons[weapon].Range;
        thisCell6.append(thisButton);

        thisRow.append(thisCell1, thisCell2, thisCell3, thisCell4, thisCell5, thisCell6);
        weaponTable.append(thisRow);
    }

    // Make armor table
    for (armor of selectedItems.Armors) {
        let thisRow = document.createElement("tr");
        let thisCell1 = document.createElement("td");
        let thisCell2 = document.createElement("td");
        let thisCell3 = document.createElement("td");
        let thisCell4 = document.createElement("td");
        let thisCell5 = document.createElement("td");

        let thisButton = document.createElement("button");
        thisButton.id = armor + "Button";
        thisButton.classList.add("btn", "btn-sm", "btn-danger");
        thisButton.innerHTML = "-";
        thisButton.addEventListener("click", removeArmor);

        thisCell1.innerHTML = armor;
        thisCell2.innerHTML = armors[armor]["Armor Rating"];
        thisCell3.innerHTML = armors[armor].Features;
        thisCell4.innerHTML = armors[armor]["Body Part"];
        thisCell5.append(thisButton);

        thisRow.append(thisCell1, thisCell2, thisCell3, thisCell4, thisCell5);
        armorTable.append(thisRow);
    }
    return
}

// Function for creating the critical damage table
function createCritDamageTable() {
    let thisOption;
    let critTable = document.createElement("table");
    critTable.classList.add("table", "table-dark", "table-striped");
    critTable.id = "crit-table";
    let critHead = document.createElement("thead");
    let critHeadRow = document.createElement("tr");
    let critHeadCell1 = document.createElement("th");
    let critHeadCell2 = document.createElement("th");
    let critHeadCell3 = document.createElement("th");
    let critHeadCell4 = document.createElement("th");
    let critHeadCell5 = document.createElement("th");
    let critBody = document.createElement("tbody");
    critBody.id = "crit-body";

    critHeadRow.append(critHeadCell1, critHeadCell2, critHeadCell3, critHeadCell4, critHeadCell5);
    critHead.append(critHeadRow);
    critTable.append(critHead, critBody);

    let critSelect = document.createElement("input");
    critSelect.classList.add("form-control");
    critSelect.id = "critSelect";
    critSelect.setAttribute("list", "crits");
    let critDatalist = document.createElement("datalist");
    critDatalist.id = "crits";

    for (type in critDamage) {
        thisOption = document.createElement("option");
        thisOption.value = type;
        critDatalist.append(thisOption);
    }

    document.getElementById("critDamage").append(critSelect, critDatalist);
    critHeadCell1.innerHTML = "Damage";
    critHeadCell2.innerHTML = "Deadly";
    critHeadCell3.innerHTML = "Time limit";  
    critHeadCell4.innerHTML = "Effect during healing";
    critHeadCell5.innerHTML = "Healing time";   
    document.getElementById("critDamage").append(critTable);

    let thisButton = document.createElement("button");
    thisButton.innerHTML = "Calculate";
    thisButton.id = "critButton";
    thisButton.classList.add("btn-sm", "btn-primary", "mx-3");
    document.getElementById("critH1").append(thisButton);
    return
}

// Function create critresult table
function setCritResult(e) {
    let type = document.getElementById("critSelect").value;

    if (critDamage.hasOwnProperty(type)) {
        let critTable = document.getElementById("crit-body");
        if (critTable.childElementCount > 0) {
            critTable.innerHTML = "";
        }

        let n = Math.floor(Math.random() * critDamage[type].length);
        let thisResult = critDamage[type][n];
        let thisRow = document.createElement("tr");
        let thisCell1 = document.createElement("td");
        let thisCell2 = document.createElement("td");
        let thisCell3 = document.createElement("td");
        let thisCell4 = document.createElement("td");
        let thisCell5 = document.createElement("td");

        thisCell1.append(thisResult.Injury);
        thisCell2.append(thisResult.Deadly);
        thisCell3.append(thisResult["Time limit"]);
        thisCell4.append(thisResult.Effect);
        thisCell5.append(thisResult["Healing time"]);

        thisRow.append(thisCell1, thisCell2, thisCell3, thisCell4, thisCell5);
        critTable.append(thisRow);
    } else {
        alert("Please enter a valid critical injury type in the field below!");
    }
    return
}

// Function for creating the lookup lists and containing tables
function createLookupLists() {
    // Declare variables used in later loops
    let thisOption;

    // Declare tables with heads and bodies
    let itemTable = document.createElement("table");
    itemTable.classList.add("table", "table-dark", "table-striped");
    itemTable.id = "item-table";
    let itemHead = document.createElement("thead");
    let itemHeadRow = document.createElement("tr");
    let itemHeadCell1 = document.createElement("th");
    let itemHeadCell2 = document.createElement("th");
    let itemBody = document.createElement("tbody");
    itemBody.id = "item-body";

    let weaponTable = document.createElement("table");
    weaponTable.classList.add("table", "table-dark", "table-striped");
    weaponTable.id = "weapon-table";
    let weaponHead = document.createElement("thead");
    let weaponHeadRow = document.createElement("tr");
    let weaponHeadCell = document.createElement("th");
    let weaponBody = document.createElement("tbody");
    weaponBody.id = "weapon-body";

    let armorTable = document.createElement("table");
    armorTable.classList.add("table", "table-dark", "table-striped");
    armorTable.id = "armor-table";
    let armorHead = document.createElement("thead");
    let armorHeadRow = document.createElement("tr");
    let armorHeadCell = document.createElement("th");
    let armorBody = document.createElement("tbody");
    armorBody.id = "armor-body";

    let talentTable = document.createElement("table");
    talentTable.classList.add("table", "table-dark", "table-striped");
    talentTable.id = "talents-table";
    let talentHead = document.createElement("thead");
    let talentHeadRow = document.createElement("tr");
    let talentHeadCell = document.createElement("th");
    let talentBody = document.createElement("tbody");
    talentBody.id = "talents-body";

    // Append above to each other
    itemHeadRow.append(itemHeadCell1, itemHeadCell2);
    itemHead.append(itemHeadRow);
    itemTable.append(itemHead, itemBody);

    weaponHeadRow.append(weaponHeadCell);
    weaponHead.append(weaponHeadRow);
    weaponTable.append(weaponHead, weaponBody);

    armorHeadRow.append(armorHeadCell);
    armorHead.append(armorHeadRow);
    armorTable.append(armorHead, armorBody);

    talentHeadRow.append(talentHeadCell);
    talentHead.append(talentHeadRow);
    talentTable.append(talentHead, talentBody);

    // Start making lists and append to apropriate tables
    let itemSelect = document.createElement("input");
    itemSelect.classList.add("form-control");
    itemSelect.id = "itemSelect";
    itemSelect.setAttribute("list", "itemsData");
    itemHeadCell1.innerHTML = "Property";
    itemHeadCell2.innerHTML = "Information";   
    document.getElementById("itemLookup").append(itemSelect, itemTable);

    let weaponSelect = document.createElement("input");
    weaponSelect.classList.add("form-control");
    weaponSelect.id = "weaponSelect";
    weaponSelect.setAttribute("list", "weaponsData");
    itemHeadCell1.innerHTML = "Property";
    itemHeadCell2.innerHTML = "Information";   
    document.getElementById("weaponLookup").append(weaponSelect, weaponTable);

    let armorSelect = document.createElement("input");
    armorSelect.classList.add("form-control");
    armorSelect.id = "armorSelect";
    armorSelect.setAttribute("list", "armorsData");
    itemHeadCell1.innerHTML = "Property";
    itemHeadCell2.innerHTML = "Information";   
    document.getElementById("armorLookup").append(armorSelect, armorTable);

    let talentSelect = document.createElement("input");
    talentSelect.classList.add("form-control");
    talentSelect.id = "talentsSelect";
    talentSelect.setAttribute("list", "talentsData");
    itemHeadCell1.innerHTML = "Property";
    itemHeadCell2.innerHTML = "Information";   
    document.getElementById("talentLookup").append(talentSelect, talentTable);
    return
}

// Function for making item lookup table per item
function setLookupTable() {
    let thisQuery = this.id.replace("Select", "");
    let table = document.getElementById(thisQuery + "-body");
    let currentItem = this.value;
    let currentList = "";
    let thisRow;
    let thisCell1;
    let thisCell2;

    if (thisQuery == "item") {
        currentList = items;
    }

    if (thisQuery == "weapon") {
        currentList = weapons;
    }

    if (thisQuery == "armor") {
        currentList = armors;
    }
    
    if (thisQuery == "talents") {
        currentList = generalTalents;
        for (prof in profs) {
            for (talent in profs[prof].Talents) {
                currentList[talent] = profs[prof].Talents[talent];
            }
        }
    }

    if (currentList.hasOwnProperty(currentItem)) {
        if (table.childElementCount > 0) {
            table.innerHTML = "";
        }

        for (property in currentList[currentItem]) {
            if (property == "bonus") {
                continue
            }
            thisRow = document.createElement("tr");
            thisCell1 = document.createElement("td");
            thisCell2 = document.createElement("td");
            thisCell1.innerHTML = property[0].toUpperCase() + property.substring(1) + ": ";
            thisCell2.innerHTML = currentList[currentItem][property];
            thisRow.append(thisCell1, thisCell2);
            table.append(thisRow);
        }
        return true
    }
    console.log("Item not found: " + currentItem.toString());
    return false
}

// Function for setting talent options (may change with profession)
function createTalentList() {
    let list = document.getElementById("addTalentList");
    if (list.options.length > 0) {
        while (list.options.length != 0) {
            list.options.remove(0);
        }
    } 

    let thisProf = document.getElementById("prof").value;
    let thisOption = "";

    for (talent in generalTalents) {
        thisOption = document.createElement("option");
        thisOption.text = talent;
        list.options.add(thisOption);
    }

    for (talent in profs[thisProf].Talents) {
        thisOption = document.createElement("option");
        thisOption.text = talent.toString();
        list.options.add(thisOption);
    }

    // Create datalist separately
    let talentDatalist = document.createElement("datalist");
    talentDatalist.id = "talentsData";

    for (talent in generalTalents) {
        thisOption = document.createElement("option");
        thisOption.value = talent;
        talentDatalist.append(thisOption);
    }

    for (prof in profs) {
        for (talent in profs[prof].Talents) {
            thisOption = document.createElement("option");
            thisOption.value = talent;
            talentDatalist.append(thisOption);
        }
    }
    
    list.append(talentDatalist);
    return
}

// Function for setting the talent table
function setTalentTable() {
    // Initialize variables
    let currentKin = document.getElementById("kin").value;
    let currentProf = document.getElementById("prof").value;
    let talentTable = document.getElementById("talent-body");
    let hasMagic = false;

    if (talentTable.childElementCount > 0) {
        talentTable.innerHTML = "";
    }

    let thisRow = document.createElement("tr");
    let thisCell1 = document.createElement("td");
    let thisCell2 = document.createElement("td");
    let thisCell3 = document.createElement("td");
    let thisSelect = "";
    let thisOption = "";
    let thisButton = "";

    // Start by setting current kin talent (not manually changeable)
    thisCell1.id = "kinTalent";
    for (talent in kins[currentKin].Talent) {
        thisCell1.innerHTML = talent.toString();
    }
    thisCell2.innerHTML = "Kin";
    thisCell3.innerHTML = "-";
    thisRow.append(thisCell1, thisCell2, thisCell3);
    talentTable.append(thisRow);

    // If there are selected talents, start creating elements
    for (talent in selectedTalents) {
        // Create table row and cells
        thisRow = document.createElement("tr");
        thisCell1 = document.createElement("td");
        thisCell2 = document.createElement("td");
        thisCell3 = document.createElement("td");

        // Create text in cell 1
        thisParagraph = document.createElement("p");
        thisParagraph.innerHTML = talent.toString();

        // Create select for level and append to cell 2
        thisSelect = document.createElement("select");
        thisSelect.classList.add("form-select-sm");
        thisSelect.id = talent + "Level";
        thisCell2.append(thisSelect);

        // Create remove button for talent and append to cell 3
        thisButton = document.createElement("button");
        thisButton.innerHTML = "-";
        thisButton.type = "button";
        thisButton.classList.add("btn", "btn-danger", "btn-sm");
        thisButton.id = "remove" + talent;
        thisButton.addEventListener("click", removeTalentFromTable);
        thisCell3.append(thisButton);

        // Create options for level select (always 1-3)
        for (let n=0;n<3;n++) {
            thisOption = document.createElement("option");
            thisOption.text = parseInt(n + 1);
            thisSelect.options.add(thisOption);
        }

        // Add event listener to level select
        thisSelect.addEventListener("change", setTalentValue);

        // Append elements to each other
        thisCell1.append(thisParagraph);
        thisCell2.append(thisSelect);
        thisRow.append(thisCell1, thisCell2, thisCell3);
        talentTable.append(thisRow);

        // Set values
        thisSelect.value = selectedTalents[talent];
        if (spells.hasOwnProperty(talent)) {
            hasMagic = true;
        }
    }
    if (hasMagic) {
        setSpellTable();
    }
    return
}

// Function for setting a new value to an existing talent
function setTalentValue() {
    let talent = this.id.toString().replace("Level", "");
    let level = this.value;
    selectedTalents[talent] = level;
    setPoints();
    setSpellTable();
    return selectedTalents[talent]
}

// Function for adding a talent to the talent table
function addTalentToTable() {
    let talentType = document.getElementById("addTalentList").value;

    if (selectedTalents.hasOwnProperty(talentType)) {
        console.log("Talent is already in the list!");
        return false
    } else {
        selectedTalents[talentType] = 1;
    }
    setTalentTable();
    setPoints();
    return true
}

// Function for removing the last talent from the talent table
function removeTalentFromTable() {
    let talent = this.id.substr(6);
    delete selectedTalents[talent];
    setTalentTable();
    setSpellTable();
    setPoints();
    return
}

// Function for setting spell table (depends on talents)
function setSpellTable() {
    // Set variables for calculating spell levels
    let thisProf = document.getElementById("prof").value;
    let totalSpellLevel = [];

    // Set table area and variables for appending later
    let table = document.getElementById("spell-table");
    let tableHead = document.getElementById("spell-head");
    let tableBody = document.getElementById("spell-body");
    let thisCell1 = "";
    let thisCell2 = "";
    
    // Remove old elements if present
    if (tableHead.childElementCount > 0) {
        tableHead.innerHTML = "";
        tableBody.innerHTML = "";
    }

    // Create spell table header
    let thisRow = document.createElement("tr");
    let thisHead1 = document.createElement("th");
    let thisHead2 = document.createElement("th");
    thisHead1.innerHTML = "Spell";
    thisHead2.innerHTML = "Talent";
    thisRow.append(thisHead1, thisHead2);
    tableHead.append(thisRow);
    table.append(tableHead, tableBody);

    // Iterate through chosen talents to check for magic
    for (talent in selectedTalents) {
        if (spells.hasOwnProperty(talent)) {
            // Add current spell level to list for later sorting
            totalSpellLevel.push(parseInt(selectedTalents[talent]));
            // Begin iterating through spell levels...
            for (spellLevel in spells[talent]) {
                // If character has a high enough talent/spell level...
                if (parseInt(spellLevel) <= selectedTalents[talent]) {
                    // Begin iterating talent spells by level
                    for (let i=0;i<spells[talent][spellLevel].length;i++) {
                        // Create elements for each profession spell
                        thisRow = document.createElement("tr");
                        thisCell1 = document.createElement("td");
                        thisCell2 = document.createElement("td");
    
                        // Set content: cell 1: spell name, cell 2: talent name
                        // But only if the current profession can use spell!
                        if (profs[thisProf].Talents.includes(talent)) {
                            thisCell1.innerHTML = spells[talent][spellLevel][i];
                        } else {
                            thisCell1.innerHTML = "Wrong profession"
                        }
                        thisCell2.innerHTML = talent;
    
                        // Append elements
                        thisRow.append(thisCell1, thisCell2);
                        tableBody.append(thisRow);
                    }
                }
            }
        }
    }

    // When profession spells are done, find the maximum spell level...
    totalSpellLevel.sort();
    let maxLevel = totalSpellLevel[totalSpellLevel.length-1];

    // Then begin making the general spell table
    for (spellLevel in spells["General"]) {
        if (parseInt(spellLevel) <= parseInt(maxLevel)) {
            for (i=0;i<spells["General"][spellLevel].length;i++) {
                // Create elements for each profession spell
                thisRow = document.createElement("tr");
                thisCell1 = document.createElement("td");
                thisCell2 = document.createElement("td");

                // Set content: cell 1: spell name, cell 2: talent name
                thisCell1.innerHTML = spells["General"][spellLevel][i];
                thisCell2.innerHTML = "General";

                // Append elements
                thisRow.append(thisCell1, thisCell2);
                tableBody.append(thisRow);
            }
        }
    }
    return
}

function createDiceHistoryModal() {
    if (document.getElementById("mainModal")) {
        document.getElementById("mainModal").remove();
    }

    let mainModal = document.createElement("div");
    mainModal.classList.add("modal");
    mainModal.id = "mainModal";

    let modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    
    mainModal.append(modalDialog);
    modalDialog.append(modalContent);

    let modalHeader = document.createElement("div");
    modalHeader.classList.add("modal-header");
    modalContent.append(modalHeader);

    let modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    modalContent.append(modalBody);

    let modalFoot = document.createElement("div");
    modalFoot.classList.add("modal-footer");
    modalContent.append(modalFoot);

    let head = document.createElement("h4");
    head.classList.add("modal-title");
    head.append("Roll history");
    modalHeader.append(head);

    let closeButton1 = '<button type="button" class="btn-close" data-bs-dismiss="modal"></button>';
    modalHeader.innerHTML += closeButton1;

    let closeButton2 = '<button type="button" class="btn btn-primary btn-sm" data-bs-dismiss="modal">Close</button>';
    modalFoot.innerHTML = closeButton2;
    
    let thisParagraph = "";
    if (rollHistory.length < 1) {
        thisParagraph = document.createElement("p");
        thisParagraph.classList.add("small");
        thisParagraph.append("No rolls have been made (yet)!");
        modalBody.append(thisParagraph);
    } else {
        for (let i=0;i<rollHistory.length;i++) {
            thisParagraph = document.createElement("p");
            thisParagraph.classList.add("small");
            thisParagraph.append(rollHistory[i]);
            modalBody.append(thisParagraph);
        }
    }

    document.body.append(mainModal);
    return
}

// Function for calculating and setting skill/attribute points
function setPoints() {
    let thisAge = document.getElementById("age").value;
    let maxSkill = ages[thisAge].skillPoint;
    let spentSkill = 0;
    let maxTalent = ages[thisAge].talents;
    let spentTalent = 0;
    let maxAttr = ages[thisAge].attrPoint;
    let spentAttr = 0;
    let currentAttr = "";
    let currentSkill = "";
    let skillList = "";

    for (attr in skills) {
        currentAttr = parseInt(document.getElementById(attr).value);
        document.getElementById("current" + attr).value = currentAttr;
        spentAttr += currentAttr;
        skillList = skills[attr];

        for (skill=0;skill<skills[attr].length;skill++) {
            currentSkill = parseInt(document.getElementById(skills[attr][skill]).value);
            spentSkill += currentSkill;
        }
    }

    for (talent in selectedTalents) {
        spentTalent += parseInt(selectedTalents[talent]);
    }

    document.getElementById("attrPointCounter").innerHTML = maxAttr - spentAttr;
    document.getElementById("skillPointCounter").innerHTML = maxSkill - spentSkill;
    document.getElementById("talentPointCounter").innerHTML = maxTalent - spentTalent;
    return
}

// Function for changing stuff based on character profession
function setProf() {
    // Set initial variables
    let thisProf = document.getElementById("prof").value;
    let skillTable = document.getElementById("skill-table").rows;
    let startEqTable = document.getElementById("startEq-body");
    let thisRow = "";
    let thisCell = "";

    // Destroy start equipment table body if present
    if (startEqTable.childElementCount > 0) {
        startEqTable.innerHTML = "";
    }

    // Create start equipment table body based on profession
    for (let row=0;row<profs[thisProf].Equipment.length;row++) {
        thisRow = document.createElement("tr");
        thisCell = document.createElement("td");
        thisCell.innerHTML = profs[thisProf].Equipment[row];
        thisRow.append(thisCell);
        startEqTable.append(thisRow);
    }

    // Change highlighted profession skills in the skill table
    for (row=0;row<skillTable.length;row++) {
        //console.log(skillTable.rows[row]);
        if (profs[thisProf]["Skills"].includes(skillTable[row].cells[0].innerHTML)) {
            skillTable[row].classList.add("table-primary");
        };
        if (!profs[thisProf]["Skills"].includes(skillTable[row].cells[0].innerHTML)) {
            skillTable[row].classList.remove("table-primary");
        };
    };
    return
}

// Function that updates the amount of dice
function changeDiceValue() {
    this.parentNode.parentNode.cells[2].innerHTML = this.value;
    return
}

// Function adds or removes options depending on class/prof speciality
function addAttributeOptions() {
    let thisProf = document.getElementById("prof").value;
    let thisKin = document.getElementById("kin").value;
    let thisAttr = "";
    let thisAttr2 = "";
    let thisOption1 = "";
    let thisOption2 = "";

    for (attr in skills) {
        thisAttr = document.getElementById(attr);
        thisAttr2 = document.getElementById("current" + attr);

        // If list contains more than 4 options, remove exceeding options
        if (parseInt(thisAttr.options.length) > 4) {
            for (var i=0;i<parseInt(thisAttr.options.length-3);i++) {
                //console.log(attr + " options.length is: " + thisAttr.options.length);
                //console.log("Must remove " + parseInt(thisAttr.options.length-4) + " options!");
                thisAttr.remove(parseInt(thisAttr.options.length-1));
                thisAttr2.remove(parseInt(thisAttr2.options.length-1));
                //console.log(attr + " options.length reduced to: " + thisAttr.options.length);
                //console.log("attr max option is: " + thisAttr.options[thisAttr.options.length-1].text);
            }
        }

        // If chosen profession has attribute, add point
        if (attr == profs[thisProf].Attribute) {
            //console.log("Is " + thisProf)
            thisOption1 = document.createElement("option");
            thisOption2 = document.createElement("option");
            thisOption1.text = thisAttr.options.length + 1;
            thisOption2.text = thisAttr.options.length + 1;
            thisAttr.options.add(thisOption1);
            thisAttr2.options.add(thisOption2);
            //console.log(attr + " was set to " + thisAttr.options.length)
        }

        // If chosen kin has attribute, add point
        if (attr == kins[thisKin].Attribute) {
            //console.log("Is " + thisKin)
            thisOption1 = document.createElement("option");
            thisOption2 = document.createElement("option");
            thisOption1.text = thisAttr.options.length + 1;
            thisOption2.text = thisAttr.options.length + 1;
            thisAttr.options.add(thisOption1);
            thisAttr2.options.add(thisOption2);
            //console.log(attr + " was set to " + thisAttr.options.length)
        }
    }
    return
}

// Functions for adding/removing shadows
function makeShadow() {
    if (!this.toggled) {
        this.originalShadow = this.style.textShadow;
        this.toggled = 0;
    }

    if (this.toggled == 0) {
        this.style.textShadow = "red 5px 5px 5px";
        this.toggled = 1;
    }
    return
}

function removeShadow() {
    if (this.toggled == 1) {
        this.style.textShadow = this.originalShadow;
        this.toggled = 0;
    }
}

function elongate() {
    if (this.toggled == 1) {
        this.toggled = 0;
        $(this).animate({height: "-=300px"})
    } else {
        this.toggled = 1;
        $(this).animate({height: "+=300px"})
    }
    return
}

// Function for setting initial event listeners to elements
function setEventListeners() {
    let thisList = "";
    let thisList2 = "";

    // Set event listeners for attribute select elements
    for (attr in skills) {
        thisList = document.getElementById(attr);
        thisList.addEventListener("change", setPoints);

        // Set event listeners for skill select elements
        for (var skill=0;skill<skills[attr].length;skill++) {
            thisList2 = document.getElementById(skills[attr][skill]);
            thisList2.addEventListener("change", setPoints);
        }
    }

    // Set event listener for age select element
    document.getElementById("age").addEventListener("change", setPoints);

    // Set event listeners for kin select element
    document.getElementById("kin").addEventListener("change", addAttributeOptions);
    document.getElementById("kin").addEventListener("change", setTalentTable);

    // Set event listeners for profession select element
    document.getElementById("prof").addEventListener("change", setProf);
    document.getElementById("prof").addEventListener("change", addAttributeOptions);
    document.getElementById("prof").addEventListener("change", createTalentList);
    document.getElementById("prof").addEventListener("change", setSpellTable);

    // Set event listeners for add/remove talent-buttons
    document.getElementById("addTalent").addEventListener("click", addTalentToTable);

    // Set event listerners for add equipment buttons
    document.getElementById("addItemButton").addEventListener("click", addItem);
    document.getElementById("addWeaponButton").addEventListener("click", addWeapon);
    document.getElementById("addArmorButton").addEventListener("click", addArmor);

    // Set event listeners for add/remove dice-buttons
    document.getElementById("diceAdd").addEventListener("click", addDiceToTable);
    document.getElementById("diceRemove").addEventListener("click", removeDiceFromTable);

    // Set event listener for roll button
    document.getElementById("rollButton").addEventListener("click", createRollTable);

    // Set event listeners for lookup tables
    document.getElementById("itemSelect").addEventListener("change", setLookupTable);
    document.getElementById("weaponSelect").addEventListener("change", setLookupTable);
    document.getElementById("armorSelect").addEventListener("change", setLookupTable);
    document.getElementById("talentsSelect").addEventListener("change", setLookupTable);

    // Set event listener for crit select
    document.getElementById("critButton").addEventListener("click", setCritResult)
    return
}

// Supporting function for easily fetching json to variable
async function getData(url) {
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

// Main function to start generating the webpage and set initial values
function init() {
    // Start initializing the page
    createAttrTable();
    createSkillTable();
    createKinList();
    createProfList();
    createAgeList();
    createTalentList();
    createAddDiceTable()
    createLookupLists();
    createCritDamageTable();
    createAddEqSelects();
    setDiceTable();
    setTalentTable();
    setProf();
    setPoints();
    addAttributeOptions();
    setEventListeners();
    createDiceHistoryModal();
    console.log("Done!");
    return
}

/*
#####################
# 3. Application    #
#####################
*/

// Display copyright information
console.log("Copyright: Groshie, 2022");
console.log("Forbidden Lands property of Free League Publishing.");

/*
#####################
#  END OF JS CODE   #
#####################
*/