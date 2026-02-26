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

// Declare general talents and chosen talent list (does not include kin-talent)
const generalTalents = {
    "Lightning fast": {
        "Description": "You react with the speed of a snake, and usually strike before your opponent.",
        1: "You can draw two initiative cards instead of one during the initiative draw. Choose the one you want to use, and shuffle the other one back into the deck before others draw their cards.",
        2: "You can draw three initiative cards instead of one during the initiative draw.",
        3: "You can draw four initiative cards instead of one during the initiative draw."
    },
    "Bowyer": {
        "Description": "You have learned how to turn wood and leather into lethal bows and slings.",
        1: "You can use the CRAFTING skill to make ranged weapons from the weapons table (see page 103), with normal stats.",
        2: "You can make ranged weapons with a Weapon Bonus that is one point higher than normal. This takes twice as long, and your roll is modified by –2.",
        3: "You can make ranged weapons with a Weapon Bonus that is two points higher than normal. This takes four times as long and your roll is modified by –4."
    },
    "Builder": {
        "Description": "You are are a skilled engineer and can build advanced constructions in your stronghold.",
        1: "You can build advanced functions in your stronghold. See Chapter 8.",
        2: "You get a +1 modification when you build a function in a stronghold.",
        3: "You can add a D8 Artifact Die to your roll when you build a function in your stronghold."
    },
    "Berserker": {
        "Description": "When you are Broken (see page 107), you can choose to unleash a primal rage uponthe world. You immediately recover as many points in the attribute that has been decreased to zero as your rank in BERSERKER. You must immediately attack the nearest opponent in close combat, and keep fighting until you are Broken (again) or until all opponents within sight have been Broken. During your rage, you are immune to any attempts to MANIPULATE you and all your close combat attacks do one extra point of damage. If Broken during a BERSERKER rage, you cannot use this talent."
    },
    "Executioner": {
        "Description": "You know where to strike to make sure your opponent falls and does not get up again. Ever.",
        1: "When you inflict a critical injury on your opponent, you can reroll once. The highest roll counts.",
        2: "As per rank 1, but you can also reverse the D66 roll for the critical injury – a roll of 16 becomes 61, for example.",
        3: "When you inflict a critical injury on your enemy, you may choose freely from the relevant list."
    },
    "Defender": {
        "Description": "You are skilled at using weapons and shields to protect yourself in close combat.",
        1: "You get one free PARRY every round of combat. The extra PARRY does not count as one of your actions in the round.",
        2: "You get a +1 bonus to all PARRIES.",
        3: "You can PARRY an unlimited number of times in the same round of combat, but only once against the same attack. Only the first PARRY counts towards your actions in the round."
    },
    "Dragonslayer": {
        "Description": "Dragonslayer is the title given to those who seek talents 75 honor and fame by killing beasts and monsters.",
        1: "All your attacks against monsters are modified by +1.",
        2: "Your attacks against monsters cause 1 additional point of damage.",
        3: "You can add a D8 Artifact Die to your roll in attacks against monsters."
    },
    "Ambidextrous": {
        "Description": "You are skilled in the art of fighting with one close combat weapon in each hand. You have a primary weapon in your favored (or sword) hand and a secondary weapon in your other hand. You can draw both weapons with a single DRAW WEAPON action.",
        1: "You can use your secondary weapon to perform one extra attack per round, as a fast action. It must be a LIGHT weapon and the attack is modified by –2.",
        2: "Same as per rank 1, but you can use a normal weapon as your secondary weapon.",
        3: "Same as per rank 2, and your attack with your secondary weapon is not modified."
    },
    "Fisher": {
        "Description": "You have mastered the art of pulling fish from rivers and lakes. You need a net, a rod, or some other piece of fishing equipment. Read more about fishing in Chapter 7.",
        1: "Your roll for SURVIVAL is modified by +1 when you FISH.",
        2: "Fishing sets you at ease. A Quarter Day spent FISHING counts as RESTING for you.",
        3: "The amount of FISH you catch is doubled."
    },
    "Tanner": {
        "Description": "You know the art of turning pelts into leather, and to craft that leather into armor.",
        1: "With a successful CRAFTING roll, you can turn up to D6 units of PELTS into LEATHER. If you fail, the PELTS are destroyed. If you have access to a TANNERY (see page 172), you can create LEATHER faster and without rolling dice. You can also use the CRAFTING skill to make leather armor with normal stats according to the armor table on page 106.",
        2: "You can make leather armor with an Armor Rating that is one point higher than normal. This takes twice as long, and your roll is modified by –2.",
        3: "You can make leather armor with an Armor Rating that is two points higher than normal. This takes four times as long and your roll is modified by –4."
    },
    "Poisoner": {
        "Description": "You have mastered the art of brewing poisons of every kind. Read more about poisons in Chapter 5.",
        1: "You can use the CRAFTING skill to concoct poisons. See the table on page 186 for required raw materials and equipment. The Potency of the poison increases by 1 for every success you roll beyond the first.",
        2: "As per rank 1, and all your rolls to concoct poisons are modified by +1.",
        3: "As per rank 2, and you can add a D8 Artifact Die to your rolls to concoct poisons."
    },
    "Fast footwork": {
        "Description": "You are fast and quick on your feet, and hard to hit in combat.",
        1: "You can DODGE for free once in every round of combat. The extra DODGE doesn’t count toward your actions in the round.",
        2: "You get a +1 bonus whenever you DODGE.",
        3: "You can DODGE an unlimited number of times in the same round of combat, but only once against the same attack. Only the first DODGE counts towards your actions in the round."
    },
    "Threatening": {
        "Description": "You have a scary physical presence and can threaten people to make them do what you want.",
        1: "You can roll MIGHT instead of MANIPULATE when you threaten someone to make them do what you want. If you succeed, your opponent cannot demand anything in return from you. He can still choose to attack you.",
        2: "As per rank 1, and your MIGHT roll is modified by +1 when you threaten someone.",
        3: "As per rank 2, and you can add a D8 Artifact Die to your roll when you threaten someone."
    },
    "Master of the hunt": {
        "Description": "You are a skilled hunter and can find prey where others cannot.",
        1: "Your SURVIVAL roll is modified by +1 when you HUNT during journeys. Read more about journeys in Chapter 7.",
        2: "Hunting sets you at ease. A Quarter Day spent HUNTING counts as RESTING.",
        3: "When HUNTING, you may roll two D6s on the animals table (see page 152) and choose which result you want to use."
    },
    "Firm grip": {
        "Description": "It takes a lot for you to lose your grip on your weapon.",
        1: "DISARMING you requires an extra success – that is, two successes for a one-handed weapon and three successes for a two-handed weapon.",
        2: "DISARMING you requires two extra successes – three successes for a one-handed weapon and four successes for a two-handed weapon.",
        3: "You cannot be DISARMED."
    },
    "Cold blooded": {
        "Description": "You are completely callous and can kill defenseless enemies without so much as a second’s hesitation.",
        1: "You can perform a COUP DE GRACE (see page 108) without needing to roll dice.",
        2: "As per rank 1, and you also don’t need to spend a Willpower Point or suffer damage to Empathy.",
        3: "As per rank 2, but you also recover a point of lost Empathy when you perform a COUP DE GRACE."
    },
    "Throwing arm": {
        "Description": "You can hit anything with a thrown rock.",
        1: "Your attack rolls are modified by +1 when you use a thrown weapon or a sling.",
        2: "You can throw incredibly far. All attacks with a thrown weapon or a sling have LONG range.",
        3: "You can add a D8 Artifact Die to attacks with a thrown weapon or a sling."
    },
    "Knife fighter": {
        "Description": "You are lethal with a knife in hand.",
        1: "Your attack rolls are modified by +1 when you fight with a knife or a dagger.",
        2: "You can STAB as a fast action using a knife or a dagger.",
        3: "You can add a D8 Artifact Die to all attacks with a knife or a dagger."
    },
    "Chef": {
        "Description": "You know how to cook using simple things, even while you are on a journey through the wilderness.",
        1: "You can turn up to D6 units of VEGETABLES, MEAT, or FISH into FOOD (see Chapter 7). Cooking requires a fire and takes a Quarter Day (see page 144). In a proper kitchen, you can cook up to a dozen units of FOOD in a Quarter Day.",
        2: "When you cook for a Quarter Day, you create an extra unit of FOOD.",
        3: "The food you cook is so delicious that whoever eats it immediately recovers a point of lost Empathy."
    },
    "Quartermaster": {
        "Description": "You can find good campsites and can make sure your party are comfortable by the campfire.",
        1: "Your SURVIVAL roll is modified by +1 when you MAKE CAMP during journeys. Read more about journeys in Chapter 7.",
        2: "When you have MADE CAMP, the person KEEPING WATCH gets a +2 bonus to SCOUTING.",
        3: "You can add a D8 Artifact Die to your roll when you MAKE CAMP."
    },
    "Lockpicker": {
        "Description": "You have mastered the art of picking locks. You need some sort of tool. Lockpicks can give you a bonus.",
        1: "Your SLEIGHT OF HAND roll is modified by +1 when you pick a lock.",
        2: "You can roll for SLEIGHT OF HAND to get out of chains or ropes even when you are bound yourself.",
        3: "You can add a D8 Artifact Die to your roll when you pick a lock."
    },
    "Incorruptible": {
        "Description": "When others try to affect you, you are as immovable as a mighty oak in the wind.",
        1: "Your INSIGHT roll is modified by +1 when someone attempts to MANIPULATE you.",
        2: "You can add a D8 Artifact Die to your roll when someone MANIPULATES you.",
        3: "You cannot be MANIPULATED."
    },
    "Fearless": {
        "Description": "Not even the horrors that lurk in the Forbidden Lands scare you.",
        1: "You can roll an INSIGHT roll as “armor” against fear attacks – each success rolled eliminates one success rolled in the fear attack. The INSIGHT roll does not count as an action.",
        2: "You can choose to have damage from a fear attack decrease your Empathy instead of your Wits.",
        3: "You are immune to fear attacks."
    },
    "Pack rat": {
        "Description": "You know how to pack your belongings so they don’t take up much space and your gear becomes easy to carry.",
        1: "You can carry two more items than normal without being encumbered (see page 37).",
        2: "You can carry five more items than normal without being encumbered.",
        3: "You can carry ten more items than normal without being encumbered."
    },
    "Sharpshooter": {
        "Description": "You are a master archer and your arrow almost always hits its target.",
        1: "Your attack rolls are modified by +1 when you SHOOT a bow or a crossbow.",
        2: "You can SHOOT a bow or a crossbow at SHORT and LONG range without any penalties (see page 97).",
        3: "You can add a D8 Artifact Die to any attack with a bow or a crossbow."
    },
    "Horseback fighter": {
        "Description": "You are trained in the art of fightning from the back of a mount. All of the effects below require you to be in an OPEN zone (see page 88).",
        1: "You can fire a short bow or sling from a mount.",
        2: "You get a +1 bonus to all melee attacks from a mount.",
        3: "You can make a MOUNTED CHARGE attack from a mount. This combines a full movement action by the mount (from at least SHORT range to ARM’S LENGTH) with a melee attack by you. You can add a D8 Artifact Die to the melee attack."
    },
    "Sailor": {
        "Description": "You know how to steer rafts and boats over unknown waters.",
        1: "Your SURVIVAL roll is modified by +1 when you LEAD THE WAY at sea (see page 147).",
        2: "Life at sea is soothing to you. A Quarter Day spent LEADING THE WAY on a boat counts as REST for you.",
        3: "You can add a D8 Artifact Die to your SURVIVAL rolls when you LEAD THE WAY at sea."
    },
    "Tailor": {
        "Description": "You know the art of turning wool into cloth, and to craft that cloth into clothes.",
        1: "With a successful CRAFTING roll, you can turn up to D6 units of WOOL into CLOTH. If you fail, the WOOL is destroyed. If you have access to a TAILOR SHOP (see page 171), you can create CLOTH faster and without rolling dice. You can also use CRAFTING to sew clothes of normal quality, similar to to what’s found in the equipment lists on page 190.",
        2: "You can make clothes of superior quality, which can be sold at twice the normal price. Your roll is modified by –2.",
        3: "You can make clothes of exceptional quality, which can be sold at four times the normal price. Your roll is modified by –4."
    },
    "Shield fighter": {
        "Description": "You are one with your shield, and it can protect you from any attack.",
        1: "Your PARRY rolls are modified by ! when you have a shield.",
        2: "You can use your shield to SLASH as a fast action. The Weapon Damage is 1 (blunt trauma).",
        3: "You can add a D8 Artifact Die to all PARRY rolls when you use a shield."
    },
    "Brawler": {
        "Description": "You don’t need weapons to strike down your enemy.",
        1: "All your unarmed attacks are modified by +1.",
        2: "You can headbutt your enemy. It counts as a normal unarmed attack, but it is a fast action.",
        3: "You can add a D8 Artifact Die to all your unarmed attacks."
    },
    "Smith": {
        "Description": "You know the art of hammering coarse iron into lethal blades and protective armor.",
        1: "You can use the CRAFTING skill to make any close combat weapon, shield, or metal armor from the weapons tables in Chapter 5, with normal stats. You can also turn IRON ORE into IRON at a FORGE (see page 167).",
        2: "You can make weapons, shields and metal armor with a Weapon Bonus or Armor Rating that is one point higher than normal. This takes twice as long, and your roll is modified by –2.",
        3: "You can make weeapons, shields and metal armor with a Weapon Bonus or Armor Rating that is two points higher than normal. This takes four times as long and your roll is modified by –4."
    },
    "Pain resistant": {
        "Description": "You have learned to endure pain that would make others lose their minds. This talent can only be used if you use the advanced close combat rules.",
        1: "If you take a single point of damage from a close combat attack, you don’t lose your attack in the same step (see page 96).",
        2: "You never lose your own attack because of pain.",
        3: "You recover one lost point of Agility, Wits or Empathy for every point of damage to Strength that you suffer."
    },
    "Quickdraw": {
        "Description": "You draw your weapon quicker than the enemy can blink.",
        1: "You can draw a LIGHT weapon without spending an action. This includes picking up a weapon from the ground.",
        2: "As per rank 1, but also applicable to normal weapons.",
        3: "As per rank 2, but also applicable to HEAVY weapons."
    },
    "Fast shooter": {
        "Description": "You can fire your bow or sling lightning fast. Hunters can combine this talent with PATH OF THE ARROW.",
        1: "You don’t need to PREPARE before you SHOOT with a ranged weapon. Does not apply to crossbows.",
        2: "You can SHOOT with a ranged weapon and RUN at the same time.",
        3: "You only need to spend a fast action to SHOOT with a ranged weapon, meaning you can SHOOT twice in a round."
    },
    "Spear fighter": {
        "Description": "A mighty spear can slay even the biggest of monsters.",
        1: "You get +1 when you attack with a spear, pike, halberd, or trident.",
        2: "When you wield a spear, pike, halberd, or trident, you may immediately strike an enemy who moves from NEAR range to ARM’S LENGTH from you. The attack counts towards your actions in the round, but breaks the turn order and occurs before the enemy can attack you.",
        3: "You can add a D8 Artifact Die to attacks with a spear, halberd, or trident."
    },
    "Steady feet": {
        "Description": "You have good balance and cannot be knocked over easily.",
        1: "SHOVING you to the ground requires two successes instead of one.",
        2: "You cannot be SHOVED to the ground.",
        3: "You get up from a prone position without spending an action on it. It still needs to happen at your turn in the round."
    },
    "Pathfinder": {
        "Description": "You are a master at finding the right path through woods and over mountains in the wilderness.",
        1: "Your SURVIVAL roll is modified by +1 when you LEAD THE WAY (see page 147).",
        2: "You’re most comfortable in the wilds. LEADING THE WAY for a Quarter Day counts as REST for you.",
        3: "You can add a D8 Artifact Die to your SURVIVAL rolls when you LEAD THE WAY."
    },
    "Melee charge": {
        "Description": "You throw yourself into combat without any concern for the risk",
        1: "When you move from NEAR to ARM’S LENGTH range you can, as the same action, SLASH, STAB, PUNCH, or SHOVE. This is called a CHARGE.",
        2: "Your attack is modified by +1 when you CHARGE.",
        3: "When you CHARGE, you can add a D8 Artifact Die to the roll."
    },
    "Sword fighter": {
        "Description": "You have practiced with a sword in hand since you were a child.",
        1: "Your attack and PARRY rolls are modified by +1 when you fight with a sword.",
        2: "You can SLASH two enemies with your sword with a single action. Roll separately for the two attacks. If you use hidden combinations (see page 94), the second attack occurs outside of the combination.",
        3: "You can add a D8 Artifact Die to all attack and PARRY rolls with a sword."
    },
    "Lucky": {
        "Description": "No matter how bad the odds are, you always get away unscathed.",
        1: "When you suffer a critical injury, you can reroll once. The lowest roll counts.",
        2: "As per rank 1, but you can also reverse the D66 roll for the critical injury – a roll of 16 becomes 61, for example.",
        3: "When you suffer a critical injury, you may choose your injury freely from the relevant list.",
        "Comment": "If your opponent has the talent EXECUTIONER, these talents cancel each other out. One rank in EXECUTIONER cancels out one rank of LUCKY."
    },
    "Wanderer": {
        "Description": "You can travel on foot through the wilderness for a long time without stopping for rest.",
        1: "Your ENDURANCE roll is modified by +1 when you force march (see page 146).",
        2: "Your ENDURANCE rolls for forced marches succeed automatically.",
        3: "HIKING for a Quarter Day counts as REST for you."
    },
    "Sharp tongued": {
        "Description": "You are a master at formulating scathing abuses that can unhinge even the most steadfast of enemies.",
        1: "When you MANIPULATE someone, and roll more successes than you need to win the opposed roll, you can inflict 1 point of damage to Empathy on your opponent per extra success.",
        2: "Your MANIPULATE roll is modified by +1 if you insult your opponent.",
        3: "You can add a D8 Artifact Die to your MANIPULATE roll if you insult your opponent in some way."
    },
    "Axe fighter": {
        "Description": "Nothing splits a shield – or a skull – like a mighty axe.",
        1: "Your attack rolls are modified by +1 when you fight with an axe.",
        2: "When you hit an enemy with your axe and inflict at least 1 point of damage, you automatically inflict a critical injury (slash wound). The critical injury itself doesn’t break your opponent – unless it kills him of course. No effect against monsters or animals.",
        3: "You can add a D8 Artifact Die to all attack rolls with an axe."
    },
    "Sixth sense": {
        "Description": "The hairs on the back of your neck stand up when enemies lurk in the bushes.",
        1: "Your SCOUT roll is modified by +1 when an enemy tries to ambush you or performs a sneak attack (see page 90).",
        2: "When you spot an ambush or a sneak attack, you also see how many the attackers are, what kin they belong to, and what weapons they use.",
        3: "You can add a D8 Artifact Die to your SCOUT roll when you try to spot an ambush or a sneak attack."
    },
    "Herbalist": {
        "Description": "You know the difference between edible plants and regular weeds.",
        1: "Your SURVIVAL roll is modified by +1 when you FORAGE during journeys. Read more about journeys in Chapter 7.",
        2: "Walking the lands sets you at ease. A Quarter Day spent FORAGING counts as RESTING for you.",
        3: "The amount of VEGETABLES you find when FORAGING is doubled."
    }
};

