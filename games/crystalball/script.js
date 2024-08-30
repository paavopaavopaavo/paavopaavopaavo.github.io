const responses = [
    // Positive (30)
    "It is certain",
    "Without a doubt",
    "You may rely on it",
    "Yes, definitely",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Absolutely",
    "The stars are aligned",
    "Prospects are good",
    "You are destined for success",
    "The future is bright",
    "Everything points to yes",
    "Positive vibes surround you",
    "The answer is a resounding yes",
    "You will achieve your goals",
    "You are on the right path",
    "Your efforts will be rewarded",
    "Expect great things",
    "Your hard work will pay off",
    "Luck is on your side",
    "Good fortune awaits",
    "You are favored",
    "Victory is certain",
    "Happiness is in your future",
    "Success is inevitable",
    "Positive outcomes are assured",
    "You will find what you seek",
  
    // Negative (30)
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't bet on it",
    "Chances aren't good",
    "Things are not looking up",
    "I wouldn't get my hopes up",
    "Unlikely",
    "The answer is no",
    "Prospects are bleak",
    "Doubtful",
    "Don't hold your breath",
    "I see difficulties ahead",
    "You may face obstacles",
    "Negative outcomes are likely",
    "Misfortune may come",
    "Not in your favor",
    "Your chances are slim",
    "It doesn't look good",
    "The signs are not good",
    "The outlook is grim",
    "You should reconsider",
    "Be cautious",
    "The answer is probably not",
    "Prepare for disappointment",
  
    // Vague (40)
    "Ask again later",
    "Cannot say now",
    "Reply hazy, try again",
    "Better not tell you now",
    "Concentrate and ask again",
    "The answer is unclear",
    "It's a mystery",
    "Indications are unclear",
    "Focus and ask once more",
    "The future is uncertain",
    "Seek clarity before asking",
    "The answer is within you",
    "Fate is undecided",
    "Only time will tell",
    "The outcome is uncertain",
    "Look within for the answer",
    "Future events are cloudy",
    "The universe is undecided",
    "Signs are not clear",
    "Destiny is not yet written",
    "Wait and see",
    "The answer lies in the stars",
    "It's too soon to know",
    "The fog will clear soon",
    "Uncertain, try again",
    "Possibilities are wide open",
    "It's a toss-up",
    "The answer could go either way",
    "Outlook is murky",
    "Proceed with caution",
    "Time will reveal the answer",
    "The answer eludes me",
    "Cannot determine now",
    "The mists obscure the future",
    "The path is shrouded",
    "Unclear, ask later",
    "It could go either way",
    "The future is not fixed",
    "Patience will reveal all",
    "The answer lies in the future",

    "lmao",
    "LOL",
    "haha",
    "..wtf?"
];

function getInputText(inputText) {
    // Get the input value
    // var inputText = document.getElementById("question-input").value;
    // Set the input value to the paragraph
    document.getElementById("crystalball-answer").innerText = inputText;
}

function askQuestion() {
    // Input to answer
    // getInputText(document.getElementById("question-input").value);
    
    // Clear question field
    //document.getElementById('question-input').value = "";
    
    getRandomItem();
}

function getRandomItem() {
    // Get a random index
    var randomIndex = Math.floor(Math.random() * responses.length);
    // Get the random item from the array
    getInputText(responses[randomIndex])
}


function share() {
    let questioninput = document.getElementById("question-input").value;
    let crystalballanswer = document.getElementById("crystalball-answer").innerText;
    let sharetext = `💬: ${questioninput}\n🔮: ${crystalballanswer}`;
    if (navigator.share) {
        navigator.share({
            text: sharetext,
            url: 'https://paavopaavopaavo.github.io/games/crystalball/',
        })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
    }
}

function clickPress(event) {
    if (event.key == "Enter") {
        askQuestion();
    }
}

window.askQuestion = askQuestion;
window.share = share;
window.clickPress = clickPress;