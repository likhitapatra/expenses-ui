import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ExpenseService } from '../services/expense.service';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent implements OnInit {

  expenseForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(`[a-zA-Z\d.'-]*`)]],
    amount: ['', Validators.required]
  });
  expenseArray = [];
  errorMessage: string;

  constructor(private fb: FormBuilder, private service: ExpenseService) { }


  ngOnInit() {
    this.getPeopleExpenses();
  }

  getPeopleExpenses() {
    this.service.getPeopleExpenses().subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.expenseArray = data;
        }
      },
      error => {
        this.errorMessage = 'Oops! Something went wrong please try again.';
      }
    );
  }
  onSubmit() {
    this.service.addExpenses(this.expenseForm.value).subscribe((response: any) => {
      this.expenseArray = JSON.parse(response);

    },
      error => {
        this.errorMessage = 'Oops! Something went wrong please try again.';
      });

  }

}
