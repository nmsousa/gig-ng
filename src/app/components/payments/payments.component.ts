import { GeneratorService } from './../../services/generator.service';
import { PaymentService } from './../../services/payment.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export interface Payment {
  name: string;
  amount: number;
  code: number;
  grid: any[][];
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  payments: Payment[];
  newPayment: Payment = { name: '', amount: 0, code: 0, grid: [] };
  code: number;
  matrix: any[][];

  constructor(
    private paymentService: PaymentService,
    private generatorService: GeneratorService) { }

  ngOnInit() {
    this.payments = this.paymentService.getAll();
    this.code = this.generatorService.getCode() || 0;
    this.matrix = this.generatorService.getMatrix() || [];

    // Listen to Payment list changes
    this.subscriptions.push(this.paymentService.paymentsChange.subscribe(payments => {
      this.payments = payments;
    }));
    this.subscriptions.push(this.generatorService.codeChange.subscribe(code => {
      this.code = code;
    }));
    this.subscriptions.push(this.generatorService.matrixChange.subscribe(matrix => {
      this.matrix = matrix;
    }));
  }

  addPayment() {
    this.newPayment.code = this.code;
    this.newPayment.grid = this.matrix.map(element => element.slice()); // Matrix deep clone
    this.paymentService.add(this.newPayment);
    this.newPayment =
      { name: '', amount: 0, code: this.code, grid: [] };

    console.log(this.payments);
  }

  savePayments() {
    this.paymentService.save(this.payments);
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();
      });
    }
  }

}