const selectedTalents = {};

const selectedItems = {
    "Eq": [],
    "Armors": [],
    "Weapons": []
};

const spells = {
    "General": {
        1: [
            "Sense magic",
            "Arcane sigil",
        ],
        2: [
            "Anti magic",
            "Hide spell"
        ],
        3: [
            "Bind spell",
            "Transfer"
        ]
    },
    "Path of Healing": {
        1: [
            "Healing hands",
            "Healer",
            "Soul light"
        ],
        2: [
            "Destroy undead",
            "Banish demon",
            "Cure critical wounds"
        ],
        3: [
            "Harmony",
            "Control weather",
            "Resurrect"
        ]
    },
    "Path of Shapeshifting": {
        1: [
            "Hawkeye",
            "Catfoot",
            "Speak with animal"
        ],
        2: [
            "Control animal",
            "Bear ram",
            "Deer leap"
        ],
        3: [
            "Animal influence",
            "Shapeshift"
        ]
    },
    "Path of Sight": {
        1: [
            "Lightbringer",
            "Hexed hearing",
            "True sight"
        ],
        2: [
            "Past sight",
            "Farsight",
            "The wise path"
        ],
        3: [
            "Intuition",
            "Tell fortune",
            "Transfer thoughts"
        ]
    },
    "Path of Sigils": {
        1: [
            "Paralyze",
            "Tempt",
            "Terrify"
        ],
        2: [
            "Blind",
            "Twist mind",
            "Prevent action"
        ],
        3: [
            "Dominate",
            "Power sigil",
            "Portal"
        ]
    },
    "Path of Stone": {
        1: [
            "Stun",
            "Stone dust",
            "Mountainspeaker"
        ],
        2: [
            "Shape rock",
            "Propel rock",
            "Wither rock"
        ],
        3: [
            "Song of smithing",
            "Quake",
            "Stone servant"
        ]
    },
    "Path of Blood": {
        1: [
            "Arouse",
            "Unaffected",
        ],
        2: [
            "Force demon",
            "Blood oath",
            "Combust"
        ],
        3: [
            "Hex",
            "Imbue power",
            "Trap soul"
        ]
    },
    "Path of Death": {
        1: [
            "Infect",
            "Defile",
            "Cold of death",
            "Dampen mind"
        ],
        2: [
            "Hand of death",
            "Speak to the dead",
            "Awaken dead"
        ],
        3: [
            "Absorb life",
            "Terror",
            "Age"
        ]
    },
};

// Declare main skill object
const skills = {
    "Strength": ["Might", "Endurance", "Melee", "Crafting"],
    "Agility": ["Stealth", "Sleight-of-hand", "Move", "Marksmanship"],
    "Wits": ["Scouting", "Lore", "Survival", "Insight"],
    "Empathy": ["Manipulation", "Performance", "Healing", "Animal handling"]
};

