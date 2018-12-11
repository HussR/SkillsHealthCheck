import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Customer, Outcome, Questions, QuestionTraits, QuestionAnswer } from "../../interfaces";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-results',
  templateUrl: './results-all.component.html',
})


export class ResultsAllComponent {
  public customerId: string;
  public outcome: Outcome[];
  public answer: QuestionAnswer;
  public labelNo: number;


  public pieChartData: number[];// = [16,14,12,12,11,10,8,6];
  public pieChartLabels: string[];// = ['Analyst', 'Doer', 'Driver', 'Creator', 'Helper', 'Influencer', 'Leader', 'Organiser'];
  public pieChartType: string = 'pie';
 
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.customerId = params['customerId'];
      console.log('customerId: ' + this.customerId);
    });
    http.get<Customer[]>(baseUrl + 'api/QuestionData/GetCustomers').subscribe(result => {
      var customers = result;
      this.labelNo = 0;
      console.log('No of customers: ' + customers.length);

      var pieData = [];
      var pieLabels = [];
      var grouped = [];
      const qAnswers = [].concat(...customers.map(item => item.questionanswers));

      qAnswers.reduce(function (res, value) {
        if (!res[value.traitid]) {
          res[value.traitid] = {
            score: 0,
            traitid: value.traitid,
            trait: value.trait
          };
          grouped.push(res[value.traitid]);
        }
        res[value.traitid].score += value.traitscore;
        return res;
      }, {});

      grouped.sort((a, b) => parseInt(b.score) - parseInt(a.score));
      this.outcome = grouped;

      grouped.forEach(val => {
        console.log('val: ' + val.score);
        pieData.push(val.score);
        pieLabels.push(val.trait);
      });
      this.pieChartData = pieData;
      this.pieChartLabels = pieLabels;

      console.log('pieData: ' + JSON.stringify(this.pieChartData));
      console.log('grouped: ' + JSON.stringify(this.outcome));

    }, error => console.error(error));
  }



  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}
