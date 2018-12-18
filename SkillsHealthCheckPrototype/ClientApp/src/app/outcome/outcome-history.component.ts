import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Customer, Outcome, Questions, QuestionTraits, QuestionAnswer } from "../../interfaces";
import { Router } from '@angular/router';

@Component({
  selector: 'app-outcome-history',
  templateUrl: './outcome-history.component.html'
})
export class OutcomeHistoryComponent {
  public customerRef: string;
  public outcome: Outcome[];
  public answer: QuestionAnswer;
  //d0186e5d-a44c-4813-b0d7-0529b886d83d
  constructor(private router: Router, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.customerRef = params['customerRef'];
      console.log('customerRef: ' + this.customerRef);
    });
    http.get<Customer>(baseUrl + 'api/QuestionData/GetCustomerByRef?customerRef=' + this.customerRef).subscribe(result => {
      var customer = result;

      console.log('No of answers: ' + customer.questionanswers.length);
      if (customer.questionanswers.length < 40) {
        var nextQuestion = customer.questionanswers.length + 1;
        this.router.navigateByUrl('/assessment-neg?orderNo=' + nextQuestion + '&customerRef=' + this.customerRef);
      }
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
