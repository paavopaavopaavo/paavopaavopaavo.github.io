var ingredients = [];
var ingredientsNamed = []; 
let recentIngredient = '';
let potionResult = '';

function addIngredient(icon, name, id) {
    document.getElementById('potion-recipe').style.display = 'none';
    
    // Disable the selected ingredient
    const ingredientElement = document.getElementById(id);
    ingredientElement.classList.add("disabled");

    // Add the ingredient to the arrays
    ingredients.push(id);
    ingredientsNamed.push(name);

    // Display the ingredient in the cauldron
    document.getElementById("cauldron").innerHTML += `<span class="ingredient-active">${icon}</span>`;

    // Check if three ingredients have been added
    if (ingredients.length === 3) {
        const cauldron = document.getElementById("cauldron");
        cauldron.classList.add("cauldron-bubble");
        
        // Delay potion creation to show bubbling effect
        setTimeout(function() {
            makePotion([...ingredients]); // Use spread operator to pass a copy
        }, 2000);
    }
}


function makePotion(selectedIngredients) {
    // Sort the ingredients in numerical order
    selectedIngredients.sort();

    const potionKey = selectedIngredients.join("");
    const potionEffect = potionVariants[potionKey];

    if (potionEffect) {
        potionResult = "Potion of " + potionEffect;
        document.getElementById("potion-effect").innerHTML = potionResult;
        updatePotionRecipe();
    } else {
        document.getElementById("potion-effect").innerHTML = "Faulty Potion!";
    }

    // Clear the ingredients array and reset the UI
    ingredients.length = 0;
    ingredientsNamed.length = 0;

    // Enable all ingredients by removing the 'disabled' class
    document.querySelectorAll(".ingredient").forEach(function(ingredient) {
        ingredient.classList.remove("disabled");
    });

    // Reset the cauldron UI
    const cauldron = document.getElementById("cauldron");
    cauldron.innerHTML = "";
    cauldron.classList.remove("cauldron-bubble");

    const cauldronColors = ["red", "purple", "green", "cyan", "purple"];
    var randomColor = cauldronColors[Math.floor(Math.random() * cauldronColors.length)];
    cauldron.style.backgroundImage = "url('./cauldrons/" + randomColor + ".png')";
}


function updatePotionRecipe() {
    // Clear previous recipe list
    document.getElementById("potion-recipe-list").innerHTML = "";
    const potionName = document.getElementById('potion-name');
    const potionRecipeList = document.getElementById('potion-recipe-list');
    potionName.innerText = potionResult;

    // Show the potion recipe element
    document.getElementById('potion-recipe').style.display = 'block';

    // Add list items to the potion recipe list according to the ingredientsNamed array
    for (let i = 0; i < ingredientsNamed.length; i++) {
        const listItem = document.createElement('li');
        listItem.innerText = ingredientsNamed[i];
        potionRecipeList.appendChild(listItem);
    }
}

function shareRecipe() {
    let text = `Look at my fresh recipe ✨! Potion of ${potionResult}: Made with ${ingredientsNamed.join(', ')}! Make one for yourself at https://paavopaavopaavo.github.io/games/halloween  🎃 🧙‍♂️!`;
    if (navigator.share) {
        navigator.share({
            text: text
        }).then(() => {
            console.log('Thanks for sharing!');
        })
        .catch(console.error);
    } else {
        // Fallback for browsers that don't support the Web Share API
        alert('Web Share API is not supported in this browser. :(');
    }
}

const potionVariants = {
    "012": "Foresight",
    "013": "Invisibility",
    "014": "Levitation",
    "015": "Night Vision",
    "016": "Time Stop",
    "017": "Healing",
    "018": "Strength",
    "023": "Poison Resistance",
    "024": "Fire Resistance",
    "025": "Cold Resistance",
    "026": "Lightning Resistance",
    "027": "Shield",
    "028": "Regeneration",
    "034": "Telekinesis",
    "035": "Teleportation",
    "036": "Mind Control",
    "037": "Charm",
    "038": "Confusion",
    "045": "Haste",
    "046": "Slowness",
    "047": "Weakness",
    "048": "Paralysis",
    "056": "Water Breathing",
    "057": "Flight",
    "058": "Invisibility to Undead",
    "067": "Fireball",
    "068": "Lightning Bolt",
    "078": "Heat Wave",
    "123": "Resurrection",
    "124": "Immortality",
    "125": "Wishfulness",
    "126": "Wizard's Wrath",
    "127": "Curse",
    "128": "Blessing",
    "134": "Disintegration",
    "135": "Polymorph",
    "136": "Illusion",
    "137": "Amnesia",
    "138": "Hallucination",
    "145": "Vitality",
    "146": "Vulnerability",
    "147": "Invulnerability",
    "148": "Absorption",
    "156": "Water Walking",
    "157": "Water Bending",
    "158": "Ice Bending",
    "167": "Meteor Shower",
    "168": "Thunderstorm",
    "178": "Heat Resistance",
    "234": "Time Reversal",
    "235": "Gravity Shift",
    "236": "Dimensional Shift",
    "237": "Mind Reading",
    "238": "Memory Erase",
    "245": "Energy Absorption",
    "246": "Energy Burst",
    "247": "Force Field",
    "248": "Dreamwalking",
    "256": "Shapeshifting",
    "257": "Size Alteration",
    "258": "Duplication",
    "267": "Fire Control",
    "268": "Storm Control",
    "278": "Lava Control",
    "345": "Spirit Communication",
    "346": "Soul Binding",
    "347": "Necromancy",
    "356": "Plant Growth",
    "357": "Animal Communication",
    "367": "Fire Immunity",
    "368": "Storm Immunity",
    "378": "Heat Vision",
    "456": "Gravity Manipulation",
    "457": "Phasing",
    "458": "Arcane Vision",
    "467": "Astral Projection",
    "468": "Aura of Courage",
    "478": "Magnetism",
    "567": "Ethereal Form",
    "568": "Wind Walk",
    "578": "Sonic Boom",
    "678": "Stone Skin"
};