import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  getPeopleExpenses() {
    return this.http.get(`${environment.apiUrl}/`);
  }
  addExpenses(body) {
    return this.http.post(`${environment.apiUrl}/add`, body, { responseType: 'text' });
  }
}
