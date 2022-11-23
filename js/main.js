'use strict'
const FLAG = '🚩'
const EMPTY = ''
const MINE = '💣'
// const ONE = 1
// const TWO = 2
// const THREE = 3


var gBoard
var gMineCount
var gTimer

var gLevel = {
    SIZE: 4,
    MINES: 2
};
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function initGame() {
    gBoard = buildBoard()
    console.log('buildBoard(gBoard):', buildBoard(gBoard))
    renderBoard(gBoard)
    // setMinesNegsCount(gBoard, 1, 1)
}

function buildBoard() {
    const board = []
    // var cell = {
    //     minesAroundCount: 4,
    //     isShown: false,
    //     isMine: false,
    //     isMarked: true

    // }
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            }
        }
    }

    board[1][1].isMine = true
    board[3][1].isMine = true
    gMineCount = 2

    return board

}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]

            var cellClass = getClassName({ i: i, j: j })

            if (currCell.isMine) cellClass += ' mine'
            else if (currCell.isShown) cellClass += ' show'
            else if (currCell.isMarked) cellClass += ' mark'

            strHTML += `\t<td class="cell ${cellClass}" onmousedown="cellClicked(this, ${i}, ${j})" >\n`

            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>'

    }
    const elBoard = document.querySelector('tbody.board')
    elBoard.innerHTML = strHTML


    const noRightClick = document.querySelector('table');
    noRightClick.addEventListener("contextmenu", e => e.preventDefault());
    // var minesNegsCount = getMinesNegsCount(gBoard, 2, 1)
    // console.log('minesNegsCount:', minesNegsCount)

    var res = getMinesNegsCount(board, 1, 2)
    console.log('res:', res)
    
    var res = setMinesNegsCount(gBoard)
    console.log('res:', res)



}

function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}

// var res = setMinesNegsCount(gBoard)
// console.log('res:', res)

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].minesAroundCount = getMinesNegsCount(board, i, j)
        }
    }
}


function getMinesNegsCount(board, rowIdx, colIdx) {
    var minesNegsCount = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            if (currCell.isMine) {
                minesNegsCount++
            }

        }
    }
    return minesNegsCount
}

function renderCell(location, value) {
    const cellSelector = '.' + getClassName(location) // cell-i-j
    const elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value

}

function cellClicked(elCell, i, j) {

    const cell = gBoard[i][j]
    // ignore none seats and booked
    // if (cell.isShown) {
    if (cell.isMine) {
        cell.isShown = true
        gameOver()
    } else if (cell.minesAroundCount === 1) {
        cell.isShown = true
        console.log('neighbors')
        cell === cell.minesAroundCount
        console.log('cell:', cell)
    }
    // else if (cell.minesAroundCount === 0) {
    //     cell.isShown = true
    //     cell === EMPTY
    //     console.log('empty')
    // }
    console.log('Cell clicked: ', elCell, i, j)
    // }
    // Support selecting a seat
    // elCell.classList.add('selected')
    // if (cell) {
    //     gElSelectedSeat.classList.remove('selected')


    // // Only a single seat should be selected
    // gElSelectedSeat = (gElSelectedSeat === elCell) ? null : elCell

    // // When seat is selected a popup is shown
    // if (gElSelectedSeat) showSeatDetails({ i: i, j: j })
    // else hideSeatDetails()

}

function checkGameOver() {

}

function gameOver() {
    gGame.isOn = false
    clearInterval(gTimer)
    console.log('Game Over')
}

function restart(){
    initGame()
}

function cellMarked(elCell) {

}