// Declare main kin object
const kins = {
    "Human": {
        "Attribute": "Empathy", 
        "Talent": {
            "Adaptive": "Humans are new to the Forbidden Lands and are seen as intruders by the other kin. But no other kin can adapt to new situations and living conditions the way the humans can. If you spend a Willpower Point when you are about to roll for a skill, you can roll for any skill of your choice to achieve the same result. You must be able to motivate how you use the chosen skill. The GM has final say, but should give you some leeway."
        }
    }, 
    "Elf": {
        "Attribute": "Agility", 
        "Talent": {
            "Inner peace": "Elves have a connection to the inner nature of their own, far beyond that of any of the other kin. Their immortality makes them less susceptible to the trials of the world compared to the other kin. By spending a Willpower Point, you can enter a state of deep meditation. This lasts for a Quarter of a day (see page 144) during which you must remain undisturbed. When you emerge from the meditation, you have healed all damage to all attributes as well as any critical injuries."
        }
    }, 
    "Half-elf": {
        "Attribute": "Wits", 
        "Talent": {
            "Psychic power": "The dual heritage of the half-elves makes them particularly suited to channel their force of will to achieve feats beyond the natural. Every time you spend one or more Willpower Points to activate a talent or cast a spell, the first WP count as two. If you spend two WP it counts as three, and so on. Note that this also increases the risk of magic mishaps (see page 118)."
        }
    }, 
    "Dwarf": {
        "Attribute": "Strength", 
        "Talent": {
            "True grit": "Dwarves are far more stubborn than others, and can fight on when other kin have no strength left. You can push a dice roll multiple times (see page 44) by spending Willpower Points. Every point spent allows you to push the roll one more time."
        }
    }, 
    "Halfling": {
        "Attribute": "Empathy", 
        "Talent": {
            "Hard to catch": "Halflings are notoriously hard to get a grip on, and they can easily evade even the most tenacious of pursuers. You can spend Willpower Points in combat to avoid being hit by physical attacks (see Chapter 5). Every WP spent eliminates one success the attacker rolls."
        }
    }, 
    "Wolfkin": {
        "Attribute": "Agility", 
        "Talent": {
            "Hunting instincts": "The wolfkin have a powerful sense of smell and can track their prey for days once they have caught their scent. You can spend Willpower Points to designate a person or a creature as your prey. Your prey must be within line of sight, or there must be a scent to follow. The number of WP you spend equals the number of days that you can follow your prey’s scent. In combat, all your attacks against your prey get a +1 bonus per WP spent, until the creature is Broken or until you choose to let your prey go."
        }
    }, 
    "Orc": {
        "Attribute": "Strength", 
        "Talent": {
            "Unbreakable": "The orcs were created to serve. Their bodies are strong, and they are very resilient when it comes to pain and punishment. When you are Broken by any kind of damage (see page 107), you can spend Willpower Points to immediately get back on your feet. For every point you spend, you recover 1 point of the Broken attribute. You cannot use this talent unless you are Broken. The talent does not affect critical injuries."
        }
    }, 
    "Goblin": {
        "Attribute": "Agility", 
        "Talent": {
            "Sneaky": "Goblins are often considered sneaky and untrustworthy by other kin, and many do their best to live up their infamy. When rolling for STEALTH, you can spend Willpower Points which are automatically turned into extra x. You may even roll first and spend WP after you see how the roll goes."
        }
    }
};

