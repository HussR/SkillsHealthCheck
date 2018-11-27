import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Customer, Outcome, Questions, QuestionTraits, QuestionAnswer } from "../../interfaces";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
})


export class ResultsComponent {
  public customerId: string;
  public outcome: Outcome[];
  public answer: QuestionAnswer;
  public labelNo: number;


  public pieChartData: number[];// = [16,14,12,12,11,10,8,6];
  public pieChartLabels: string[];// = ['Analyst', 'Doer', 'Driver', 'Creator', 'Helper', 'Influencer', 'Leader', 'Organiser'];
  public pieChartType: string = 'pie';
  //public radarChartData: any = [
  //  { data: [], label: 'Analyst' },
  //  { data: [], label: 'Doer' },
  //  { data: [], label: 'Driver' },
  //  { data: [], label: 'Creator' },
  //  { data: [], label: 'Helper' },
  //  { data: [], label: 'Influencer' },
  //  { data: [], label: 'Leader' },
  //  { data: [], label: 'Organiser' }
  //];
 

  //d0186e5d-a44c-4813-b0d7-0529b886d83d
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.customerId = params['customerId'];
      console.log('customerId: ' + this.customerId);
    });
    http.get<Customer>(baseUrl + 'api/QuestionData/GetCustomerById?Id=' + this.customerId).subscribe(result => {
      var customer = result;
      this.labelNo = 0;
      console.log('No of answers: ' + customer.questionanswers.length);
      //customer.questionanswers.forEach(answer => {

      //  this.radarChartData.forEach(record => {
      //    console.log('label: ' + record.label + ' trait: ' + answer.trait);
      //    if (record.label == answer.trait) {
      //      record.data.push(answer.traitscore);
      //      console.log('score: ' + answer.traitscore);
      //      this.labelNo++;
      //      console.log('labelNo: ' + this.labelNo++);
      //    }
      //  });
      //});
      //console.log('radarChartData: ' + JSON.stringify(this.radarChartData));
      var pieData = [];
      var pieLabels = [];
      var grouped = [];
      customer.questionanswers.reduce(function (res, value) {
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
