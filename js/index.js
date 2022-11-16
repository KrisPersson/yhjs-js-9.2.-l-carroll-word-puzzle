
import { startGame, handleSubmit } from "./functions.js"

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



export { elements, gameState, originalWordData }

startGame()
