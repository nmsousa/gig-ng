import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  public matrixChange = new Subject<any[][]>();
  public timeChange = new Subject<number>();
  public codeChange = new Subject<number>();

  matrixSize = 10; // Width and Height of the matrix
  matrix: any[][];
  code: number;
  gridGenerationInterval;
  now: number = Date.now();

  constructor() {
    // Update the timer every second
    setInterval(() => {
      this.now = Date.now();
      this.timeChange.next(this.now);
    }, 1000);
  }

  public getMatrix(): any[][] {
    return this.matrix;
  }

  public getCode(): number {
    return this.code;
  }

  public getNow(): number {
    return this.now;
  }

  public generateGrid(initialGeneration: boolean, character: string = '') {
    let randomAsciiCode: number;
    const percentageOfCells = Math.round((this.matrixSize * this.matrixSize) * 0.2); // 20% of the total amount of cells
    let cellCounter = 0;

    if (!initialGeneration) {
      if (this.gridGenerationInterval) {
        // Stop the previous execution
        clearInterval(this.gridGenerationInterval);
      }
      // Update the code every 2 seconds
      this.gridGenerationInterval = setInterval(() => {
        this.code = this.generateCode();
        this.codeChange.next(this.code);
      }, 2000);
    } else {
      this.setupInitialGridConfiguration();
    }

    // Loop though the rows
    for (let rowIndex = 0; rowIndex < this.matrixSize; rowIndex++) {
      // Loop though the columns
      for (let colIndex = 0; colIndex < this.matrixSize; colIndex++, cellCounter++) {

        // Initial manual generation
        if (!initialGeneration) {
          // If we have a character, we use it to generate 20% of the cell values
          if (character && cellCounter < percentageOfCells) {
            this.matrix[rowIndex][colIndex] = character;
          } else {
            // Generate a random number between 97 and 122 (ASCII code for [a-z])
            randomAsciiCode = Math.floor((Math.random() * 26) + 97);
            this.matrix[rowIndex][colIndex] = String.fromCharCode(randomAsciiCode);
          }

          // Automatic initial generation with empty values
        } else {
          this.matrix[rowIndex][colIndex] = '';
        }
      }
    }

    // Update the code
    if (!initialGeneration) {
      this.code = this.generateCode();
      this.codeChange.next(this.code);
    }

    // Inform whoever is listening to this matrix updates
    this.matrixChange.next(this.matrix);
  }

  setupInitialGridConfiguration() {
    this.matrix = [];

    // Setup grid configuration
    for (let i = 0; i < this.matrixSize; i++) {
      this.matrix.push([]);
    }
  }

  public generateCode(): number {
    const seconds = (new Date(this.now)).getSeconds().toString().padStart(2, '0');

    const firstLetter: string = this.matrix[seconds.charAt(1)][seconds.charAt(0)];
    const secondLetter: string = this.matrix[seconds.charAt(0)][seconds.charAt(1)];
    let firstLetterCount = 0;
    let secondLetterCount = 0;

    // Loop though the rows
    for (let rowIndex = 0; rowIndex < this.matrixSize; rowIndex++) {
      // Loop though the columns
      for (let colIndex = 0; colIndex < this.matrixSize; colIndex++) {
        if (this.matrix[rowIndex][colIndex] === firstLetter) {
          firstLetterCount++;
        }
        if (this.matrix[rowIndex][colIndex] === secondLetter) {
          secondLetterCount++;
        }
      }
    }

    console.log(`(Before) seconds: ${seconds},
                firstLetter: ${firstLetter} = ${firstLetterCount},
                secondLetter: ${secondLetter} = ${secondLetterCount}`);

    // If the value is above 9 we should divide by the lowest integer possible in order to get a value lower or equal to 9
    if (firstLetterCount > 9) {
      firstLetterCount = this.getValueBelowNine(firstLetterCount);
    }
    if (secondLetterCount > 9) {
      secondLetterCount = this.getValueBelowNine(secondLetterCount);
    }

    console.log(`(After) seconds: ${seconds},
                firstLetter: ${firstLetter} = ${firstLetterCount},
                secondLetter: ${secondLetter} = ${secondLetterCount}`);

    return +`${firstLetterCount}${secondLetterCount}`;
  }

  private getValueBelowNine(value: number): number {
    let newValue = value;

    // The maximum we will divide by is 11 because 100/11 is 9
    for (let i = 2; i <= 11; i++) {
      newValue = Math.round(value / i);
      if (newValue <= 9) {
        return newValue;
      }
    }

    return newValue;
  }

}
