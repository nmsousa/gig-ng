import { PaymentService } from './../../services/payment.service';
import { Component, OnInit } from '@angular/core';

export interface Payment {
  name: string;
  amount: number;
  code: number;
  grid: [][];
}

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  payments: Payment[];
  newPayment: Payment = { name: '', amount: undefined, code: 0, grid: [] };

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.payments = this.paymentService.getAll();

    // Listen to Payment list changes
    this.paymentService.getPaymentsChange().subscribe(payments => {
      this.payments = payments;
    });
  }

  addPayment() {
    this.paymentService.add(this.newPayment);
    this.newPayment = { name: '', amount: undefined, code: 0, grid: [] };
  }

}
