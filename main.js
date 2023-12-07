const grid = document.querySelector(".grid")
const overlay = document.querySelector(".overlay");
let playAgain = document.querySelector(".playAgain");
const scoreDisplay = document.querySelector(".scoreDisplay")
const startButton = document.querySelector(".startButton")


/* Variables*/
let width = 10;
let direction = 1
let cobraArray = [2, 1, 0]
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

const checkMoveOutcome = ()=> {
    let boxes = document.querySelectorAll(".grid div")
    
    if (lookForHits(boxes)) {
        overlay.style.display = "flex"
        return clearInterval(interval)
        
    } else {
        moveCobra(boxes)
    
    }
}

const moveCobra=(boxes)=> {
 
    let tail = cobraArray.pop()
    
    boxes[tail].classList.remove("cobra")

    cobraArray.unshift(cobraArray[0] + direction)
    
 
    eatApple(boxes, tail)
    
    boxes[cobraArray[0]].classList.add("cobra")
    
}