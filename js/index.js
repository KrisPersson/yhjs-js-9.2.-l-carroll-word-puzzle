const elements = {
    counterBoardTimerP: document.querySelector('.counter-board__timer-p'),
    timerPCount: document.querySelector('.timer-p__count'),
    main: document.querySelector('main'),
    mainStartScreen: document.querySelector('.main__start-screen'),
    startScreenInput: document.querySelector('.start-screen__input'),
    startScreenBtn: document.querySelector('.start-screen__start-btn'),
    asideLeft: document.querySelector('.aside-left'),
    asideRight: document.querySelector('.aside-right'),

}

let gameState = {
    playerName: '',
    startingWord: '',
    targetWord: '',
    submittedWords: []
}

const BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

const originalWordData = ['run', 'fly', 'hop', 'let', 'rat', 'cup', 'pin', 'ten']

// START SCREEN

elements.startScreenBtn.addEventListener('click', () => {
    const username = elements.startScreenInput.value

    if (username.length > 2 && username.length <= 20) { // Making sure username is not shorter than 3, or longer than 20 chars.
        startGame(username)
    } else {
        alert('Please enter a username between 3-20 characters in length')
    }
})


function startGame(username) {

    let wordData = [...originalWordData]

    gameState.playerName = username
    gameState.startingWord = wordData.splice(getRandomIndex(wordData), 1)[0]
    gameState.targetWord = wordData.splice(getRandomIndex(wordData), 1)[0]
    gameState.submittedWords = [gameState.startingWord]

    renderBoards()
}

function renderBoards() {

    // RENDER MAIN

    let mainAcc = ``
    for (let i = 0; i < gameState.startingWord.length; i++) {
            
            mainAcc += `<input class='word-board__letter-slot' placeholder='${gameState.submittedWords[gameState.submittedWords.length - 1][i]}' value='${gameState.submittedWords[gameState.submittedWords.length - 1][i]}' maxlength='1'>`
    }

    const startGameMainHTML = `
    <section class='main__game-board'>
        <section class='game-board__word-board'>
            ${mainAcc}
        </section>
        <button class='game-board__submit-btn' onclick='handleSubmit()'>SUBMIT</button>
    </section>
`
    // RENDER ASIDE-LEFT

    let asideLeftAcc = ``

    for (let i = 0; i < gameState.submittedWords.length; i++) {
        asideLeftAcc += `<li>${gameState.submittedWords[i]}</li>`
    }

    const startGameAsideLeftHTML = `
        <h2>Words:</h2>
        <ul>
            ${asideLeftAcc}
        </ul>
        <h2>Target word:</h2>
        <p>${gameState.targetWord}</p>
    `
    elements.main.innerHTML = startGameMainHTML
    elements.asideLeft.innerHTML = startGameAsideLeftHTML

    // RENDER ASIDE-RIGHT

    if (gameState.submittedWords.length === 1) {  // If we just started, print out the rules to asideRight
        const startGameAsideRightHTML = `
        <h2>Rules</h2>
        <ul>
            <li>Your goal is to transform the starting word into the target word.</li>
            <li>You may only change one (1) letter at a time.</li>
            <li>Everytime you change a letter, this new word must also be a real word from the English language.</li>
            <li>Change one letter and press 'Submit' to begin.</li>
        </ul>
    `
    elements.asideRight.innerHTML = startGameAsideRightHTML
    }

    


}

function getRandomIndex(wordData) {
    const randomIndex = Math.floor(Math.random() * wordData.length)
    return randomIndex
}



function handleSubmit() {

    let newWord = ''
    const newWordLetters = document.querySelectorAll('.word-board__letter-slot')

    for (let i = 0; i < newWordLetters.length; i++) {           // Assemble the input-values to a string
        newWord += newWordLetters[i].value
    }
    
    if (newWord !== gameState.submittedWords[gameState.submittedWords.length - 1]) {  // if newWord isnt the same as the current word
        let counter = 0
        for (let i = 0; i < newWord.length; i++) {
            if (newWord[i] !== gameState.submittedWords[[gameState.submittedWords.length - 1]][i]) {  // Count how many letters have changed since the last word
                counter++                                                           
            }
        }

        if (counter === 1) {                    // If only one (1) letter has been changed compared to the last word
            searchWordInDictionary(newWord)
        } else {
            alert('You may only change 1 letter at a time')
            renderBoards()
        }
    } else {
        alert('You need to change 1 letter before submitting')
    }
}

function renderWinMessage() {
    const html = `
        <p class='win-message'>Congratulations! <br> You matched the word in ${gameState.submittedWords.length - 1} tries! &#128079;</p>
        <button class="play-again-btn" onclick="startGame()">PLAY AGAIN</button>

    `
    const mainGameBoard = document.querySelector('.main__game-board') 
    const submitBtn = document.querySelector('.game-board__submit-btn')
    mainGameBoard.removeChild(submitBtn)
    mainGameBoard.innerHTML += html
}

async function searchWordInDictionary(word) {
    const response = await fetch(BASE_URL + word)
    if (response.status === 200) {
        gameState.submittedWords.push(word.toLowerCase())
        console.log(gameState.submittedWords)
        renderBoards()

        if (word === gameState.targetWord) {
            console.log('You won!')
            renderWinMessage()
        }
    } else {
        console.log('Word doesnt exist')
        alert(`That's not an English word :(`)
        renderBoards()
    }
}

startGame()