// Declare main profession object
const profs = {
    "Druid": {
        "Attribute": "Wits", 
        "Skills": [
            "Endurance",
            "Survival",
            "Insight",
            "Healing",
            "Animal handling"
        ], 
        "Talents": {
            "Path of Healing": {
                "Description": "Your calling is to use the forces of nature to heal and nurture the injured and the lost souls. The rank of this talent determines which spells you can use. Read more about magic in Chapter 6.",
                1: "You can cast rank 1 spells from the Healing discipline.",
                2: "You can cast rank 1 and rank 2 spells from the Healing discipline.",
                3: "You can cast rank 1, 2 and 3 spells from the Healing discipline."
            },
            "Path of Shifting Shapes": {
                "Description": "You are one with the feral creatures of the world and can assume their attributes or even take their form. The rank of this talent determines which spells you can use. Read more about magic in Chapter 6.",
                1: "You can cast rank 1 spells from the Shapeshifting discipline.",
                2: "You can cast rank 1 and rank 2 spells from the Shapeshifting discipline.",
                3: "You can cast rank 1, 2 and 3 spells from the Shapeshifting discipline."
            },
            "Path of Sight": {
                "Description": "You can see beyond sight, and your inner eye can see what has happened and what will happen. The rank of this talent determines which spells you can use. Read more about magic in Chapter 6.",
                1: "You can cast rank 1 spells from the Awareness discipline.",
                2: "You can cast rank 1 and rank 2 spells from the Awareness discipline.",
                3: "You can cast rank 1, 2 and 3 spells from the Awareness discipline."
            }
        }, 
        "Equipment": [
            "Staff or Knife", 
            "Utensil item"
        ], 
        "Resources": {
            "Food": "D8", 
            "Water": "D8"
        }
    },
    "Hunter": {
        "Attribute": "Agility", 
        "Skills": [
            "Stealth",
            "Move",
            "Marksmanship",
            "Scouting",
            "Survival"
        ], 
        "Talents": {
            "Path of the Beast": {
                "Description": "You have an animal as a trusted companion. Pick the type of animal yourself from the table on page 124 of the Gamemaster’s Guide, and give your animal a name. You cannot choose a riding animal.",
                1: "Your animal can scout for you. You can spend a Willpower Point to send the animal ahead to check out a place nearby, and the animal will warn you if there is a threat there.",
                2: "Your animal can help you when you are Broken (see page 107). Every WP you spend recovers one point of the attribute that has reached zero. You cannot use this effect when you are not Broken.",
                3: "You can send your animal to fight for you. If you spend a WP when it is your turn to fight, the animal will also fight and follow your orders for one round, at your turn in the initiative order. Roll normally for the animal’s attacks.",
                "Comment": "Your animal will protect itself if it is attacked, but if you want it to fight for you, you need rank 3 of this talent. If your animal dies, you can tame a new one (read more on page 58). Once you have tamed an animal, you can choose to use it as a new companion. You keep your rank of PATH OF THE beast."
            },
            "Path of the Arrow": {
                "Description": "You are a master archer and fire arrows as if they were controlled by your own will.",
                1: "When you hit with a ranged weapon attack, you can spend a Willpower Point to find a weakness in your opponent’s armor or natural armor. The armor offers no protection against your attack.",
                2: "Once you have used up all your actions during the round, you can spend a WP to immediately attack again using a ranged weapon. However, said weapon must have been PREPARED earlier.",
                3: "When you hit with a ranged weapon attack, you can increase the damage by spending WP. Every point spent increases damage by 1. You must state how many WP you use before your opponent rolls for any armor."
            },
            "Path of the Forest": {
                "Description": "You are a master at surviving in the wilderness. Read more about journeys in Chapter 7.",
                1: "When you FORAGE, HUNT, or LEAD THE WAY, you succeed automatically if you spend a Willpower Point. You can roll first and spend the point if you fail.",
                2: "When rolling to endure cold (see page 111), you automatically succeed if you spend a WP. You can roll first and spend the point if you fail.",
                3: "By spending a WP, you don’t need to eat or drink during one full day."
            }
        }, 
        "Equipment": [
            "Bow or Sling", 
            "Utensil item", 
            "Utensil item"
        ], 
        "Resources": {
            "Food": "D8", 
            "Water": "D8", 
            "Arrows": "D10"
        }},
    "Fighter": {
        "Attribute": "Strength", 
        "Skills": [
            "Might",
            "Endurance",
            "Melee",
            "Crafting",
            "Move"
        ], 
        "Talents": {
            "Path of the Blade": {
                "Description": "You are one with your blade. You practice with your weapon every day and know all its qualities, as if it were part of your own body.",
                1: "When you hit with a close combat attack, you can spend a Willpower Point to find a weakness in your opponent’s armor or natural armor. The armor has no effect against your attack.",
                2: "Once you have used up all your actions during the round, you can spend a WP to immediately attack again in close combat.",
                3: "When you hit with a close combat attack, you can increase the damage by spending WP. Every point spent increases damage by 1. You must state how many WP you use before your opponent rolls for armor."
            },
            "Path of the Shield": {
                "Description": "You are a rock in the heat of battle, immovable and hard to kill. This talent affects how you PARRY attacks, regardless of whether you do it with a shield or a weapon.",
                1: "When a friend within NEAR range is attacked, you can spend a Willpower Point to PARRY the attack for him. Your PARRY follows the normal rules and counts as one of your actions in the round.",
                2: "When you PARRY, you can immediately spend a WP to not count the PARRY against your actions in the round, making it “free.” You can do this several times in a round, as long as you have WP to spend.",
                3: "When you PARRY successfully, you can decrease damage further by spending WP. Every point you spend decreases damage by 1. You must state how many WP you use before you roll for armor."
            },
            "Path of the Enemy": {
                "Description": "You see through your opponent and anticipate his next move before it happens. Observe that this talent is only applicable if you use the system for hidden combinations in close combat (see page 94).",
                1: "If you spend a Willpower Point when you and your opponent choose your hidden combinations, your opponent must choose his combination first and then reveal his first or second card to you before you choose your own combination. Your opponent chooses which card to show.",
                2: "As per rank 1, but you decide if your opponent shows the first or second card of his combination.",
                3: "As per rank 1, but your opponent must show both his actions before you choose your own actions."
            }
        }, 
        "Equipment": [
            "One-handed weapon", 
            "Studded leather armor", 
            "Utensil item"
        ], 
        "Resources": {
            "Food": "D8", 
            "Water": "D6"
        }},
    "Sorcerer": {
        "Attribute": "Wits", 
        "Skills": [
            "Crafting",
            "Sleight-of-hand",
            "Lore",
            "Insight",
            "Manipulation"
        ], 
        "Talents": {
            "Path of Signs": {
                "Description": "The rank of this talent determines which spells you can use. Read more about magic in Chapter 6.",
                1: "You can cast rank 1 spells from the Symbolism discipline.",
                2: "You can cast rank 1 and rank 2 spells from the Symbolism discipline.",
                3: "You can cast rank 1, 2 and 3 spells from the Symbolism discipline."
            },
            "Path of Stone": {
                "Description": "The rank of this talent determines which spells you can use. Read more about magic in Chapter 6.",
                1: "You can cast rank 1 spells from the Stone Song discipline.",
                2: "You can cast rank 1 and rank 2 spells from the Stone Song discipline.",
                3: "You can cast rank 1, 2 and 3 spells from the Stone Song discipline."
            },
            "Path of Blood": {
                "Description": "The rank of this talent determines which spells you can use. Read more about magic in Chapter 6.",
                1: "You can cast rank 1 spells from the Blood Magic discipline.",
                2: "You can cast rank 1 and rank 2 spells from the Blood Magic discipline.",
                3: "You can cast rank 1, 2 and 3 spells from the Blood Magic discipline."
            },
            "Path of Death": {
                "Description": "The rank of this talent determines which spells you can use. Read more about magic in Chapter 6.",
                1: "You can cast rank 1 spells from the Death Magic discipline.",
                2: "You can cast rank 1 and rank 2 spells from the Death Magic discipline.",
                3: "You can cast rank 1, 2 and 3 spells from the Death Magic discipline."
            }
        }, 
        "Equipment": [
            "Staff or Knife", 
            "Utensil item"
        ], 
        "Resources": {
            "Food": "D6", 
            "Water": "D8"
        }},
    "Peddler": {
        "Attribute": "Empathy", 
        "Skills": [
            "Crafting",
            "Sleight-of-hand",
            "Scouting",
            "Insight",
            "Manipulation"
        ], 
        "Talents": {
            "Path of Gold": {
                "Description": "You are a master at bargaining and have an unerring ability to sniff out gold and jewels.",
                1: "When you are about to buy an item, you can spend a Willpower Point to automatically negotiate the price down. The price is decreased by one-fifth for every WP you spend. You can spend a maximum of 4 WP per item, which decreases the price to one-fifth.",
                2: "When you enter a new room, you can spend a WP to detect if there are valuables in the room and if so, where. This talent only applies to gold and jewels, not unique artifacts.",
                3: "You always have gold hidden somewhere. For every WP you spend, you find 1 piece of gold in one of your pockets, even if you were recently searched or something similar."
            },
            "Path of Many Things": {
                "Description": "You carry a knapsack that contains a seemingly endless supply of stuff and knick knacks. The knapsack is a HEAVY item (see page 37).",
                1: "When you spend Willpower Points, you can find almost any item from the list of trade goods (see page 182). It cannot be a HEAVY object and it cannot cost more than 1 piece of silver per WP spent.",
                2: "As per rank 1, but you can also find a weapon (from the weapon tables) in your knapsack.",
                3: "As per rank 2, but the item can cost up to 1 piece of gold per WP spent.",
                "Comment": "Once you have pulled an item from your knapsack, you must write it down on your character sheet, and you cannot put it back in your knapsack again. If you lose your knapsack, you must get a new one before you can use this talent again. This requires a visit to a trading post of some kind and that you spend a WP and 2D6 silver."
            },
            "Path of Lies": {
                "Description": "You are a master liar, skilled at both seeing through lies and telling them yourself without being discovered.",
                1: "If you spend a Willpower Point when speaking with an NPC, the GM must reveal if the NPC is lying or not. The GM does not have to reveal what exactly the NPC is lying about.",
                2: "When you MANIPULATE an NPC to make him believe what you are saying (regardless of whether it’s true or not), you can spend a WP to succeed automatically. You can roll first and use this talent if you fail.",
                3: "When you MANIPULATE someone and succeed, you can spend a WP to avoid doing something in return (see page 99) and your opponent also loses the ability to attack you. What you are asking must still be reasonable according to the GM’s assessment."
            }
        }, 
        "Equipment": [
            "Knife", 
            "Utensil item", 
            "Utensil item", 
            "Utensil item"
        ], 
        "Resources": {
            "Food": "D8", 
            "Water": "D8"
        }},
    "Rider": {
        "Attribute": "Agility", 
        "Skills": [
            "Endurance",
            "Melee",
            "Marksmanship",
            "Survival",
            "Animal handling"
        ], 
        "Talents": {
            "Path of the Companion": {
                "Description": "Your horse (or another riding animal) is your closest friend and companion, and will help you if you are in trouble.",
                1: "If you spend a Willpower Point when you are Broken (see page 107), your horse will stay by your side and defend you. The horse will attack any opponents that attempt to attack or move you.",
                2: "Your horse can help you get up on your feet when you are Broken. For every WP you spend, you recover one point of the attribute that has been reduced to zero. You cannot use this effect if you are not Broken.",
                3: "Your horse can kick opponents when you are in the saddle. If you spend a WP when it is your turn to act in the round, the horse can also attack in close combat, right after your action. Roll normally for the horse’s attack.",
                "Comment": "If your mount is killed, you can buy or tame a new one and use your talent with the new mount."
            },
            "Path of the Knight": {
                "Description": "You are a master at fighting mounted. All the effects of this talent require that you are mounted and that you are in an OPEN zone in combat (see page 88).",
                1: "You can spend Willpower Points to draw extra initiative cards during the initiative draw, and choose the best card. Every WP allows you to draw one extra card, and you can choose the best one. The cards you have discarded are shuffled back into the deck before the other combatants draw their cards. This talent can be combined with LIGHTNING FAST, letting you draw three initiative cards.",
                2: "When you are mounted, you can spend WP to defend against attacks. Every WP you spend eliminates one success your opponent has rolled.",
                3: "When you attack from a mount in close combat and your attack roll succeeds, you can spend WP to increase damage. Every point spent increases damage by 1. You must state how many WP you use before your opponent rolls for armor."
            },
            "Path of the Plains": {
                "Description": "Your mount is fast like the wind.",
                1: "For every Willpower Point you spend, your mount can move one extra hex square in a Quarter Day (see page 144), in normal terrain. Difficult terrain requires two WP per extra hex square.",
                2: "When you are mounted, you can spend a WP to escape from combat without rolling dice (see page 89). All other limitations apply.",
                3: "You can coax your mount into running at breakneck speed for a short period of time. Every WP you spend increases the mount’s Movement Rate (see page 115) one step, but only during one round."
            }
        }, 
        "Equipment": [
            "Riding horse", 
            "Spear or Axe", 
            "Shortbow or Sling", 
            "Utensil item"
        ], 
        "Resources": {
            "Food": "D8", 
            "Water": "D8", 
            "Arrows": "D10"
        }},
    "Minstrel": {
        "Attribute": "Empathy", 
        "Skills": [
            "Lore",
            "Insight",
            "Manipulation",
            "Performance",
            "Healing"
        ], 
        "Talents": {
            "Path of the Song": {
                "Description": "Your beautiful voice can captivate any audience, and can even torment the listeners if you so choose.",
                1: "By spending Willpower Points and singing, you can draw the attention of everyone in NEAR range to yourself for a few minutes. They stop what they are doing, and any SCOUTING roll they make is modified negatively by the number of WP you spend. This has no effect in combat.",
                2: "As per rank 1, but you can also persuade your audience to pay for your singing. They will pay what they can, up to a number of silver pieces equal to the number of WP you spend.",
                3: "You can sing so powerfully that your song cuts into the ears of any listeners within SHORT range. Your song causes 1 point of damage to Strength per WP you spend. You can distribute the damage across as many opponents as you want. The targets may attempt to resist the effect by rolling for INSIGHT – each success rolled negates 1 point of damage. No effect against monsters."
            },
            "Path of the Hymn": {
                "Description": "Your songs can help your comrades get up on their feet, even in the heat of combat. Using the talent in combat counts as a slow action.",
                1: "You can help a Broken comrade within SHORT range to get up on her feet. For every WP you spend, your comrade recovers one point of the attribute that has been reduced to zero.",
                2: "A number of your comrades, equal to the number of WP you spend and within SHORT range, each recover 1 point of damage to an attribute (see page 104). You decide which attribute they all recover.",
                3: "Your song grants a portion of your power to one of your comrades within LONG distance. You simply give a number of WP of your choice to your friend. The half-elf kin talent PSYCHIC POWER cannot be combined with this effect."
            },
            "Path of the Warcry": {
                "Description": "Your voice inspires your comrades and strikes fear into the hearts of your enemies. Using this talent in combat counts as a slow action (see page 85).",
                1: "You can emit a warcry that grants all your comrades within SHORT range a bonus to all attacks during the round, until you perform another action. Their rolls are modified by +1 for every WP you spend.",
                2: "You can emit a roar that modifies the close combat attacks of all opponents within SHORT range until it’s your turn to act again in the next round. Their rolls are modified by –1 for every WP you spend. Note this has no effect against monsters.",
                3: "Your cry can strike fear into the heart of the most savage of opponents. Your cry inflicts 1 point of damage to Wits in a single opponent within SHORT range for every WP you spend. The target may attempt to resist the effect by rolling for INSIGHT – each success rolled negates 1 point of damage. No effect against monsters."
            }
        }, 
        "Equipment": [
            "Lyre or Flute", 
            "Knife", 
            "Utensil item"
        ], 
        "Resources": {
            "Food": "D8", 
            "Water": "D6"
        }},
    "Rogue": {
        "Attribute": "Agility", 
        "Skills": [
            "Melee",
            "Stealth",
            "Sleight-of-hand",
            "Move",
            "Manipulation"
        ], 
        "Talents": {
            "Path of the Face": {
                "Description": "You are a master of disguise and can easily assume the appearance of others.",
                1: "By spending a Willpower Point and preparing for a moment, you can assume the appearance of another person, but not their voice or demeanor. The person must be of the same sex and kin as you are. Anyone who knows the person and sees you at NEAR range can discover your ruse by rolling INSIGHT. Every extra WP you spend when you create your disguise modifies any roll to see through it by –1.",
                2: "As per rank 1, but you can also mimic voices and demeanors. If you talk to someone who knows the person you are imitating, he can see through your disguise as per rank 1 above.",
                3: "You can assume another person’s appearance completely, even if they are of the opposite sex or another kin. In other respects, treat this the same as per rank 2."
            },
            "Path of Poison": {
                "Description": "You always carry an assortment of poisons. Your collection counts as one TINY item and doesn’t encumber you.",
                1: "By spending a Willpower Point, you can pull out one dose of lethal poison (see page 113) with a Potency equal to the number of WP you spend multiplied by 3.",
                2: "As per rank 1, but you can also choose another kind of poison. See the examples on page 113.",
                3: "As per rank 2, but you can also choose to have the poison already applied to one of your weapons, for example, right before an attack (see page 114). Using this talent does not count as an action.",
                "Comment": "If you lose your collection of poisons, you must get a new one before you can use this talent again. This requires a visit to a trading post of some kind and that you spend a WP and 2D6 silver."
            },
            "Path of the Killer": {
                "Description": "Battles are not always fought in the open and with steel clashing against steel. Another, less heroic type of fight takes place in the shadows, with hidden weapons and unsuspecting victims.",
                1: "When you succeed with a SNEAK ATTACK (see page 90), you can spend Willpower Points to increase damage. Every WP you spend increases damage by 1.",
                2: "By spending a WP, you can slither your way out of any restraints or push yourself through the smallest of openings, down to a few inches wide.",
                3: "You can make others do your job for you through the power of hypnosis. By spending a WP, you can force your opponent to perform a specific action at a time of your choosing. However, you must speak to your opponent for a short time before you can use this talent."
            }
        }, 
        "Equipment": [
            "Dagger", 
            "Utensil item", 
            "Utensil item"
        ], 
        "Resources": {
            "Food": "D6", 
            "Water": "D6"
        }
    }
};

// Declare main age group object
const ages = {
    "Young": {"attrPoint": 15, "skillPoint": 8, "talents": 1},
    "Middle aged": {"attrPoint": 14, "skillPoint": 10, "talents": 2}, 
    "Old": {"attrPoint": 13, "skillPoint": 12, "talents": 3}
};

