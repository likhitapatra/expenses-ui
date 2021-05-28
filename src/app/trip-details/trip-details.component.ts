import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnChanges {
  @Input() expenses: Array<any>;
  totals: Array<any>;
  person: Array<any>;
  result: Array<any>;
  tripExpenses;
  constructor() { }

  ngOnChanges() {
    if (this.expenses.length > 0) {
      this.calculateExpenses(this.expenses);
    }
  }

  calculateExpenses(expenses) {
    const names = this.getPeople(this.expenses);
    this.totals = Array.from(
      this.expenses.reduce((m, { name, amount }) => m.set(name, (m.get(name) || 0) + amount), new Map()),
      ([name, total]) => ({ name, total })
    );
    this.tripExpenses = this.totals.reduce((n, { total }) => n + total, 0);

    const eachPersonTotal = this.tripExpenses / names.length;

    this.result = this.totals.map((val) => ({ name: val.name, total: eachPersonTotal - val.total }));
    this.person = this.result.reduce((a, b) => a.total < b.total ? a : b);

  }

  getPeople = (expenses) => [...new Map(expenses.map(item => [item.name, item])).values()].map(({ name }) => name);


}
