const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const score = document.getElementById('score')
const width = 20
const upSnake = '<i class="fas fa-caret-up"></i>'
const downSnake = '<i class="fas fa-caret-down"></i>'
const rightSnake = '<i class="fas fa-caret-right"></i>'
const leftSnake = '<i class="fas fa-caret-left"></i>'
const apple = '🍎'

let squares = []
let currentSnake = []
let direction = 1
let appleIndex = 0
let interval = 850
let timerId = null

function createGrid() {
    //create 100 of these elements with a for loop
    for (let i=0; i < width*width; i++) {
        //create element
        const square = document.createElement('div')
        //add styling to the element
        square.classList.add('square')
        //put the element into our grid
        grid.appendChild(square)
        //push it into a new squares array    
        squares.push(square)
    }
}
function move() {
    if (
        (currentSnake[0] + width >= width*width && direction === width) || //if snake has hit bottom
        (currentSnake[0] % width === width-1 && direction === 1) || //if snake has hit right wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
        squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
        document.getElementById('gameOver').style.display = "block"
        return clearInterval(timerId)
    }

    //remove last element from our currentSnake array
    const tail = currentSnake.pop()
    //remove styling from last element
    squares[tail].innerHTML = ''
    squares[tail].classList.remove('snake')
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction)
    //add styling so we can see it
    
    //deal with snake head gets apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[appleIndex].classList.remove('apple')
        
        //grow our snake by adding class of snake to it
        squares[tail].classList.add('snake')
        squares[tail].innerHTML = getSnakeHead()
        
        //grow our snake array
        currentSnake.push(tail)
        
        //generate new apple
        generateApple()
        
        //add one to the score
        let currentScore = score.innerHTML;
        currentScore++
        
        //display our score
        document.getElementById('score').innerHTML = currentScore
        
        //speed up our snake
        interval *= 0.9
        clearInterval(timerId)
        timerId = setInterval(move, interval)
    }      
    squares[currentSnake[0]].classList.add('snake')
    squares[currentSnake[0]].innerHTML = getSnakeHead()
}

function getSnakeHead() {
    switch (direction) {
        case 1:
            return rightSnake
            break
        case -1:
            return leftSnake
            break
        case (-width):
            return upSnake
            break
        case (width):
            return downSnake
            break
    }
}

function clearSnake() {
    currentSnake.forEach(index => {
        squares[index].innerHTML = '' 
        squares[index].classList.remove('snake')
    })
}

function startGame() {
    squares[appleIndex].innerHTML = ''
    squares[appleIndex].classList.remove('apple')
    clearSnake()
    document.getElementById('score').innerHTML = 0
    document.getElementById('gameOver').style.display = "none"

    currentSnake = [2,1,0]
    direction = 1
    interval = 1000;
    currentSnake.forEach(index => {
        squares[index].innerHTML = getSnakeHead()
        squares[index].classList.add('snake')        
    })
    generateApple()
    clearInterval(timerId)
    timerId = setInterval(move, interval)
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].innerHTML = apple
    squares[appleIndex].classList.add('apple')

} 

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

function control(e) {
    if (e.keyCode === 39) {
        console.log('right pressed')
        direction = 1
    } else if (e.keyCode === 38) {
        console.log('up pressed')
        direction = -width
    } else if (e.keyCode === 37) {
        console.log('left pressed')
        direction = -1
    } else if (e.keyCode === 40) {
        console.log('down pressed')
        direction = +width
    }
}

createGrid()
document.getElementById('startBtn').addEventListener('click', startGame)
document.addEventListener('keyup', control)
