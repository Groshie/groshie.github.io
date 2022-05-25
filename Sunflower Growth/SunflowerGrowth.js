// Functions
function startGame() {
    document.getElementById("title").style.display = "none";
    document.getElementById("canButton").style.display = "block";
    document.getElementById("scoreDiv").style.display = "block";
    grow = setInterval(gameLoop, 40000);
    dryCounter = setInterval(dryFlower, 20000);
    return
}

function gameLoop() {
    if (sunFlower.properties.drowned < 75 && sunFlower.properties.thirst < 75) {
        flowerGrow();
    } else {
        flowerWither();
    }

    if (parseInt(sunFlower.stalk.height.replace("px", "")) <= 30) {
        makeModal("Game Over!", "Oh no, your sunflower dried up! The game will reset in 10 seconds!");
        setTimeout(10000, resetGame());
    }

    if (parseInt(sunFlower.stalk.height.replace("px", "")) >= 250) {
        makeModal("You win!", "What a nice sunflower! The game will reset in 10 seconds!");
        setTimeout(10000, resetGame());
    }
    return
} 

function waterCan() {
    sunFlower.properties.drowned += 15;
    sunFlower.properties.thirst -= 10;

    document.getElementById("thirstMeter").innerHTML = parseInt(sunFlower.properties.thirst);
    document.getElementById("drownMeter").innerHTML = parseInt(sunFlower.properties.drowned);

    document.getElementById("canButton").style.display = "none";
    setTimeout(displayCan, 5000)
    return
}

function displayCan() {
    document.getElementById("canButton").style.display = "block";
    return
}

function dryFlower() {
    sunFlower.properties.thirst += 5;
    sunFlower.properties.drowned -= 10;
    
    if (sunFlower.properties.thirst > 100) {
        sunFlower.properties.thirst = 100;
    }

    if (sunFlower.properties.drowned < 0) {
        sunFlower.properties.drowned = 0;
    }

    document.getElementById("thirstMeter").innerHTML = parseInt(sunFlower.properties.thirst);
    document.getElementById("drownMeter").innerHTML = parseInt(sunFlower.properties.drowned);
    return
}

function flowerWither() {
    // Declare variables for elements
    let flowerHead = document.getElementById("head");
    let flowerBody = document.getElementById("stalk");
    let headWidth
    let headHeight
    let headMargin
    let headBorder
    let bodyWidth
    let bodyHeight

    // Get current length/width, if variable is empty, set to default values
    if (flowerHead.style.width == "") {
        headWidth = 30;
    } else {
        headWidth = parseInt(flowerHead.style.width.replace("px", ""));
    }

    if (flowerHead.style.height == "") {
        headHeight = 30;
    } else {
        headHeight = parseInt(flowerHead.style.height.replace("px", ""));
    }

    if (flowerHead.style.bottom == "") {
        headMargin = 70;
    } else {
        headMargin = parseInt(flowerHead.style.bottom.replace("px", ""));
    }

    if (flowerHead.style.borderWidth == "") {
        headBorder = 12;
    } else {
        headBorder = parseInt(flowerHead.style.borderWidth.replace("px", ""));
    }

    if (flowerBody.style.width == "") {
        bodyWidth = 5;
    } else {
        bodyWidth = parseFloat(flowerBody.style.width.replace("px", ""));
    }

    if (flowerBody.style.height == "") {
        bodyHeight = 70;
    } else {
        bodyHeight = parseInt(flowerBody.style.height.replace("px", ""));
    }

    // Set new height/width
    flowerHead.style.width = headWidth * 0.95 + "px";
    flowerHead.style.height = headHeight * 0.95 + "px";
    flowerHead.style.bottom = headMargin * 0.95 + "px";
    if (headBorder >= 40) {
        flowerHead.style.borderWidth = headBorder * 0.9 + "px";
    }
    if (bodyWidth >= 20) {
        flowerBody.style.width = bodyWidth * 0.95 + "px";
    }
    flowerBody.style.height = bodyHeight * 0.95 + "px";

    flowerBody.style.backgroundColor = "brown";

    updateFlowerObject();
    return
}

