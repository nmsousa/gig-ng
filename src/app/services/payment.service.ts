import { Payment } from './../components/payments/payments.component';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private payments: Payment[] = [];
  public paymentsChange = new Subject<Payment[]>();

  constructor() { }


  public getAll(): Payment[] {
    return this.payments;
  }

  public add(payment: Payment) {
    this.payments.push(payment);

    // Inform whoever has a list of payments that there is an update
    this.paymentsChange.next(this.payments);
  }

  public save(payments: Payment[]): void {
    // TODO: Save to an API, for now we save in the localStorage
    localStorage.setItem('payments', JSON.stringify(payments));
  }

}
