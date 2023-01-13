import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // TODO: DONE - create array-of-arrays of true/false values
    const randomTrueOrFalse = () => {
      let num = Math.random();
      if (num < chanceLightStartsOn) {
        return true;
      } else {
        return false;
      }
    }

    let initialBoard = [];
    for (let i=0; i<nrows; i++) {
      let row = [];
      for (let i=0; i<ncols; i++) {
        row.push(randomTrueOrFalse())
      }
      initialBoard.push(row)
    }

    console.log(initialBoard)
    return initialBoard;
  }

  function hasWon(board) {
    // TODO: DONE - check the board in state to determine whether the player has won.
    let stringBoard = JSON.stringify(board)
    let testWin = stringBoard.indexOf('false')
    if (testWin === -1) {
      console.log('win')
      return ('win')
    } else {
      console.log('not win')
      return ('not win')
    }
  }


  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      // TODO: in the copy, flip this cell and the cells around it

      // TODO: return the copy
    });
  }

  return(
    <>
      <Cell />
    </>
  )

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board

  // TODO
}

export default Board;