const items = {
    "Arrows, iron": {
        "cost": "12 copper",
        "weight": "Normal",
        "bonus": 0,
        "type": "Resource",
        "effect": "Increase Arrows-resource die by one step"
    },
    "Arrows, wood": {
        "cost": "6 copper",
        "weight": "Normal",
        "bonus": 0,
        "type": "Resource",
        "effect": "Increase Arrows-resource die by one step - target defense value is doubled"
    },
    "Quiver": {
        "cost": "8 copper",
        "weight": "-",
        "bonus": 0,
        "type": "Utility",
        "effect": "Does not count towards encumbrance"
    },
    "Grappling hook": {
        "cost": "3 silver",
        "weight": "Normal",
        "bonus": [1, "Climbing"],
        "type": "Utility",
        "effect": "User has +1 item bonus when climbing"
    },
    "Rope, 10 meter": {
        "cost": "2 silver",
        "weight": "Normal",
        "bonus": [1, "Climbing"],
        "type": "Utility",
        "effect": "User has +1 item bonus when climbing"
    },
    "Tallow candle": {
        "cost": "6 copper",
        "weight": "Tiny",
        "bonus": 0,
        "type": "Utility",
        "effect": "Provides light within an arms length for a quarter day"
    },
    "Oil lamp": {
        "cost": "5 copper",
        "weight": "Light",
        "bonus": 0,
        "type": "Utility",
        "effect": "Provides light for one indoor zone - needs lamp oil"
    },
    "Oil lantern": {
        "cost": "2 silver",
        "weight": "Light",
        "bonus": 0,
        "type": "Utility",
        "effect": "Provides light within one zone - needs lamp oil"
    },
    "Torch": {
        "cost": "5 copper",
        "weight": "Normal",
        "bonus": 0,
        "type": "Resource",
        "effect": "Increase Torches-resource die by one step - Provides light for one zone, roll resource die each quarter of an hour"
    },
    "Bag": {
        "cost": "8 copper",
        "weight": "-",
        "bonus": 0,
        "type": "Utility",
        "effect": "Does not count towards encumbrance"
    },
    "Backpack": {
        "cost": "4 silver",
        "weight": "-",
        "bonus": 0,
        "type": "Utility",
        "effect": "Does not count towards encumbrance"
    },
    "Water skin": {
        "cost": "3 silver",
        "weight": "-",
        "bonus": 0,
        "type": "Utility",
        "effect": "Needed for carrying water. Does not count towards encumbrance"
    },
    "Cloth bandage": {
        "cost": "6 copper",
        "weight": "Light",
        "bonus": [1, "Healing"],
        "type": "Utility",
        "effect": "User has +1 item bonus in Healing attempts"
    },
    "Lamp oil": {
        "cost": "2 copper",
        "weight": "Light",
        "bonus": 0,
        "type": "Utility",
        "effect": "Enough for a quarter of a day"
    },
    "Feather pen and ink": {
        "cost": "2 silver",
        "weight": "Tiny",
        "bonus": 0,
        "type": "Utility",
        "effect": "Can be used to write spells"
    },
    "Parchment": {
        "cost": "6 copper",
        "weight": "Tiny",
        "bonus": 0,
        "type": "Utility",
        "effect": "Can be used to write spells"
    },
    "Blanket": {
        "cost": "7 copper",
        "weight": "Light",
        "bonus": [1, "Cold"],
        "type": "Utility",
        "effect": "User has +1 item bonus against cold"
    },
    "Sleeping bag": {
        "cost": "3 silver",
        "weight": "Normal",
        "bonus": [2, "Cold"],
        "type": "Utility",
        "effect": "User has +2 item bonus against cold"
    },
    "Flint and steel": {
        "cost": "2 copper",
        "weight": "Tiny",
        "bonus": [1, "Making camp"],
        "type": "Utility",
        "effect": "User has +1 item bonus when Making camp during travel"
    },
    "Lockpicks": {
        "cost": "1 gold",
        "weight": "Tiny",
        "bonus": 0,
        "type": "Utility",
        "effect": "User has +1 item bonus in Sleight-of-hand when lockpicking"
    },
    "Field rations": {
        "cost": "1 silver",
        "weight": "Normal",
        "bonus": 0,
        "type": "Resource",
        "effect": "One unit of food. Increases resource die for Food by one step"
    },
    "Field kitchen": {
        "cost": "4 silver",
        "weight": "Heavy",
        "bonus": 0,
        "type": "Utility",
        "effect": "Makes it possible to cook 2D6 units of food per quarter of a day"
    },
    "Cookware": {
        "cost": "18 copper",
        "weight": "Normal",
        "bonus": [1, "Food"],
        "type": "Utility",
        "effect": "User has +1 item bonus when creating food"
    },
    "Wine fount (metal)": {
        "cost": "7 copper",
        "weight": "Light",
        "bonus": 0,
        "type": "Utility",
        "effect": "None"
    },
    "Tankard": {
        "cost": "2 copper",
        "weight": "Light",
        "bonus": 0,
        "type": "Utility",
        "effect": "None"
    },
    "Plate (metal)": {
        "cost": "8 copper",
        "weight": "Light",
        "bonus": 0,
        "type": "Utility",
        "effect": "None"
    },
    "Table knife": {
        "cost": "6 copper",
        "weight": "Tiny",
        "bonus": 0,
        "type": "Utility",
        "effect": "None"
    },
    "Spoon": {
        "cost": "8 copper",
        "weight": "Tiny",
        "bonus": 0,
        "type": "Utility",
        "effect": "None"
    },
    "Leghold trap": {
        "cost": "5 silver",
        "weight": "Normal",
        "bonus": [2, "Hunting"],
        "type": "Utility",
        "effect": "User has +2 item bonus when Hunting during travel"
    },
    "Snares": {
        "cost": "1 silver",
        "weight": "Light",
        "bonus": [1, "Hunting"],
        "type": "Utility",
        "effect": "User has +1 item bonus when Hunting during travel"
    },
    "Barrel": {
        "cost": "8 copper",
        "weight": "Heavy",
        "bonus": 0,
        "type": "Utility",
        "effect": "Can hold 10 units of water or other liquids"
    },
    "Clay pot": {
        "cost": "5 copper",
        "weight": "Light",
        "bonus": 0,
        "type": "Utility",
        "effect": "Can hold one unit of water or other liquids"
    },
    "Small tent": {
        "cost": "2 silver",
        "weight": "Normal",
        "bonus": [2, "Make camp"],
        "type": "Utility",
        "effect": "Room for two people. User has +2 when Making camp"
    },
    "Large tent": {
        "cost": "5 silver",
        "weight": "Heavy",
        "bonus": [2, "Make camp"],
        "type": "Utility",
        "effect": "Room for six people. User has +2 when Making camp"
    },
    "Fishing hook and line": {
        "cost": "4 copper",
        "weight": "Light",
        "bonus": [2, "Fishing"],
        "type": "Utility",
        "effect": "User has +1 item bonus when Fishing during travel"
    },
    "Fishing net": {
        "cost": "1 silver",
        "weight": "Normal",
        "bonus": [2, "Fishing"],
        "type": "Utility",
        "effect": "User has +2 item bonus when Fishing during travel"
    },
    "Magnifying glass": {
        "cost": "3 gold",
        "weight": "Tiny",
        "bonus": 0,
        "type": "Utility",
        "effect": "Can be used as an ingredient for spells"
    },
    "Holy symbol": {
        "cost": "1 silver",
        "weight": "Tiny",
        "bonus": 0,
        "type": "Utility",
        "effect": "Can be used as an ingredient for spells"
    },
    "Crayons": {
        "cost": "2 copper",
        "weight": "Tiny",
        "bonus": 0,
        "type": "Utility",
        "effect": "Can be used by symbolists"
    },
    "Map": {
        "cost": "4 silver",
        "weight": "Tiny",
        "bonus": 0,
        "type": "Utility",
        "effect": "Can be used as an ingredient for spells"
    },
    "Binoculars": {
        "cost": "3 gold",
        "weight": "Normal",
        "bonus": [2, "Scouting"],
        "type": "Utility",
        "effect": "User has +2 item bonus when Scouting at a Long distance"
    },
    "Scrying ball": {
        "cost": "6 silver",
        "weight": "Light",
        "bonus": 0,
        "type": "Utility",
        "effect": "Can be used as an ingredient for spells"
    },
    "Hourglass": {
        "cost": "12 silver",
        "weight": "Light",
        "bonus": 0,
        "type": "Utility",
        "effect": "Can be used as an ingredient for spells"
    },
    "Scale": {
        "cost": "3 silver",
        "weight": "Normal",
        "bonus": 0,
        "type": "Utility",
        "effect": "Can be used as an ingredient for spells"
    },
    "Flute": {
        "cost": "15 copper",
        "weight": "Light",
        "bonus": [1, "Performance"],
        "type": "Utility",
        "effect": "User has +1 item bonus when Performing"
    },
    "Horn": {
        "cost": "3 silver",
        "weight": "Normal",
        "bonus": [1, "Performance"],
        "type": "Utility",
        "effect": "User has +1 item bonus when Performing"
    },
    "Lyre": {
        "cost": "5 silver",
        "weight": "Normal",
        "bonus": [1, "Performance"],
        "type": "Utility",
        "effect": "User has +1 item bonus when Performing"
    },
    "Harp": {
        "cost": "8 silver",
        "weight": "Heavy",
        "bonus": [2, "Performance"],
        "type": "Utility",
        "effect": "User has +2 item bonus when Performing"
    },
    "Drum": {
        "cost": "18 copper",
        "weight": "Normal",
        "bonus": [1, "Performance"],
        "type": "Utility",
        "effect": "User has +1 item bonus when Performing"
    },
    "Killing poison (one dose)": {
        "cost": "5 silver",
        "weight": "Tiny",
        "bonus": 0,
        "type": "Utility",
        "effect": "Poison strength 3. Every increase of Poison strength doubles the cost"
    },
    "Paralyzing poison (one dose)": {
        "cost": "4 silver",
        "weight": "Tiny",
        "bonus": 0,
        "type": "Utility",
        "effect": "Poison strength 3. Every increase of Poison strength doubles the cost"
    },
    "Tranquilizing poison (one dose)": {
        "cost": "5 silver",
        "weight": "Tiny",
        "bonus": 0,
        "type": "Utility",
        "effect": "Poison strength 3. Every increase of Poison strength doubles the cost"
    },
    "Hallucinogenic poison (one dose)": {
        "cost": "5 silver",
        "weight": "Tiny",
        "bonus": 0,
        "type": "Utility",
        "effect": "Poison strength 3. Every increase of Poison strength doubles the cost"
    },
    "Shovel": {
        "cost": "2 silver",
        "weight": "Normal",
        "bonus": 0,
        "type": "Tool",
        "effect": "None"
    },
    "Saw": {
        "cost": "5 silver",
        "weight": "Normal",
        "bonus": 0,
        "type": "Tool",
        "effect": "None"
    },
    "Wood axe": {
        "cost": "2 silver",
        "weight": "Normal",
        "bonus": 0,
        "type": "Tool",
        "effect": "None"
    },
    "Tongs": {
        "cost": "2 silver",
        "weight": "Light",
        "bonus": 0,
        "type": "Tool",
        "effect": "None"
    },
    "Needle and thread": {
        "cost": "3 copper",
        "weight": "Normal",
        "bonus": 0,
        "type": "Tiny",
        "effect": "None"
    },
    "Hammer": {
        "cost": "1 silver",
        "weight": "Normal",
        "bonus": 0,
        "type": "Tool",
        "effect": "None"
    },
    "Sledgehammer": {
        "cost": "2 copper",
        "weight": "Heavy",
        "bonus": 0,
        "type": "Tool",
        "effect": "None"
    },
    "Chariot, two wheels": {
        "cost": "15 silver",
        "weight": "Too heavy",
        "bonus": 0,
        "type": "Vehicle",
        "effect": "Pulled by one animal - Can carry 2 people and 50 items"
    },
    "Chariot, four wheels": {
        "cost": "3 gold",
        "weight": "Too heavy",
        "bonus": 0,
        "type": "Vehicle",
        "effect": "Pulled by two animals - Can carry four people and 200 items"
    },
    "Canoe": {
        "cost": "6 silver",
        "weight": "Heavy",
        "bonus": 0,
        "type": "Vehicle",
        "effect": "Can carry two people and 10 items"
    },
    "Rowboat": {
        "cost": "15 silver",
        "weight": "Too heavy",
        "bonus": 0,
        "type": "Vehicle",
        "effect": "Can carry four people and 50 items"
    },
    "Sailboat": {
        "cost": "4 gold",
        "weight": "Too heavy",
        "bonus": 0,
        "type": "Vehicle",
        "effect": "Can carry six people and 200 items"
    },
    "Rags": {
        "cost": "5 copper",
        "weight": "Worn",
        "bonus": [-2, "Manipulation"],
        "type": "Clothing",
        "effect": "Wearer has -2 in Manipulation attempts"
    },
    "Normal clothes": {
        "cost": "15 copper",
        "weight": "Worn",
        "bonus": 0,
        "type": "Clothing",
        "effect": "None"
    },
    "Noble clothes": {
        "cost": "4 gold",
        "weight": "Worn",
        "bonus": [2, "Manipulation"],
        "type": "Clothing",
        "effect": "Wearer has +2 item bonus in Manipulation attempts"
    },
    "Fur": {
        "cost": "3 silver",
        "weight": "Worn",
        "bonus": [2, "Cold"],
        "type": "Clothing",
        "effect": "Wearer has +2 item bonus against cold"
    },
    "Smock": {
        "cost": "1 silver",
        "weight": "Worn",
        "bonus": 0,
        "type": "Clothing",
        "effect": "Can carry four people and 50 items"
    },
    "Mantle": {
        "cost": "2 silver",
        "weight": "Worn",
        "bonus": 0,
        "type": "Clothing",
        "effect": "Can carry four people and 50 items"
    },
    "Boots": {
        "cost": "3 silver",
        "weight": "Worn",
        "bonus": [1, "Wander"],
        "type": "Clothing",
        "effect": "Wearer has +1 item bonus to Wander"
    },
    "Silver buckle": {
        "cost": "8 silver",
        "weight": "Worn",
        "bonus": [1, "Manipulation"],
        "type": "Clothing",
        "effect": "Wearer has +1 item bonus in Manipulation attempts"
    }
}

