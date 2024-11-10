import { Component, OnInit } from '@angular/core';
import { TransactionService } from './transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];
  newTransaction = { description: '', amount: 0 };
  message: string | null = null;
  userId: number = 1; // Simulating user ID

  constructor(private transactionService: TransactionService,private router: Router) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  // Load transactions from the backend
  loadTransactions() {
    this.transactionService.getTransactions(this.userId).subscribe(
      (data) => {
        this.transactions = data;
      },
      (error) => {
        this.router.navigate(['/']); // Navigate to transactions page
        console.error('Failed to load transactions:', error);
        this.message = 'Error loading transactions. Please try again.';
      }
    );
  }

  // Add a new transaction
  addTransaction() {
    this.transactionService.addTransaction(this.userId, this.newTransaction).subscribe(
      (response) => {
        console.log('Transaction added:', response);
        this.transactions.push(response); // Add to the list
        this.message = 'Transaction added successfully!';
        this.newTransaction = { description: '', amount: 0 }; // Reset form
      },
      (error) => {
        console.error('Failed to add transaction:', error);
        this.message = 'Error adding transaction. Please try again.';
      }
    );
  }

  logout() {
    localStorage.removeItem('token');  // Remove JWT token
    this.router.navigate(['/login']);  // Redirect to login page
  }
}
