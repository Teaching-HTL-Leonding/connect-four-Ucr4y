import { Injectable } from '@angular/core';
import { Level2Component } from '../level2/level2.component';

/**
 * Logic for a connect-four-board.
 */

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  droppingArrows!: [];
  nrOfRows: number = 6;
  nrOfCols: number = 6;
  public boardContent!: number[][];
  private currentPlayerIndex!: number;
  private currentWinnerIndex!: number;

  public get winnerIndex(): number {
    return this.currentWinnerIndex;
  }
  public get playerIndex(): number {
    return this.currentPlayerIndex;
  }
  public onRestart(): void {
    this.boardContent = [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
    ];
    this.currentPlayerIndex = 1;
    this.currentWinnerIndex = 0;
  }
  public drop(colIx: number) {
    if (this.currentWinnerIndex === 0) {
      if (this.getFreePlace(colIx) >= 0) {
        this.boardContent[colIx][this.getFreePlace(colIx)] =
          this.currentPlayerIndex;
        this.currentPlayerIndex = this.currentPlayerIndex === 1 ? 2 : 1;
        this.currentWinnerIndex = this.getWinnerIndex();
      }
    }
  }
  public getPlayerIndex(col: number, row: number): number {
    return this.boardContent[col][row];
  }

  public getFreePlace(colIx: number): number {
    for (let i = this.nrOfRows - 1; i >= 0; i--) {
      if (
        this.boardContent[colIx][i] === 0 ||
        this.boardContent[colIx][i] === undefined
      ) {
        return i;
      }
    }
    return -1;
  }
  public getWinnerIndex(): number {
    //vertical
    let counter = 0;
    for (let i = 0; i < this.nrOfRows; i++) {
      for (let j = 0; j < this.nrOfCols - 3; j++) {
        if (
          this.boardContent[i][j] !== 0 &&
          this.boardContent[i][j] === this.boardContent[i][j + 1] &&
          this.boardContent[i][j + 1] === this.boardContent[i][j + 2] &&
          this.boardContent[i][j + 2] === this.boardContent[i][j + 3]
        ) {
          return this.boardContent[i][j];
        }
      }
    }
    //horizontal
    for (let i = 0; i < this.nrOfCols; i++) {
      for (let j = 0; j < this.nrOfRows - 3; j++) {
        if (
          this.boardContent[j][i] !== 0 &&
          this.boardContent[j][i] === this.boardContent[j + 1][i] &&
          this.boardContent[j + 1][i] === this.boardContent[j + 2][i] &&
          this.boardContent[j + 2][i] === this.boardContent[j + 3][i]
        ) {
          return this.boardContent[j][i];
        }
      }
    }
    //diagonal 1
    for (let i = 0; i < this.nrOfRows - 3; i++) {
      for (let j = 0; j < this.nrOfCols - 3; j++) {
        if (
          this.boardContent[j][i] !== 0 &&
          this.boardContent[j][i] === this.boardContent[j + 1][i + 1] &&
          this.boardContent[j + 1][i + 1] === this.boardContent[j + 2][i + 2] &&
          this.boardContent[j + 2][i + 2] === this.boardContent[j + 3][i + 3]
        ) {
          return this.boardContent[j][i];
        }
      }
    }
    //diagonal 2
    for (let i = 3; i < this.nrOfCols; i++) {
      for (let j = 0; j < this.nrOfRows - 3; j++) {
        if (
          this.boardContent[j][i] !== 0 &&
          this.boardContent[j][i] === this.boardContent[j + 1][i - 1] &&
          this.boardContent[j + 1][i - 1] === this.boardContent[j + 2][i - 2] &&
          this.boardContent[j + 2][i - 2] === this.boardContent[j + 3][i - 3]
        ) {
          return this.boardContent[j][i];
        }
      }
    }
    return 0;
  }
}
