import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer, Outcome, Questions, QuestionTraits, QuestionAnswer } from "../../interfaces";

@Component({
  selector: 'app-fetch-questions',
  templateUrl: './fetch-questions.component.html'
})
export class FetchQuestionsComponent {
  public questions: Questions[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Questions[]>(baseUrl + 'api/QuestionData/GetAllQuestions').subscribe(result => {
      this.questions = result;
    }, error => console.error(error));
  }
}
