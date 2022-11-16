
import { renderBoards, renderWinMessage } from "./functions.js"
import { gameState } from "./index.js"

const BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

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

export { searchWordInDictionary }