const weapons = {
    "Unarmed": {
        "Grip": "-",
        "Bonus": "-",
        "Damage": 1,
        "Range": "Arm",
        "Cost": 0,
        "Features": ["Blunt"]
    }, 
    "Knife": {
        "Grip": 1,
        "Bonus": 1,
        "Damage": 1,
        "Range": "Arm",
        "Cost": 1,
        "Features": ["Light", "Pointed"]
    }, 
    "Dagger": {
        "Grip": 1,
        "Bonus": 1,
        "Damage": 1,
        "Range": "Arm",
        "Cost": 2,
        "Features": ["Light", "Edged", "Pointed"]
    }, 
    "Falchion": {
        "Grip": 1,
        "Bonus": 1,
        "Damage": 2,
        "Range": "Arm",
        "Cost": 4,
        "Features": ["Edged", "Pointed"]
    }, 
    "Shortsword": {
        "Grip": 1,
        "Bonus": 2,
        "Damage": 1,
        "Range": "Arm",
        "Cost": 6,
        "Features": ["Edged", "Pointed", "Parrying"]
    }, 
    "Broadsword": {
        "Grip": 1,
        "Bonus": 2,
        "Damage": 2,
        "Range": "Arm",
        "Cost": 10,
        "Features": ["Edged", "Pointed", "Parrying"]
    }, 
    "Longsword": {
        "Grip": 1,
        "Bonus": 2,
        "Damage": 2,
        "Range": "Arm",
        "Cost": 18,
        "Features": ["Heavy", "Edged", "Pointed", "Parrying"]
    }, 
    "Two-Handed sword": {
        "Grip": 2,
        "Bonus": 2,
        "Damage": 3,
        "Range": "Arm",
        "Cost": 40,
        "Features": ["Heavy", "Edged", "Pointed", "Parrying"]
    }, 
    "Scimitar": {
        "Grip": 1,
        "Bonus": 1,
        "Damage": 2,
        "Range": "Arm",
        "Cost": 8,
        "Features": ["Edged", "Pointed", "Hook", "Parrying"]
    }, 
    "Handaxe": {
        "Grip": 1,
        "Bonus": 2,
        "Damage": 2,
        "Range": "Arm",
        "Cost": 2,
        "Features": ["Edged", "Hook"]
    }, 
    "Battleaxe": {
        "Grip": 1,
        "Bonus": 2,
        "Damage": 2,
        "Range": "Arm",
        "Cost": 6,
        "Features": ["Heavy", "Edged", "Hook"]
    },
    "Two-Handed Axe": {
        "Grip": 2,
        "Bonus": 2,
        "Damage": 3,
        "Range": "Arm",
        "Cost": 18,
        "Features": ["Heavy", "Edged", "Hook"]
    },  
    "Mace": {
        "Grip": 1,
        "Bonus": 2,
        "Damage": 1,
        "Range": "Arm",
        "Cost": 4,
        "Features": ["Blunt"]
    }, 
    "Morningstar": {
        "Grip": 1,
        "Bonus": 2,
        "Damage": 2,
        "Range": "Arm",
        "Cost": 8,
        "Features": ["Blunt"]
    }, 
    "Warhammer": {
        "Grip": 1,
        "Bonus": 2,
        "Damage": 2,
        "Range": "Arm",
        "Cost": 12,
        "Features": ["Blunt", "Hook"]
    }, 
    "Flail": {
        "Grip": 1,
        "Bonus": 1,
        "Damage": 2,
        "Range": "Near",
        "Cost": 16,
        "Features": ["Blunt"]
    }, 
    "Wooden Club": {
        "Grip": 1,
        "Bonus": 1,
        "Damage": 1,
        "Range": "Arm",
        "Cost": 1,
        "Features": ["Blunt"]
    }, 
    "Large Wooden Club": {
        "Grip": 2,
        "Bonus": 1,
        "Damage": 2,
        "Range": "Arm",
        "Cost": 2,
        "Features": ["Blunt"]
    }, 
    "Heavy Warhammer": {
        "Grip": 2,
        "Bonus": 2,
        "Damage": 3,
        "Range": "Arm",
        "Cost": 22,
        "Features": ["Heavy", "Blunt", "Hook"]
    }, 
    "Staff": {
        "Grip": 2,
        "Bonus": 1,
        "Damage": 1,
        "Range": "Near",
        "Cost": 1,
        "Features": ["Blunt", "Hook", "Parrying"]
    }, 
    "Short Spear": {
        "Grip": 1,
        "Bonus": 1,
        "Damage": 2,
        "Range": "Near",
        "Cost": 2,
        "Features": ["Pointed"]
    }, 
    "Long Spear": {
        "Grip": 2,
        "Bonus": 2,
        "Damage": 1,
        "Range": "Near",
        "Cost": 4,
        "Features": ["Pointed"]
    }, 
    "Pike": {
        "Grip": 2,
        "Bonus": 2,
        "Damage": 2,
        "Range": "Near",
        "Cost": 12,
        "Features": ["Heavy", "Pointed"]
    }, 
    "Halberd": {
        "Grip": 2,
        "Bonus": 2,
        "Damage": 2,
        "Range": "Near",
        "Cost": 30,
        "Features": ["Heavy", "Edged", "Pointed", "Hook"]
    }, 
    "Trident": {
        "Grip": 2,
        "Bonus": 1,
        "Damage": 2,
        "Range": "Near",
        "Cost": 6,
        "Features": ["Pointed", "Hook"]
    }, 
    "Rock": {
        "Grip": 1,
        "Bonus": 0,
        "Damage": 1,
        "Range": "Short",
        "Cost": 0,
        "Features": ["Light"]
    }, 
    "Throwing Knife": {
        "Grip": 1,
        "Bonus": 1,
        "Damage": 1,
        "Range": "Short",
        "Cost": 1,
        "Features": ["Light"]
    }, 
    "Throwing Axe": {
        "Grip": 1,
        "Bonus": 1,
        "Damage": 2,
        "Range": "Short",
        "Cost": 2,
        "Features": []
    }, 
    "Throwing Spear": {
        "Grip": 1,
        "Bonus": 2,
        "Damage": 1,
        "Range": "Short",
        "Cost": 3,
        "Features": []
    }, 
    "Sling": {
        "Grip": 1,
        "Bonus": 1,
        "Damage": 1,
        "Range": "Short",
        "Cost": 1,
        "Features": ["Light"]
    }, 
    "Short Bow": {
        "Grip": 2,
        "Bonus": 2,
        "Damage": 1,
        "Range": "Short",
        "Cost": 6,
        "Features": ["Light"]
    }, 
    "Longbow": {
        "Grip": 2,
        "Bonus": 2,
        "Damage": 1,
        "Range": "Long",
        "Cost": 12,
        "Features": ["Light"]
    }, 
    "Light Crossbow": {
        "Grip": 2,
        "Bonus": 1,
        "Damage": 2,
        "Range": "Long",
        "Cost": 24,
        "Features": ["Loading is a slow action"]
    }, 
    "Heavy Crossbow": {
        "Grip": 2,
        "Bonus": 1,
        "Damage": 3,
        "Range": "Long",
        "Cost": 40,
        "Features": ["Heavy", "Loading is a slow action"]
    },
    "Small Shield": {
        "Grip": 1,
        "Bonus": 1,
        "Damage": 0,
        "Range": "Arm",
        "Cost": 6,
        "Features": ["Light"]
    }, 
    "Large Shield": {
        "Grip": 1,
        "Bonus": 2,
        "Damage": 0,
        "Range": "Arm",
        "Cost": 15,
        "Features": []
    }
}

