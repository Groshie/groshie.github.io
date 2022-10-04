let db = fetch("data/maptest.csv")
    .then(res => res.text())
    .then(data => db = parseCSV(data));

let keysTotal = [];
let currentKeys = [];

for (row in db) {
    currentKeys = db[row].keys.toString().split(",");

    for (key of currentKeys) {
        if (!keysTotal.includes(key.toString().toLowerCase())) {
            keysTotal.push(key.toString().toLowerCase());
        }
    }
}

for (key of keysTotal) {
    let thisOption = document.createElement("option");
    thisOption.value = key.toString();
    document.getElementById("entryOptions").append(thisOption);
}

function parseCSV(string) {
    let csv = string.split("\r\n");
    let json = {};
    for (row in csv) {
        let currentRow = csv[row].split(",");
        json["row" + [row]] = {
            "entry": currentRow[0],
            "keys": currentRow[1].split(";"),
            "pic": currentRow[2]
        };
    }
    return json
}

function showAnswers() {
    let query = document.getElementById("search-control").value.toString();
    let matches = {};

    for (row in db) {
        for (key of db[row].keys) {
            if (key.toString() == query) {
                matches[row] = db[row].entry;
            }
        }
    }

    if (document.getElementById("result-table").childElementCount > 0) {
        document.getElementById("result-table").innerHTML = "";
    }

    for (match in matches) {
        let thisRow = document.createElement("tr");
        let thisCell = document.createElement("td");
        
        thisCell.append(matches[match]);
        thisRow.append(thisCell);
        document.getElementById("result-table").append(thisRow);
    }
}

document.getElementById("search-control").addEventListener("change", showAnswers);
