import { Component } from '@angular/core';
import { Level2Component } from '../level2/level2.component';
@Component({
  templateUrl: './level3.component.html',
  styleUrls: ['./level3.component.css'],
})
export class Level3Component extends Level2Component {
  cols!: number;
  droppingArrows!: [];
  override nrOfRows: number = 6;
  override nrOfCols: number = 6;
  override boardContent!: number[][];
  public getBoardContent(): number[][] {
    return this.boardContent;
  }

  public constructor() {
    super();
    this.onRestart();
  }
  public override onRestart(): void {
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
  public override getWinnerIndex(): number {
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

  // TODO: Complete this class by adding the appropriate code.
  // Try to avoid copying the code from level 2. Find a different solution
  // for reusing the existing logic.
}
