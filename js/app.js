/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2, 3],
  [41, 40, 39, 38],
  [7, 8, 9, 10],
  [34, 33, 32, 31],
  [14, 15, 16, 17],
  [27, 26, 25, 24],
  [21, 22, 23, 24],
  [20, 19, 18, 17],
  [28, 29, 30, 31],
  [13, 12, 11, 10],
  [35, 36, 37, 38],
  [6, 5, 4, 3],
  [0, 7, 14, 21],
  [41, 34, 27, 20],
  [1, 8, 15, 22],
  [40, 33, 26, 19],
  [2, 9, 16, 23],
  [39, 32, 25, 18],
  [3, 10, 17, 24],
  [38, 31, 24, 17],
  [4, 11, 18, 25],
  [37, 30, 23, 16],
  [5, 12, 19, 26],
  [36, 29, 22, 15],
  [6, 13, 20, 27],
  [35, 28, 21, 14],
  [0, 8, 16, 24],
  [41, 33, 25, 17],
  [7, 15, 23, 31],
  [34, 26, 18, 10],
  [14, 22, 30, 38],
  [27, 19, 11, 3],
  [35, 29, 23, 17],
  [6, 12, 18, 24],
  [28, 22, 16, 10],
  [13, 19, 25, 31],
  [21, 15, 9, 3],
  [20, 26, 32, 38],
  [36, 30, 24, 18],
  [5, 11, 17, 23],
  [37, 31, 25, 19],
  [4, 10, 16, 22],
  [2, 10, 18, 26],
  [39, 31, 23, 15],
  [1, 9, 17, 25],
  [40, 32, 24, 16],
  [9, 17, 25, 33],
  [8, 16, 24, 32],
  [11, 17, 23, 29],
  [12, 18, 24, 30],
  [1, 2, 3, 4],
  [5, 4, 3, 2],
  [8, 9, 10, 11],
  [12, 11, 10, 9],
  [15, 16, 17, 18],
  [19, 18, 17, 16],
  [22, 23, 24, 25],
  [26, 25, 24, 23],
  [29, 30, 31, 32],
  [33, 32, 31, 30],
  [36, 37, 38, 39],
  [40, 39, 38, 37],
  [7, 14, 21, 28],
  [8, 15, 22, 29],
  [9, 16, 23, 30],
  [10, 17, 24, 31],
  [11, 18, 25, 32],
  [12, 19, 26, 33],
  [13, 20, 27, 34],
]

/*-------------------------------- Variables --------------------------------*/
let board = Array(42).fill(null), tie, turn, winner


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.game-square')
const messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset-button')
const tyrionImg = document.querySelector('#tyrion')
const tyrionSays = new Audio('./audio/a-lannistor-always-pays-his-debts.mp3')
const tyrionImg2 = document.querySelector('#tyrion2')
const tyrionSays2 = new Audio('./audio/i-drink-and-i-know-things.mp3')
const tyrionImg3 = document.querySelector('#tyrion3')
const tyrionSays3 = new Audio('./audio/i-am-happy.mp3')


/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(function(square) {
  square.addEventListener('click', handleClick)
})
resetBtnEl.addEventListener('click', init)

tyrionImg.addEventListener("click", function(evt){
  tyrionSays.volume = .10
  tyrionSays.play()
})

tyrionImg2.addEventListener("click", function(evt){
  tyrionSays2.volume = .10
  tyrionSays2.play()
})

tyrionImg3.addEventListener("click", function(evt){
  tyrionSays3.volume = .10
  tyrionSays3.play()
})

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  turn = 1
  winner = null
  render() 
  resetBtnEl.setAttribute('hidden', true)  
}

function render() {
  resetBtnEl.removeAttribute('hidden')
  resetBtnEl.className = 'retry'
  board.forEach((square, index) => {
    if(square === 1) {
      squareEls[index].style.backgroundColor = '#FF7700' 
    } if (square === -1) {
      squareEls[index].style.backgroundColor = '#CFF2FF' 
    } else if (square === null){
      squareEls[index].style.backgroundColor = ''
    } 
})


  if (winner === null){
    messageEl.textContent = ` It's player ${turn === 1 ? "????" : "??????"} turn`
  } else if (winner === "T"){
    messageEl.textContent = `This game is a tie!`
  } else {
    messageEl.textContent = `It's player ${turn === 1 ? "??????" : "????"} that wins the game!`
    confetti.start(3000)
  }

}

function handleClick(evt) {
  const sqIdx = parseInt(evt.target.id.replace('sq', ''))
  if(board[sqIdx] || winner) {
    return
  }
  const coinIdx = coinSpot(sqIdx)
  board[coinIdx] = turn
  turn *= -1
  winner = getWinner()
  render()
}

function coinSpot(sqIdx) {
  let openSpot = sqIdx + 35 
  if (board[openSpot] !== null) {
    openSpot = (sqIdx + 28)
  }
  if (board[openSpot] !== null) {
    openSpot = (sqIdx + 21)
  }
  if (board[openSpot] !== null) {
    openSpot = (sqIdx + 14)
  }
  if (board[openSpot] !== null) {
    openSpot = (sqIdx + 7)
  }
  if (board[openSpot] !== null) {
    openSpot = (sqIdx)
  }
  return openSpot
}



function getWinner() {
  if (!board.includes(null)){
    return "T"
  }
  for (let i = 0; i < winningCombos.length; i++) {
    if (board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]] + board[winningCombos[i][3]] === 4) {
      return 1
    } else if (board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]] + board[winningCombos[i][3]] === -4) {
      return -1
    } 
  }
  if (!board.includes(null)){
    return "T"
  }
  return null
}
