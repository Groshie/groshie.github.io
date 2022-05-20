function diceRoll(min, max) {
    return parseInt(Math.floor(Math.random() * max) + 1)
}

function levelUp(char, prof) {
    return
}

function evalWeaponTypeHit(weapon) {
    if (weapon.type == "slashing") {
        let messages = ["slashes", "slices", "chops"];
        let randomNumber = Math.floor(Math.random() * parseInt(messages.length));
        return messages[randomNumber]
    } 

    if (weapon.type == "piercing") {
        let messages = ["stabs", "pierces", "impales"];
        let randomNumber = Math.floor(Math.random() * parseInt(messages.length));
        return messages[randomNumber]
    } 

    if (weapon.type == "blunt") {
        let messages = ["bashes", "crushes", "batters"];
        let randomNumber = Math.floor(Math.random() * parseInt(messages.length));
        return messages[randomNumber]
    } 

    if (weapon.type == "unarmed") {
        let messages = ["punches", "kicks", "headbutts"];
        let randomNumber = Math.floor(Math.random() * parseInt(messages.length));
        return messages[randomNumber]
    } 

    if (weapon.type == "fire") {
        let messages = ["burns", "smokes", "singes"];
        let randomNumber = Math.floor(Math.random() * parseInt(messages.length));
        return messages[randomNumber]
    } 
}

function fight(attacker, defender) {
    thisFight = setInterval(function() {
        let attackerInitiative = parseInt(attacker.attr.dex.bonus + diceRoll(1, 20));
        let defenderInitiative = parseInt(defender.attr.dex.bonus + diceRoll(1, 20));
        
        console.log(attacker.name + " rolled " + attackerInitiative + " for initiative!");
        console.log(defender.name + " rolled " + defenderInitiative + " for initiative!");

        if (attackerInitiative > defenderInitiative) {
            attackerAttack = parseInt(attacker.attr.str.bonus + diceRoll(1, 20));

            if (attackerAttack > defender.prop.totalAC) {
                console.log(attacker.name + " attacks " + defender.name + " and hits!");
                attackerDamage = attacker.attr.str.bonus + diceRoll(1, 4);
                defender.prop.hp -= parseInt(attackerDamage)
                console.log(defender.name + " took " + attackerDamage + " damage!");

                if (defender.prop.hp < 1) {
                    console.log(defender.name + " is dead!");
                    clearInterval(thisFight);
                }

            } else {
                console.log(attacker.name + " attacks " + defender.name + " but misses!");
            }

            defenderAttack = parseInt(defender.attr.str.bonus + diceRoll(1, 20));

            if (defenderAttack > attacker.prop.totalAC) {
                console.log(defender.name + " attacks " + attacker.name + " and hits!");
                defenderDamage = defender.attr.str.bonus + diceRoll(1, 4);
                attacker.prop.hp -= parseInt(defenderDamage)
                console.log(attacker.name + " took " + defenderDamage + " damage!");

                if (attacker.prop.hp < 1) {
                    console.log(attacker.name + " is dead!");
                    clearInterval(thisFight);
                }

            } else {
                console.log(attacker.name + " attacks " + defender.name + " but misses!");
            }

        } else {
            if (defenderAttack > attacker.prop.totalAC) {
                console.log(defender.name + " attacks " + attacker.name + " and hits!");
                defenderDamage = defender.attr.str.bonus + diceRoll(1, 4);
                attacker.prop.hp - parseInt(defenderDamage)
                console.log(attacker.name + " took " + defenderDamage + " damage!");

                if (attacker.prop.hp < 1) {
                    console.log(attacker.name + " is dead!");
                    clearInterval(thisFight);
                }

            } else {
                console.log(attacker.name + " attacks " + defender.name + " but misses!");
            }

            attackerAttack = parseInt(attacker.attr.str.bonus + diceRoll(1, 20));

            if (attackerAttack > defender.prop.totalAC) {
                console.log(attacker.name + " attacks " + defender.name + " and hits!");
                attackerDamage = attacker.attr.str.bonus + diceRoll(1, 4);
                defender.prop.hp - parseInt(attackerDamage)
                console.log(defender.name + " took " + attackerDamage + " damage!");

                if (defender.prop.hp < 1) {
                    console.log(defender.name + " is dead!");
                    clearInterval(thisFight);
                }

            } else {
                console.log(attacker.name + " attacks " + defender.name + " but misses!");
            }

        }
    }, 1000)
    return
}

function calcBonus(attr) {
    return Math.floor((attr-10)/2)
}

function rollDice(min=1,max=6, amount=1) {
    let thisRoll = 0;
    let thisSum = 0;
    for (i=0;i<amount;i++) {
        thisRoll = Math.floor(Math.random() * max) + min;
        thisSum += parseInt(thisRoll);
    }
    return thisSum
}

class creature {
    constructor(name, level) {
        this.name = name;
        
        this.attr = {
            "str": {
                "value": 0,
                "bonus": 0
            },
            "con": {
                "value": 0,
                "bonus": 0
            },
            "dex": {
                "value": 0,
                "bonus": 0
            },
            "int": {
                "value": 0,
                "bonus": 0
            },
            "wis": {
                "value": 0,
                "bonus": 0
            },
            "cha": {
                "value": 0,
                "bonus": 0
            },
        }

        this.prop = {
            "level": 
                {
                    "total": level,
                    "fighter": 0,
                    "wizard": 0,
                    "barbarian": 0
                },
            "hp": 4,
            "baseAC": 10,
            "totalAC": 10,
            "toHit": 0
        }
    }
}

class makeDnDChar {
        constructor() {
            this.attr = {
                "str": {
                    "value": 0,
                    "bonus": 0
                },
                "con": {
                    "value": 0,
                    "bonus": 0
                },
                "dex": {
                    "value": 0,
                    "bonus": 0
                },
                "int": {
                    "value": 0,
                    "bonus": 0
                },
                "wis": {
                    "value": 0,
                    "bonus": 0
                },
                "cha": {
                    "value": 0,
                    "bonus": 0
                },
            }

            this.prop = {
                "level": 1,
                "hp": 4,
                "baseAC": 10,
                "totalAC": 10,
                "toHit": 0
            }
        }

        rollStats() {
            for (let attribute in this.attr) {
                this.attr[attribute].value = rollDice(1, 6, 3);
            }
            return 
        }

        setStats() {
            for (let attribute in this.attr) {
                this.attr[attribute].bonus = calcBonus(this.attr[attribute].value);
                this.prop.totalAC = this.baseAC + this.attr.dex.bonus,
                this.prop.toHit = this.attr.str.bonus;
        }
        return
    }
};