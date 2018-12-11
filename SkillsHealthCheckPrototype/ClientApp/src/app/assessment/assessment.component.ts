import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Customer, Outcome, Questions, QuestionTraits, QuestionAnswer } from "../../interfaces";
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent {
  public question: Questions;
  public currentCount: number = 1;
  public customer: Customer;
  public answer: QuestionAnswer;
  private ratings = [];
  public responseSelected: boolean;
  public ratingScore: number = 0;
  public hasChecked: boolean;
  public answerCoverage: number = 0;
  public noOfQuestions: number = 40; //Currently hard code this at 40 later go do a count of questions.

  faCheckCircle = faCheckCircle;

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
        }],
        isflippedsurvey: null
      };
      this.customer.questionanswers = [];
      this.question = result;
    }, error => console.error(error));
  }

  ngOnInit() {
    this.ratings = [
      { value: 2, text: "Strongly agree" },
      { value: 1, text: "Agree" },
      { value: -1, text: "Disagree" },
      { value: -2, text: "Strongly disagree" },
    ];
  }

  public getNextQuestionAndSubmit(score: number) {
    console.log('score: ' + score);
    console.log(JSON.stringify(this.question));
    this.answer = {
      questionid: null, text: null, trait: null, traitid: null, traitscore: null
    };
    this.answer.questionid = this.question.id;
    this.answer.text = this.question.text;
    this.answer.trait = this.question.questiontraits[0].trait;
    this.answer.traitid = this.question.questiontraits[0].traitid;
    this.answer.traitscore = score;
    if (this.question.isflipquestion) {
      //This will flip the scores
      this.answer.traitscore = score * -1;
      console.log('scores flipped = ' + this.answer.traitscore);
    }


    //this.customer.name = "Joe Bloggs";
    this.customer.questionanswers.push(this.answer);
    this.customer.isflippedsurvey = true;
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
    //this.answerCoverage = parseFloat(((this.currentCount / this.noOfQuestions) * 100).toFixed(2));
    this.answerCoverage = Math.round((this.currentCount / this.noOfQuestions) * 100);
    this.currentCount++;

    this.hasChecked = false;
    this.http.get<Questions>(this.baseUrl + 'api/QuestionData/GetQuestionByOrder?Order=' + this.currentCount).subscribe(result => {
      //assume user has finished so redirect to results
      if (result == null) {
        this.router.navigateByUrl('/outcome?customerId=' + this.customer.id);
      } else {
        this.ratingScore = 0;
        this.responseSelected = false;

        this.hasChecked = null;
        this.question = result;
      }
      console.log("answerCoverage: " + this.answerCoverage);
      //var ele = document.getElementsByName("rating");
      //for (var i = 0; i < ele.length; i++) {
      //  (ele[i] as HTMLInputElement).checked = false;
      //  console.log('currentCount=' + this.currentCount + ' radioVel: ' + score);
      //}

    }, error => console.error(error));
  }

  onSelectedResponse(rating) {
    this.ratingScore = rating.value;
    console.log('rating: ' + this.ratingScore);

    this.responseSelected = true;
  }
  onUndo() {
    this.ratingScore = 0;
    this.responseSelected = false;
  }

}
