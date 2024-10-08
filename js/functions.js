const input = document.querySelector('input')
const output = document.querySelector('output')
const span = document.querySelector('span')

const words = [
    "programming",
    "javascript",
    "database",
    "markup",
    "framework",
    "variable",
    "stylesheet",
    "library",
    "asynchronous",
    "hypertext"
]

let randomizedWord =''
let maskedWord = ''
let guesses = 0

const newGame = () => {
    const random = Math.floor(Math.random() * words.length)
    randomizedWord = words[random]
    maskedWord = "*".repeat(randomizedWord.length)
    console.log(randomizedWord)
    output.innerHTML = maskedWord
    guesses = 0
    span.innerHTML = guesses
}

newGame()

const replaceFoundChars = (char) => {
    let newMaskedWord = '';
    for (let i = 0; i < randomizedWord.length; i++) {

        if (randomizedWord[i].toLowerCase() === char.toLowerCase()) {
            newMaskedWord += randomizedWord[i];
        } else {
            newMaskedWord += maskedWord[i];
        }
    }
    maskedWord = newMaskedWord;
    output.innerHTML = maskedWord;
};

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();

        const guess = input.value;
        input.value = '';

        if (guess.length > 1) {
            if (guess.toLowerCase() === randomizedWord.toLowerCase()) {
                win();  // Pelaaja voittaa, jos arvaa koko sanan oikein
            } else {
                alert('You guessed wrong! You can only guess one letter at a time or guess the whole word.');
                guesses++; // Lisätään arvausyritysten määrää
                span.innerHTML = guesses;
            }
        } else if (guess.length === 1) {
            // Tarkistetaan, onko kirjain sanassa
            if (randomizedWord.toLowerCase().includes(guess.toLowerCase())) {
                replaceFoundChars(guess);
            } else {
                alert('You guessed wrong!');
            }
            guesses++;
            span.innerHTML = guesses;

            
            if (maskedWord.toLowerCase() === randomizedWord.toLowerCase()) {
                win();
            }
        } 
    }
});

const win = () => {
    alert (`You have guessed right, the word is ${randomizedWord}. You needed ${guesses} guesses!`)
    newGame()
}