const armors = {
    "Leather": {
        "Armor Rating": 2,
        "Cost": 3,
        "Body Part": "Body",
        "Features": ["Light"]
    }, 
    "Studded Leather": {
        "Armor Rating": 3,
        "Cost": 5,
        "Body Part": "Body",
        "Features": []
    },
    "Chainmail": {
        "Armor Rating": 6,
        "Cost": 24,
        "Body Part": "Body",
        "Features": ["Heavy item", "Armor Rating 3 against arrows", "Armor Rating 3 against Stabs"]
    },
    "Plate Armor": {
        "Armor Rating": 8,
        "Cost": 80,
        "Body Part": "Body",
        "Features": ["Heavy item", "Modifies Move by -2"]
    }, 
    "Studded Leather Cap": {
        "Armor Rating": 1,
        "Cost": 2,
        "Body Part": "Head",
        "Features": ["Light"]
    }, 
    "Open Helmet": {
        "Armor Rating": 2,
        "Cost": 8,
        "Body Part": "Head",
        "Features": ["Light"]
    }, 
    "Closed Helmet": {
        "Armor Rating": 3,
        "Cost": 18,
        "Body Part": "Head",
        "Features": []
    }, 
    "Great Helm": {
        "Armor Rating": 4,
        "Cost": 30,
        "Body Part": "Head",
        "Features": ["Modifies Scout by -2"]
    }
}

