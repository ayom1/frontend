// transaction.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = 'http://localhost:8080/api/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }

  addTransaction(userId: number, transaction: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/${userId}`, transaction);
  }
}
