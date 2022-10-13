import { Component } from '@angular/core';
import { BoardService } from './board.service';

@Component({
  templateUrl: './level4.component.html',
  styleUrls: ['./level4.component.css'],
})
export class Level4Component {
  public playerNames: string[];

  constructor(public board: BoardService) {
    this.playerNames = ['', '1', '2'];
    board.onRestart();
  }

  public getStyle(col: number, row: number): string {
    if (this.board.boardContent[col][row] !== 0) {
      return `occupied-${this.getPlayerName(col, row)}`;
    }
    return '';
  }
  public getPlayerName(col: number, row: number): string {
    return this.playerNames[this.board.boardContent[col][row]];
  }
  public getWinnerName(): string {
    return this.playerNames[this.board.winnerIndex];
  }
}
