const grid = document.querySelector(".grid")
const overlay = document.querySelector(".overlay");
let playAgain = document.querySelector(".playAgain");
const scoreDisplay = document.querySelector(".scoreDisplay")
const startButton = document.querySelector(".startButton")


/* Variables*/
let width = 10;
let direction = 1
let cobraArray = [2, 1, 0]
let score = 0
let timeBetweenMovements = 0
let speed = 0.9

/*Variables*/


const buildBoard = () => {
    for (let index = 0; index < 100; index++) {
        let div = document.createElement("div")
        grid.appendChild(div)
    }
}


const startGame = () => {

    let boxes = document.querySelectorAll(".grid div")
    direction = 1
    scoreDisplay.innerHTML = score
    timeBetweenMovements = 1000
    cobraArray = [2, 1, 0]
    cobraPosition = 0
    cobraArray.forEach(index => boxes[index].classList.add("cobra"))

}

const checkMoveOutcome = () => {
    let boxes = document.querySelectorAll(".grid div")

    if (lookForHits(boxes)) {
        overlay.style.display = "flex"
        return clearInterval(interval)

    } else {
        moveCobra(boxes)

    }
}

const moveCobra = (boxes) => {
    let tail = cobraArray.pop()
    boxes[tail].classList.remove("cobra")
    cobraArray.unshift(cobraArray[0] + direction)
    eatApple(boxes, tail)
    boxes[cobraArray[0]].classList.add("cobra")

}

const lookForHits = (boxes) => {
    if (
        (cobraArray[0] + width >= (width * width) && direction === width) ||
        (cobraArray[0] % width === width - 1 && direction === 1) ||
        (cobraArray[0] % width === 0 && direction === -1) ||
        (cobraArray[0] - width <= 0 && direction === -width) ||
        boxes[cobraArray[0] + direction].classList.contains("cobra")
    ) {
        return true
    } else {
        return false
    }
}

let applePosition = 0

const eatApple = (boxes, tail) => {
    if (boxes[cobraArray[0]].classList.contains("apple")) {
        boxes[cobraArray[0]].classList.remove("apple")
        boxes[tail].classList.add("cobra")
        cobraArray.push(tail)
        randomApplePosition(boxes)
        score += 1
        scoreDisplay.textContent = score
        clearInterval(interval)
        timeBetweenMovements = timeBetweenMovements * speed
        interval = setInterval(checkMoveOutcome, timeBetweenMovements)
    }
}

const randomApplePosition = (boxes) => {

    do {
        applePosition = Math.floor(Math.random() * boxes.length)
    } while (boxes[applePosition].classList.contains("cobra"))

    boxes[applePosition].classList.add("apple")

}

const left = document.querySelector(".left")
const bottom = document.querySelector(".bottom")
const right = document.querySelector(".right")
const up = document.querySelector(".top")


const keyBoardControl = (element) => {
    if (element.keyCode === 39) {
        direction = 1
    } else if (element.keyCode === 38) {
        direction = -width
    } else if (element.keyCode === 37) {
        direction = -1
    } else if (element.keyCode === 40) {
        direction = +width
    }
}

const restartGame = () => {
    grid.innerHTML = ""
    buildBoard()
    score = 0;
    startGame()
    overlay.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("keyup", keyBoardControl)
    buildBoard()
    startGame()
    playAgain.addEventListener("click", restartGame);
})

startButton.addEventListener('click', function () {
    startGame();
    startButton.style.display = "none";
    randomApplePosition(document.querySelectorAll(".grid div"), true);
    interval = setInterval(checkMoveOutcome, timeBetweenMovements)
});