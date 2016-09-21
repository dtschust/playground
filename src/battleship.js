const BOARD_LENGTH = 10
const PLAYER_ONE = 'one'
const PLAYER_TWO = 'two'

const HIT = 'hit'
// const SUNK = 'sunk'
const MISS = 'miss'

const ships = [5, 4, 3, 2, 2, 1, 1]

class Battleship {
  constructor () {
    this.currentPlayer = 1
    this.boards = {}
    this.attacks = {}
    this.setupBoards()
    this.setupAttacks()
  }
  setupAttacks () {
    this.setupAttack(PLAYER_ONE)
    this.setupAttack(PLAYER_TWO)
  }
  setupAttack (playerId) {
    let attack = new Array(BOARD_LENGTH).fill(false)
    attack = attack.map(() => {
      return new Array(BOARD_LENGTH).fill(false)
    })
    this.attacks[playerId] = attack
  }

  getAttackBoard (playerId) {
    return this.attacks[playerId]
  }
  getBoard (playerId) {
    return this.boards[playerId]
  }
  getBoards () {
    return this.boards
  }
  getAttacks () {
    return this.attacks
  }
  setupBoards () {
    this.setupBoard(PLAYER_ONE)
    this.setupBoard(PLAYER_TWO)
  }
  setupBoard (playerId) {
    let shipId = 1
    let board = new Array(BOARD_LENGTH).fill(false)
    board = board.map(() => {
      return new Array(BOARD_LENGTH).fill(false)
    })
    let tempShips = [...ships]
    let ship = tempShips.shift()
    while (ship) {
      let horizontal = (Math.random() >= 0.5)
      let x = Math.floor(Math.random() * BOARD_LENGTH)
      let y = Math.floor(Math.random() * BOARD_LENGTH)
      // TODO: Bind by ship length
      let shipFits = true

      // Check that ship fits
      for (let i = 0; i < ship; i++) {
        // check bounding of coords
        if (!this.isInBounds(x, y, ship, horizontal)) {
          shipFits = false
          break
        }

        if (this.isCollision(board, x, y, i, horizontal)) {
          shipFits = false
          break
        }
      }

      // Place ship
      if (shipFits) {
        for (let i = 0; i < ship; i++) {
          if (horizontal) {
            board[x + i][y] = shipId
          } else {
            board[x][y + i] = shipId
          }
        }
        ship = tempShips.shift()
        shipId++
      }
    }
    this.boards[playerId] = board
  }

  isCollision (board, x, y, shipSize, horizontal) {
    if (horizontal) {
      if (board[x + shipSize][y]) {
        return true
      }
    } else {
      if (board[x][y + shipSize]) {
        return true
      }
    }
    return false
  }

  isInBounds (x, y, shipSize, horizontal) {
    if (horizontal) {
      return x + shipSize < BOARD_LENGTH
    } else {
      return y + shipSize < BOARD_LENGTH
    }
  }
  printAll () {
    this.printAttacks()
    this.printBoards()
  }
  printAttacks () {
    console.log('Player One:')
    this.printAttack(PLAYER_ONE)
    console.log('Player Two:')
    this.printAttack(PLAYER_TWO)
  }
  printAttack (playerId) {
    this.attacks[playerId].forEach((row) => {
      console.log(row.map((cell) => {
        if (cell === HIT) {
          return ' X '
        } else if (cell === MISS) {
          return ' O '
        } else {
          return ' _ '
        }
      }).join(''))
    })
  }
  printBoards () {
    console.log('Player One:')
    this.printBoard(PLAYER_ONE)
    console.log('Player Two:')
    this.printBoard(PLAYER_TWO)
  }
  printBoard (playerId) {
    this.boards[playerId].forEach((row) => {
      console.log(row.map((cell) => {
        return cell ? ' X ' : ' _ '
      }).join(''))
    })
  }

  getEnemyBoard (playerId) {
    return this.boards[playerId === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE]
  }
  isWinner (playerId) {
    let enemyBoard = this.getEnemyBoard(playerId)
    let attacks = this.attacks[playerId]
    let isWinner = true
    enemyBoard.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (cell && !attacks[x][y]) {
          isWinner = false
        }
      })
    })
    return isWinner
  }
  isInvalidAttack (attacks, x, y) {
    // TODO: Check bounding
    return attacks[x][y]
  }
  isHit (board, x, y) {
    return board[x][y]
  }
  isSunk (board, attacks, shipId) {
    let sunk = true
    board.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (cell === shipId && !attacks[x][y]) {
          sunk = false
        }
      })
    })
    return sunk
  }

  attack (playerId, x, y) {
    let payload = {
      hit: false,
      sunk: false,
      endGame: this.isWinner(playerId)
    }
    let attacks = this.attacks[playerId]

    if (this.isInvalidAttack(attacks, x, y)) {
      payload.error = 'Already attacked'
      return payload
    }

    let enemyBoard = this.getEnemyBoard(playerId)

    if (this.isHit(enemyBoard, x, y)) {
      payload.hit = true
      attacks[x][y] = HIT
      let hitShipId = enemyBoard[x][y]

      if (this.isSunk(enemyBoard, attacks, hitShipId)) {
        payload.sunk = true
        // then check end game case
        if (this.isWinner(playerId)) {
          payload.endGame = true
        }
      }
    } else {
      attacks[x][y] = MISS
    }
    return payload
  }
}

// let battleship = new Battleship()
// // let result = battleship.attack(PLAYER_ONE, 0, 0)
// for (let i = 0; i < 10; i++) {
//   for (let j = 0; j < 10; j++) {
//     let result = battleship.attack(PLAYER_ONE, i, j)
//     console.log(result)
//   }
// }
//
// battleship.printAll()
export default Battleship
