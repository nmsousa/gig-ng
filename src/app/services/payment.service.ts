import { Payment } from './../components/payments/payments.component';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private payments: Payment[] = [];
  private paymentsChange = new Subject<Payment[]>();

  constructor() { }

  /**
   * Observable that will inform when the payment list have been changed
   */
  public getPaymentsChange(): Observable<Payment[]> {
    return this.paymentsChange.asObservable();
  }

  public getAll(): Payment[] {
    return this.payments;
  }

  public add(payment: Payment) {
    this.payments.push(payment);

    // Inform whoever has a list of payments that there is an update
    this.paymentsChange.next(this.payments);
  }

}
