import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Customer, Outcome, Questions, QuestionTraits, QuestionAnswer } from "../../interfaces";

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html'
})
export class AssessmentComponent {
  public question: Questions;
  public currentCount = 1;
  public customer: Customer;
  public answer: QuestionAnswer;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private router: Router) {
    http.get<Questions>(baseUrl + 'api/QuestionData/GetQuestionByOrder?Order=' + this.currentCount).subscribe(result => {
      this.answer = {
        questionid: null, text: null, trait: null, traitid: null, traitscore: null
      };
      this.customer = {
        id: null, name: null, questionanswers: [{
          questionid: null,
          text: null,
          traitid: null,
          trait: null,
          traitscore: null,
        }]
      };
      this.customer.questionanswers = [];
      this.question = result;
    }, error => console.error(error));
  }

  public getNextQuestionAndSubmit($event, score: number) {
    console.log(JSON.stringify(this.question));
    this.answer = {
      questionid: null, text: null, trait: null, traitid: null, traitscore: null
    };
    this.answer.questionid = this.question.id;
    this.answer.text = this.question.text;
    this.answer.trait = this.question.questiontraits[0].trait;
    this.answer.traitid = this.question.questiontraits[0].traitid;
    this.answer.traitscore = score;

    
    //this.customer.name = "Joe Bloggs";
    this.customer.questionanswers.push(this.answer);

    //First submit before getting next question
    if (this.customer.id === null) {
        console.log('No customer found so create');
      console.log(JSON.stringify(this.customer));
      this.http.post<string>(this.baseUrl + 'api/QuestionData/CreateCustomerAsync',
        this.customer, {
          headers: new HttpHeaders()
            .set('Accept', 'application/json')
        }).subscribe(result => {
          console.log('Created new customer: ' + result);
          this.customer.id = result;
      }, error => console.error(error));
    } else {
      //We have an id so update instead
      this.http.post<string>(this.baseUrl + 'api/QuestionData/EditCustomerAsync',
        this.customer, {
          headers: new HttpHeaders()
            .set('Accept', 'application/json')
        }).subscribe(result => {
          console.log('Customer id: ' + this.customer.id + ' edited= ' + result);
        }, error => console.error(error));
    }

    this.currentCount++;
    $event.target.checked = false;
    this.http.get<Questions>(this.baseUrl + 'api/QuestionData/GetQuestionByOrder?Order=' + this.currentCount).subscribe(result => {
      //assume user has finished so redirect to results
      if (result == null) {
        this.router.navigateByUrl('/outcome?customerId=' + this.customer.id);
      } else {
        this.question = result;
      }

      //var ele = document.getElementsByName("rating");
      //for (var i = 0; i < ele.length; i++) {
      //  (ele[i] as HTMLInputElement).checked = false;
      //  console.log('currentCount=' + this.currentCount + ' radioVel: ' + score);
      //}

    }, error => console.error(error));
  }
}
