import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Customer, Outcome, Questions, QuestionTraits, QuestionAnswer } from "../../interfaces";

@Component({
  selector: 'app-outcome',
  templateUrl: './outcome.component.html'
})
export class OutcomeComponent {
  public customerId: string;
  public outcome: Outcome[];
  public answer: QuestionAnswer;
  //d0186e5d-a44c-4813-b0d7-0529b886d83d
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.customerId = params['customerId'];
      console.log('customerId: ' + this.customerId);
    });
    http.get<Customer>(baseUrl + 'api/QuestionData/GetCustomerById?Id=' + this.customerId).subscribe(result => {
      var customer = result;

      console.log('No of answers: ' + customer.questionanswers.length);
      //customer.questionanswers.forEach(answer => {
      //  console.log(answer.text);

      //});
      var grouped = [];
      customer.questionanswers.reduce(function (res, value) {
        if (!res[value.traitid]) {
          res[value.traitid] = {
            score: 0,
            traitid: value.traitid,
            trait: value.trait
          };
          grouped.push(res[value.traitid])
        }
        res[value.traitid].score += value.traitscore;
        return res;
      }, {});

      grouped.sort((a, b) => parseInt(b.score) - parseInt(a.score));
      this.outcome = grouped;
      console.log('grouped: ' + JSON.stringify(this.outcome));

    }, error => console.error(error));
  }

}
