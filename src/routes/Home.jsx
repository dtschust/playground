/* eslint-disable camelcase */
import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Battleship from '../battleship'
const PLAYER_ONE = 'one'
const PLAYER_TWO = 'two'

const Board = ({board, attacks, onClick, playerId, active}) => {
  return (
    <div className={classNames('board-container', {'board-container--active': active})}>
      <div className='board'>
        {board.map((row, i) => {
          return (
            <div key={i} className='board__row'>
              {row.map((cell, j) => {
                return (
                  <span key={j} className={
                      classNames('board__cell',
                        {
                          'board__cell--ship': board[i][j],
                          'board__cell--attacked': attacks[i][j]
                        }
                    )
                    }
                    onClick={(e) => {
                      if (!active) {
                        return
                      }
                      onClick(playerId, i, j)
                    }} />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const Home = React.createClass({
  displayName: 'Home',
  componentWillMount: function () {
    this.battleship = new Battleship()
    this.updateGame()
  },
  getInitialState: function () {
    return {
      currentPlayer: PLAYER_ONE,
      boards: [],
      attacks: []
    }
  },
  updateGame: function () {
    this.setState({
      boards: this.battleship.getBoards(),
      attacks: this.battleship.getAttacks()
    })
  },
  togglePlayer: function () {
    this.setState({
      currentPlayer: (this.state.currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE)
    })
  },
  onClick: function (playerId, x, y) {
    if (playerId === this.state.currentPlayer) {
      const result = this.battleship.attack(playerId, x, y)
      console.log(result)
      // TODO: Handle response!
      this.updateGame()
      this.togglePlayer()
    }
  },
  render: function () {
    const { [PLAYER_ONE]: p1board, [PLAYER_TWO]: p2board } = this.state.boards
    const { [PLAYER_ONE]: p1attacks, [PLAYER_TWO]: p2attacks } = this.state.attacks
    const isp1BoardActive = this.state.currentPlayer === PLAYER_TWO
    return (
      <div>
        <h1>Battleship</h1>
        <div className='game-container'>
          <Board board={p1board} active={isp1BoardActive} attacks={p2attacks} playerId={PLAYER_TWO} onClick={this.onClick} />
          <Board board={p2board} active={!isp1BoardActive} attacks={p1attacks} playerId={PLAYER_ONE} onClick={this.onClick} />
        </div>
      </div>
    )
  }
})

const mapStateToProps = (store) => {
  return {

  }
}

const mapDispatchToProps = { push }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
/* eslint-enable camelcase */
