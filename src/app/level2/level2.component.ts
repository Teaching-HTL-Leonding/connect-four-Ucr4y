import { Component } from '@angular/core';

@Component({
  templateUrl: './level2.component.html',
  styleUrls: ['./level2.component.css'],
})
export class Level2Component {
  public currentPlayerIndex = 1;
  public currentWinnerIndex=0;
  public boardContent!: number[][];
  public playerNames : string[];

  public constructor(){
    this.playerNames=['','1','2']
    this.onRestart();
  }

  public onRestart(): void{
    this.boardContent=[
      [0,0,0],
      [0,0,0],
      [0,0,0],
      [0,0,0],
    ]
    this.currentPlayerIndex = 1;
    this.currentWinnerIndex = 0;
  }
  public drop(colIx: number) {
    if(this.currentWinnerIndex === 0){
      if(this.getFreePlace(colIx) >= 0){
        this.boardContent[colIx][this.getFreePlace(colIx)] = this.currentPlayerIndex
        this.currentPlayerIndex = this.currentPlayerIndex === 1 ? 2 : 1;
        this.currentWinnerIndex = this.getWinnerIndex();
      }

    }
  }
  public getPlayerIndex(col: number,row: number):string{
    return this.playerNames[this.boardContent[col][row]];
  }
  public getWinnerName():string{
    return this.playerNames[this.currentWinnerIndex];
  }

  public getFreePlace(colIx:number):number
  {
    for(let i = 3; i>= 0; i--){
      if(this.boardContent[colIx][i] === 0 || this.boardContent[colIx][i] === undefined){
        return i;

      }
    }
    return -1;
  }
  public getStyle(col: number, row: number): string{
    if(this.boardContent[col][row] !== 0){
      return `occupied-${this.getPlayerIndex(col,row)}`;
    }
    return "";
  }

  public getWinnerIndex():number
  {
    //vertical
    for(let i = 0; i < 4; i++){
      if(this.boardContent[i][0] !== 0 && this.boardContent[i][0] === this.boardContent[i][1] && this.boardContent[i][1] === this.boardContent[i][2] && this.boardContent[i][2] === this.boardContent[i][3]){
        return this.boardContent[i][0];
      }
    }
    //horizontal
    for(let i = 0; i < 4; i++){
      if(this.boardContent[0][i] !== 0 && this.boardContent[0][i] === this.boardContent[1][i] && this.boardContent[1][i] === this.boardContent[2][i] && this.boardContent[2][i] === this.boardContent[3][i]){
        return this.boardContent[0][i];
      }
    }
    //diagonal
    if(this.boardContent[0][0] !== 0 && this.boardContent[0][0] === this.boardContent[1][1] && this.boardContent[1][1] === this.boardContent[2][2] && this.boardContent[2][2] === this.boardContent[3][3]){

      return this.boardContent[0][0];

    }
    if(this.boardContent[0][3] !== 0 && this.boardContent[0][3] === this.boardContent[1][2] && this.boardContent[1][2] === this.boardContent[2][1] && this.boardContent[2][1] === this.boardContent[3][0]){

      return this.boardContent[0][3];

    }

    return 0;
  }
  // TODO: Complete this class by adding the appropriate code
  // At the end, this should become a working connect-four-game on a 4 x 4 board.
}
