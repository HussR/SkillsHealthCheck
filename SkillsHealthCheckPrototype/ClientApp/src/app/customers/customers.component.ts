import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Customer, Outcome, Questions, QuestionTraits, QuestionAnswer } from "../../interfaces";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent {
  public customers: Customer[];

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    http.get<Customer[]>(baseUrl + 'api/QuestionData/GetCustomers').subscribe(result => {
     this.customers = result;

    }, error => console.error(error));
  }

}
