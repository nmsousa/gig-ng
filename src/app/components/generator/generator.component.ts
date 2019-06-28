import { GeneratorService } from './../../services/generator.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  matrix: any[][];
  character = '';
  inputCooldown: boolean; // If the user typed something less than 4 seconds ago, this variable is true
  code: number;
  now: number;

  constructor(private generatorService: GeneratorService) { }

  ngOnInit() {
    this.matrix = this.generatorService.getMatrix();
    this.code = this.generatorService.getCode();
    this.now = this.generatorService.getNow();

    this.subscriptions.push(this.generatorService.matrixChange.subscribe(matrix => {
      this.matrix = matrix;
    }));
    this.subscriptions.push(this.generatorService.timeChange.subscribe(now => {
      this.now = now;
    }));
    this.subscriptions.push(this.generatorService.codeChange.subscribe(code => {
      this.code = code;
    }));

    if (!this.matrix) {
      this.generateGrid(true);
    }
  }

  generateGrid(initialGeneration: boolean = false) {
    this.generatorService.generateGrid(initialGeneration, this.character);
    this.character = ''; // Clear the value used for generation
  }

  onInputChange(event) {
    // Blocks the input for 4 seconds after a change
    this.inputCooldown = true;
    setTimeout(() => {
      this.inputCooldown = false;
    }, 4000);
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();
      });
    }
  }

}