function flowerGrow() {
    // Declare variables for elements
    let flowerHead = document.getElementById("head");
    let flowerBody = document.getElementById("stalk");
    let headWidth
    let headHeight
    let headMargin
    let headBorder
    let bodyWidth
    let bodyHeight

    // Get current length/width, if variable is empty, set to default values
    if (flowerHead.style.width == "") {
        headWidth = 30;
    } else {
        headWidth = parseInt(flowerHead.style.width.replace("px", ""));
    }

    if (flowerHead.style.height == "") {
        headHeight = 30;
    } else {
        headHeight = parseInt(flowerHead.style.height.replace("px", ""));
    }

    if (flowerHead.style.bottom == "") {
        headMargin = 70;
    } else {
        headMargin = parseInt(flowerHead.style.bottom.replace("px", ""));
    }

    if (flowerHead.style.borderWidth == "") {
        headBorder = 12;
    } else {
        headBorder = parseInt(flowerHead.style.borderWidth.replace("px", ""));
    }

    if (flowerBody.style.width == "") {
        bodyWidth = 5;
    } else {
        bodyWidth = parseFloat(flowerBody.style.width.replace("px", ""));
    }

    if (flowerBody.style.height == "") {
        bodyHeight = 70;
    } else {
        bodyHeight = parseInt(flowerBody.style.height.replace("px", ""));
    }

    // Set new height/width
    flowerHead.style.width = headWidth * 1.05 + "px";
    flowerHead.style.height = headHeight * 1.05 + "px";
    flowerHead.style.bottom = headMargin * 1.05 + "px";
    if (headBorder < 40) {
        flowerHead.style.borderWidth = headBorder * 1.10 + "px";
    }
    if (bodyWidth < 20) {
        flowerBody.style.width = bodyWidth * 1.05 + "px";
    }
    flowerBody.style.height = bodyHeight * 1.05 + "px";

    flowerBody.style.backgroundColor = "green";

    updateFlowerObject();
    return
}

function updateFlowerObject() {
    let flowerHead = document.getElementById("head");
    let flowerBody = document.getElementById("stalk");

    sunFlower.stalk.width = flowerBody.style.width;
    sunFlower.stalk.height = flowerBody.style.height;
    sunFlower.head.width = flowerHead.style.width;
    sunFlower.head.height = flowerHead.style.height;
    sunFlower.head.borderWidth = flowerHead.style.borderWidth;
}

function makeModal(title, content) {
    // Make modal area
    let outerDiv = document.createElement("div");
    outerDiv.classList.add("modal-container");
    outerDiv.id = "modalContainer";
    
    let modalDiv = document.createElement("div");
    modalDiv.classList.add("modal", "rounded");
    modalDiv.id = "modal";

    let thisTitle = document.createElement("h3");
    thisTitle.innerHTML = title;

    let thisParagraph = document.createElement("p");
    thisParagraph.style.color = "black";
    thisParagraph.innerHTML = content;

    let thisButton = document.createElement("button");
    thisButton.classList.add("rounded");
    let buttonText = document.createElement("h4");
    buttonText.style.color = "black";
    buttonText.innerHTML = "Close";
    thisButton.style.width = "70px";
    thisButton.style.backgroundColor = "lightgreen";
    thisButton.append(buttonText);
    thisButton.addEventListener("click", function() {
        document.getElementById("modalContainer").remove();
        return
    });

    outerDiv.append(modalDiv);
    modalDiv.append(thisTitle, thisParagraph, thisButton);

    document.body.append(outerDiv);
    return
}

function resetGame() {
    clearInterval(grow);
    clearInterval(dryCounter);

    document.getElementById("title").style.display = "block";
    document.getElementById("canButton").style.display = "none";
    document.getElementById("scoreDiv").style.display = "none";

    let flowerHead = document.getElementById("head");
    let flowerBody = document.getElementById("stalk");
    flowerHead.style.width = "30px";
    flowerHead.style.height = "30px";
    flowerHead.style.bottom = "70px";
    flowerHead.style.borderWidth = "12px";
    flowerBody.style.width = "5px";
    flowerBody.style.height = "70px";
    flowerBody.style.backgroundColor = "green";

    sunFlower.properties.thirst = 50;
    sunFlower.properties.drowned = 50;
    document.getElementById("thirstMeter").innerHTML = 50;
    document.getElementById("drownMeter").innerHTML = 50;
    return
}

function showInstructions() {
    let headText = "Instructions";
    let mainText = `<p style='color:black;'>You are growing a sunflower! If it gets too drowned or too dry, it will begin to wither, so use the watering can (but not too much)! You win once the sunflower reaches a certain height, but you lose if it withers too much. Good luck!</p>`;
    makeModal(headText, mainText);
    return
}


// Declare variables and objects
const sunFlower = {
    "stalk": {
        "width": 5,
        "height": 70,
        "color": "green"
    },
    "head": {
        "width": 30,
        "height": 30,
        "color": "yellow",
        "borderWidth": 12
    },
    "properties": {
        "thirst": 50,
        "drowned": 50,
    }
}

document.getElementById("title").addEventListener("click", startGame);
document.getElementById("canButton").addEventListener("click", waterCan);
document.getElementById("instructionButton").addEventListener("click", showInstructions);