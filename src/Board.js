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



function Board({ nrows=4, ncols=4, chanceLightStartsOn=0.5 }) {

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
    for (let y=0; y<nrows; y++) {
      let boardRow = [];
      for (let x=0; x<ncols; x++) {
        // boardRow.push({isLit: randomTrueOrFalse(), y, x})
        boardRow.push(randomTrueOrFalse())
      }
      initialBoard.push(boardRow)
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
      return true;
    } else {
      console.log('not win')
      return false;
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

      // TODO: DONE - Make a (deep) copy of the oldBoard
      let boardCopy = oldBoard.map(row => [...row])

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x, boardCopy);

      // TODO: DONE - return the copy
      return boardCopy;

    });
  }

  console.log(`board: ${board}`)

  // TODO: DONE - if the game is won, just show a winning msg & render nothing else
  if (hasWon(board)) {
    return (
      <>
        <h1>Win</h1>
      </>
    )
  }
  // TODO: Done - make table board
  let table = [];


  for (let y = 0; y < nrows; y++) {
    let tablerow = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      tablerow.push(
        <Cell
          flipCellsAroundMe={() => flipCellsAround(coord)}
          isLit={board[y][x]}
        />
      );
    }

    table.push(<tr key={y}>{tablerow}</tr>);
  }



  return (
    <table className="Board">
      <tbody>{table}</tbody>
    </table>
  );
}

  



export default Board;