const critDamage = {
    "Slash wounds": [
        {
            "Injury": "Bleeding forehead",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "None",
            "Healing time": "-"
        }, 
        {
            "Injury": "Bleeding forehead",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "None",
            "Healing time": "-"
        }, {
            "Injury": "Severed nose",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-1 to MANIPULATE",
            "Healing time": "D6"
        }, {
            "Injury": "Severed nose",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-1 to MANIPULATE",
            "Healing time": "D6" 
        }, {
            "Injury": "Severed finger",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "Two-handed weapons cannot be used",
            "Healing time": "D6" 
        }, {
            "Injury": "Severed finger",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "Two-handed weapons cannot be used",
            "Healing time": "D6" 
        }, {
            "Injury": "Severed toe",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "2D6" 
        }, {
            "Injury": "Severed toe",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "2D6" 
        }, {
            "Injury": "Bleeding thigh",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "2D6" 
        }, {
            "Injury": "Bleeding thigh",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "D6" 
        }, {
            "Injury": "Slashed mouth",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-2 to MANIPULATE",
            "Healing time": "D6" 
        }, {
            "Injury": "Slashed mouth",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-2 to MANIPULATE",
            "Healing time": "D6" 
        }, {
            "Injury": "Severed tendon",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "2D6" 
        }, {
            "Injury": "Severed tendon",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "2D6" 
        }, {
            "Injury": "Wounded shoulder",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "Two-handed weapons cannot be used",
            "Healing time": "2D6" 
        }, {
            "Injury": "Wounded shoulder",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "Two-handed weapons cannot be used",
            "Healing time": "2D6" 
        }, {
            "Injury": "Severed ear",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-1 to SCOUTING",
            "Healing time": "D6" 
        }, {
            "Injury": "Severed ear",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-1 to SCOUTING",
            "Healing time": "D6" 
        }, {
            "Injury": "Slashed eye",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-2 to MARKSMANSHIP and SCOUTING",
            "Healing time": "2D6" 
        }, {
            "Injury": "Slashed eye",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-2 to MARKSMANSHIP and SCOUTING",
            "Healing time": "2D6" 
        }, {
            "Injury": "Punctured lung",
            "Deadly": "Yes",
            "Time limit": "D6 days",
            "Effect": "-2 to ENDURANCE and MOVE",
            "Healing time": "D6" 
        }, {
            "Injury": "Punctured lung",
            "Deadly": "Yes",
            "Time limit": "D6 days",
            "Effect": "-2 to ENDURANCE and MOVE",
            "Healing time": "D6" 
        }, {
            "Injury": "Severed foot",
            "Deadly": "Yes",
            "Time limit": "D6 days",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "Permanent" 
        }, {
            "Injury": "Severed foot",
            "Deadly": "Yes",
            "Time limit": "D6 days",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "Permanent" 
        }, {
            "Injury": "Severed foot",
            "Deadly": "Yes",
            "Time limit": "D6 days",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "Permanent" 
        }, {
            "Injury": "Bleeding gut",
            "Deadly": "Yes",
            "Time limit": "D6 hours",
            "Effect": "1 point of damage at each roll for MIGHT, MOVE and MELEE",
            "Healing time": "D6" 
        }, {
            "Injury": "Bleeding gut",
            "Deadly": "Yes",
            "Time limit": "D6 hours",
            "Effect": "1 point of damage at each roll for MIGHT, MOVE and MELEE",
            "Healing time": "D6" 
        }, {
            "Injury": "Ruptured intestines",
            "Deadly": "Yes",
            "Time limit": "D6 hours",
            "Effect": "Disease with Virulence 6",
            "Healing time": "2D6" 
        }, {
            "Injury": "Ruptured intestines",
            "Deadly": "Yes",
            "Time limit": "D6 hours",
            "Effect": "Disease with Virulence 6",
            "Healing time": "2D6" 
        }, {
            "Injury": "Severed arm",
            "Deadly": "Yes, -1",
            "Time limit": "D6 hours",
            "Effect": "Two-handed weapons cannot be used",
            "Healing time": "Permanent" 
        }, {
            "Injury": "Severed arm",
            "Deadly": "Yes, -1",
            "Time limit": "D6 hours",
            "Effect": "Two-handed weapons cannot be used",
            "Healing time": "Permanent" 
        }, {
            "Injury": "Severed leg",
            "Deadly": "Yes, -1",
            "Time limit": "D6 hours",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "Permanent" 
        }, {
            "Injury": "Severed leg",
            "Deadly": "Yes, -1",
            "Time limit": "D6 hours",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "Permanent" 
        }, {
            "Injury": "Slit throat",
            "Deadly": "Yes, -1",
            "Time limit": "D6 turns",
            "Effect": "-2 to ENDURANCE",
            "Healing time": "D6" 
        }, {
            "Injury": "Slit throat",
            "Deadly": "Yes, -1",
            "Time limit": "D6 turns",
            "Effect": "-2 to ENDURANCE",
            "Healing time": "D6" 
        }, {
            "Injury": "Cleft skull",
            "Deadly": "Yes",
            "Time limit": "-",
            "Effect": "You die immediately",
            "Healing time": "-" 
        }, {
            "Injury": "Decapitation",
            "Deadly": "Yes",
            "Time limit": "-",
            "Effect": "Your head leaves your body",
            "Healing time": "-" 
        }
    ],
    "Stab wounds": [
        {
            "Injury": "Pierced ear",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "None",
            "Healing time": "-"
        }, 
        {
            "Injury": "Pierced ear",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "None",
            "Healing time": "-"
        }, {
            "Injury": "Pierced ear",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "None",
            "Healing time": "-"
        }, {
            "Injury": "Skewered foot",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "D6"
        }, {
            "Injury": "Skewered foot",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "D6"
        }, {
            "Injury": "Skewered foot",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "D6"
        }, {
            "Injury": "Hand run through",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "Two-handed weapons cannot be used",
            "Healing time": "D6" 
        }, {
            "Injury": "Hand run through",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "Two-handed weapons cannot be used",
            "Healing time": "D6" 
        }, {
            "Injury": "Hand run through",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "Two-handed weapons cannot be used",
            "Healing time": "D6" 
        }, {
            "Injury": "Pierced cheek",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-1 to MANIPULATE",
            "Healing time": "D6" 
        }, {
            "Injury": "Pierced cheek",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-1 to MANIPULATE",
            "Healing time": "D6" 
        }, {
            "Injury": "Pierced cheek",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-1 to MANIPULATE",
            "Healing time": "D6"  
        }, {
            "Injury": "Impaled thigh",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "2D6" 
        }, {
            "Injury": "Impaled thigh",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "2D6"  
        }, {
            "Injury": "Impaled thigh",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "2D6"  
        }, {
            "Injury": "Severed tendon",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "3D6" 
        }, {
            "Injury": "Impaled shoulder",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "Two-handed weapons cannot be used",
            "Healing time": "2D6" 
        }, {
            "Injury": "Impaled shoulder",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "Two-handed weapons cannot be used",
            "Healing time": "2D6" 
        }, {
            "Injury": "Impaled shoulder",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "Two-handed weapons cannot be used",
            "Healing time": "2D6" 
        }, {
            "Injury": "Pierced eye",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-2 to MARKSMANSHIP and SCOUTING",
            "Healing time": "2D6" 
        }, {
            "Injury": "Pierced eye",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-2 to MARKSMANSHIP and SCOUTING",
            "Healing time": "2D6" 
        }, {
            "Injury": "Skewered groin",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "1 point of damage suffered at every MOVE or MELEE roll",
            "Healing time": "2D6" 
        }, {
            "Injury": "Skewered groin",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "1 point of damage suffered at every MOVE or MELEE roll",
            "Healing time": "2D6"
        }, {
            "Injury": "Punctured lung",
            "Deadly": "Yes",
            "Time limit": "D6 days",
            "Effect": "-2 to ENDURANCE and MOVE",
            "Healing time": "D6" 
        }, {
            "Injury": "Punctured lung",
            "Deadly": "Yes",
            "Time limit": "D6 days",
            "Effect": "-2 to ENDURANCE and MOVE",
            "Healing time": "D6"  
        }, {
            "Injury": "Bleeding gut",
            "Deadly": "Yes",
            "Time limit": "D6 hours",
            "Effect": "1 point of damage at each roll for MIGHT, MOVE and MELEE",
            "Healing time": "D6" 
        }, {
            "Injury": "Bleeding gut",
            "Deadly": "Yes",
            "Time limit": "D6 hours",
            "Effect": "1 point of damage at each roll for MIGHT, MOVE and MELEE",
            "Healing time": "D6" 
        }, {
            "Injury": "Bleeding gut",
            "Deadly": "Yes",
            "Time limit": "D6 hours",
            "Effect": "1 point of damage at each roll for MIGHT, MOVE and MELEE",
            "Healing time": "D6" 
        }, {
            "Injury": "Ruptured intestines",
            "Deadly": "Yes",
            "Time limit": "D6 hours",
            "Effect": "Disease with Virulence 6",
            "Healing time": "2D6" 
        }, {
            "Injury": "Ruptured intestines",
            "Deadly": "Yes",
            "Time limit": "D6 hours",
            "Effect": "Disease with Virulence 6",
            "Healing time": "2D6" 
        }, {
            "Injury": "Severed arm artery",
            "Deadly": "Yes, -1",
            "Time limit": "D6 minutes",
            "Effect": "Two-handed weapons cannot be used",
            "Healing time": "D6" 
        }, {
            "Injury": "Severed leg artery",
            "Deadly": "Yes, -1",
            "Time limit": "D6 minutes",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "D6" 
        }, {
            "Injury": "Impaled neck",
            "Deadly": "Yes, -1",
            "Time limit": "D6 turns",
            "Effect": "-2 to ENDURANCE",
            "Healing time": "2D6" 
        }, {
            "Injury": "Skewered skull",
            "Deadly": "Yes",
            "Time limit": "-",
            "Effect": "You die immediately",
            "Healing time": "-" 
        }, {
            "Injury": "Pierced heart",
            "Deadly": "Yes",
            "Time limit": "-",
            "Effect": "Your heart beats for the last time",
            "Healing time": "-" 
        }, {
            "Injury": "Pierced heart",
            "Deadly": "Yes",
            "Time limit": "-",
            "Effect": "Your heart beats for the last time",
            "Healing time": "-" 
        }
    ],
    "Blunt force": 
    [   
        {
            "Injury": "Stunned",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "None",
            "Healing time": "-"
        }, 
        {
            "Injury": "Stunned",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "None",
            "Healing time": "-"
        }, {
            "Injury": "Breathless",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "None",
            "Healing time": "-"
        }, {
            "Injury": "Breathless",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "None",
            "Healing time": "-" 
        }, {
            "Injury": "Concussion",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-2 to SCOUTING",
            "Healing time": "D6" 
        }, {
            "Injury": "Concussion",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-2 to SCOUTING",
            "Healing time": "D6" 
        }, {
            "Injury": "Broken nose",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-1 to MANIPULATE",
            "Healing time": "D6" 
        }, {
            "Injury": "Broken nose",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-1 to MANIPULATE",
            "Healing time": "D6" 
        }, {
            "Injury": "Broken fingers",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "Two-handed weapons can’t be used",
            "Healing time": "D6" 
        }, {
            "Injury": "Broken fingers",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "Two-handed weapons can’t be used",
            "Healing time": "D6" 
        }, {
            "Injury": "Broken toes",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "D6" 
        }, {
            "Injury": "Broken toes",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "D6"
        }, {
            "Injury": "Broken toes",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "D6"
        }, {
            "Injury": "Knocked out teeth",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-1 to MANIPULATE",
            "Healing time": "D6" 
        }, {
            "Injury": "Knocked out teeth",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-1 to MANIPULATE",
            "Healing time": "D6" 
        }, {
            "Injury": "Knocked out teeth",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-1 to MANIPULATE",
            "Healing time": "D6" 
        }, {
            "Injury": "Groin hit",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "1 point of damage suffered at every MOVE or MELEE roll",
            "Healing time": "D6" 
        }, {
            "Injury": "Groin hit",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "1 point of damage suffered at every MOVE or MELEE roll",
            "Healing time": "D6"  
        }, {
            "Injury": "Groin hit",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "1 point of damage suffered at every MOVE or MELEE roll",
            "Healing time": "D6" 
        }, {
            "Injury": "Broken ribs",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-2 to MOVE and MELEE",
            "Healing time": "2D6"
        }, {
            "Injury": "Broken ribs",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-2 to MOVE and MELEE",
            "Healing time": "2D6"
        }, {
            "Injury": "Broken ribs",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-2 to MOVE and MELEE",
            "Healing time": "2D6" 
        }, {
            "Injury": "Broken arm",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "Two-handed weapons can't be used",
            "Healing time": "2D6" 
        }, {
            "Injury": "Broken arm",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "Two-handed weapons can't be used",
            "Healing time": "2D6"  
        }, {
            "Injury": "Broken leg",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "2D6" 
        }, {
            "Injury": "Broken leg",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "2D6"
        }, {
            "Injury": "Gouged eye",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-2 to MARKSMANSHIP and SCOUTING",
            "Healing time": "2D6" 
        }, {
            "Injury": "Gouged eye",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "-2 to MARKSMANSHIP and SCOUTING",
            "Healing time": "2D6" 
        }, {
            "Injury": "Crushed foot",
            "Deadly": "Yes",
            "Time limit": "D6 days",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "3D6"
        }, {
            "Injury": "Crushed foot",
            "Deadly": "Yes",
            "Time limit": "D6 days",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "3D6"
        }, {
            "Injury": "Crushed elbow",
            "Deadly": "Yes",
            "Time limit": "D6 days",
            "Effect": "Two-handed weapons cannot be used",
            "Healing time": "Permanent" 
        }, {
            "Injury": "Crushed elbow",
            "Deadly": "Yes",
            "Time limit": "D6 days",
            "Effect": "Two-handed weapons cannot be used",
            "Healing time": "Permanent" 
        }, {
            "Injury": "Crushed knee",
            "Deadly": "Yes",
            "Time limit": "D6 days",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "Permanent" 
        }, {
            "Injury": "Crushed knee",
            "Deadly": "Yes",
            "Time limit": "D6 days",
            "Effect": "To RUN becomes a slow action",
            "Healing time": "Permanent" 
        }, {
            "Injury": "Broken neck",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "Paralyzed from the neck down. If not HEALED in time, the effect is permanent",
            "Healing time": "3D6" 
        }, {
            "Injury": "Crushed skull",
            "Deadly": "Yes",
            "Time limit": "-",
            "Effect": "Your adventure and your life end here",
            "Healing time": "-" 
        }, {
            "Injury": "Crushed skull",
            "Deadly": "Yes",
            "Time limit": "-",
            "Effect": "Your adventure and your life end here",
            "Healing time": "-" 
        }
    ],
    "Horror": 
    [
        {
            "Injury": "Trembling",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Penalty -1 to all rolls for Agility",
            "Healing time": "D6"
        }, 
        {
            "Injury": "Trembling",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Penalty -1 to all rolls for Agility",
            "Healing time": "D6"
        }, {
            "Injury": "Trembling",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Penalty -1 to all rolls for Agility",
            "Healing time": "D6"
        }, {
            "Injury": "Trembling",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Penalty -1 to all rolls for Agility",
            "Healing time": "D6"
        }, {
            "Injury": "Trembling",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Penalty -1 to all rolls for Agility",
            "Healing time": "D6"
        }, {
            "Injury": "Trembling",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Penalty -1 to all rolls for Agility",
            "Healing time": "D6"
        }, {
            "Injury": "White hair",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "None",
            "Healing time": "Permanent"
        }, {
            "Injury": "Anxious",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Penalty -1 to all rolls for Wits",
            "Healing time": "D6"
        }, {
            "Injury": "Anxious",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Penalty -1 to all rolls for Wits",
            "Healing time": "D6"
        }, {
            "Injury": "Anxious",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Penalty -1 to all rolls for Wits",
            "Healing time": "D6"
        }, {
            "Injury": "Sullen",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Penalty -1 to all rolls for Empathy",
            "Healing time": "D6"
        }, {
            "Injury": "Sullen",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Penalty -1 to all rolls for Empathy",
            "Healing time": "D6"
        }, {
            "Injury": "Sullen",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Penalty -1 to all rolls for Empathy",
            "Healing time": "D6"
        }, {
            "Injury": "Nightmares",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Make an INSIGHT roll every Quarter Day spent SLEEPING. Failure means that the SLEEP doesn't count.",
            "Healing time": "D6"
        }, {
            "Injury": "Nightmares",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Make an INSIGHT roll every Quarter Day spent SLEEPING. Failure means that the SLEEP doesn't count.",
            "Healing time": "D6"
        }, {
            "Injury": "Nightmares",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Make an INSIGHT roll every Quarter Day spent SLEEPING. Failure means that the SLEEP doesn't count.",
            "Healing time": "D6"
        }, {
            "Injury": "Nocturnal",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "You can only SLEEP during the light part of the day.",
            "Healing time": "2D6" 
        }, {
            "Injury": "Nocturnal",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "You can only SLEEP during the light part of the day.",
            "Healing time": "2D6" 
        }, {
            "Injury": "Phobic",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "You are terrified by something related to what Broke you. The GM decides what it is. You suffer 1 point of damage to Wits each round within NEAR range of the object of your phobia.",
            "Healing time": "2D6" 
        }, {
            "Injury": "Phobic",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "You are terrified by something related to what Broke you. The GM decides what it is. You suffer 1 point of damage to Wits each round within NEAR range of the object of your phobia.",
            "Healing time": "2D6" 
        }, {
            "Injury": "Drunkard",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "You must drink wine or mead every day, or suffer 1 point of damage to Agility.",
            "Healing time": "3D6" 
        }, {
            "Injury": "Drunkard",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "You must drink wine or mead every day, or suffer 1 point of damage to Agility.",
            "Healing time": "3D6" 
        }, {
            "Injury": "Claustrophobic",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Every turn (15 minutes) in a confined environment, you suffer 1 point of damage to Wits.",
            "Healing time": "2D6" 
        }, {
            "Injury": "Claustrophobic",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Every turn (15 minutes) in a confined environment, you suffer 1 point of damage to Wits.",
            "Healing time": "2D6"  
        }, {
            "Injury": "Mythomania",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "You cannot stop yourself from lying. About everything. The effect should be roleplayed.",
            "Healing time": "2D6" 
        }, {
            "Injury": "Paranoia",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "You are certain that someone is out to get you. The effect should be roleplayed.",
            "Healing time": "2D6"
        }, {
            "Injury": "Paranoia",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "You are certain that someone is out to get you. The effect should be roleplayed.",
            "Healing time": "2D6"
        }, {
            "Injury": "Delusion",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "You are totally convinced of something that is totally untrue, for example that a certain kin doesn't exist",
            "Healing time": "3D6" 
        }, {
            "Injury": "Hallucinations",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Make an INSIGHT roll every Quarter Day. If you fail, you suffer a powerful hallucination. The GM determines the details.",
            "Healing time": "3D6"
        }, {
            "Injury": "Altered personality",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Your personality is altered in a fundamental way. Determine how together with the GM. The effect should be roleplayed.",
            "Healing time": "Permanent"
        }, {
            "Injury": "Altered personality",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "Your personality is altered in a fundamental way. Determine how together with the GM. The effect should be roleplayed.",
            "Healing time": "Permanent" 
        }, {
            "Injury": "Amnesia",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "You lose all memory, and cannot recollect who you or the other adventurers are. The effect should be roleplayed",
            "Healing time": "D6" 
        }, {
            "Injury": "Catatonic",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "You stare blankly into oblivion, and do not respond to any stimuli",
            "Healing time": "D6" 
        }, {
            "Injury": "Catatonic",
            "Deadly": "-",
            "Time limit": "-",
            "Effect": "You stare blankly into oblivion, and do not respond to any stimuli",
            "Healing time": "D6" 
        }, {
            "Injury": "Heart attack",
            "Deadly": "Yes",
            "Time limit": "-",
            "Effect": "Your heart stops, and you die of pure fright",
            "Healing time": "-" 
        }
    ],
    "Others": 
    [
        {
            "Injury": "Non-typical damage",
            "Deadly": "Yes",
            "Time limit": "D6 days",
            "Effect": "You remain unconscious until you die or are HEALED",
            "Healing time": "-" 
        }, {
            "Injury": "Pushed damage",
            "Deadly": "No",
            "Time limit": "-",
            "Effect": "None",
            "Healing time": "-" 
        }
    ]
}

// Create character object to save information to
class char {
    constructor() {
        this.name = document.getElementById("charName").value;
        this.profession = document.getElementById("prof").value;

        cry = function() {
            console.log("My name is " + this.name + ", and I am a " + this.profession + "!");
        }
    }
}



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
function getData(json) {
    let obj = {};

    fetch(json)
        .then(response => response.json())
        .then(data => obj = data)
        
    return obj
}

// Main function to start generating the webpage and set initial values
function init() {
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
