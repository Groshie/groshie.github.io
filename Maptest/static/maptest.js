/*
let test = `entry,keys,pic
"Degspill kan med fördel användas som näring till mjölmaskar istället för att slängas i hushållssopor.",deg;spill;mjölmask,https://www.mjolmask.se/wp-content/uploads/2019/01/Mj%C3%B6lmask.jpg
"Ägg kan kokas skalas och avnjutas med en redig tub kaviar!",ägg;kaviar;skal,https://assets.icanet.se/imagevaultfiles/id_33024/cf_259/koka_agg.jpg
"Ägg kan stekas med gulan intakt vilket kallas sunny side up - för att det känns som att äta solen!",ägg;steka;sol,https://d3a6ymj7hfz0cs.cloudfront.net/wp-content/uploads/2016/03/Agg_stekt.jpg`
*/



let db = fetch("data/maptest.csv")
    .then(res => res.text())
    .then(data => db = parseCSV(data));

db
    .then(data => {
        let keys = [];
        let currentKeys = [];

        for (row in data) {
            currentKeys = data[row].keys.toString().split(",");

            for (key of currentKeys) {
                if (!keys.includes(key.toString().toLowerCase())) {
                    keys.push(key.toString().toLowerCase());
                }
            }
        }

        for (key of keys) {
            let thisOption = document.createElement("option");
            thisOption.value = key.toString();
            document.getElementById("entryOptions").append(thisOption);
        }
    })

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

    db.then(data => {
        for (row in data) {
            for (key of data[row].keys) {
                if (key.toString() == query) {
                    matches[row] = data[row].entry;
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
    })

    
}

document.getElementById("search-control").addEventListener("change", showAnswers);

showAnswers();