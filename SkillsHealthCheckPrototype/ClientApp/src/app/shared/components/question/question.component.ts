import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { Customer, Outcome, Questions, QuestionTraits, QuestionAnswer } from "../../../../interfaces";
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  @Input() question;
  @Input() responseSelected: boolean;
  @Output() selectedResponse = new EventEmitter<object>();
  @Output() undo = new EventEmitter<boolean>();

  private answer: QuestionAnswer;
  private ratings = []
  

  faCheckCircle = faCheckCircle;

  constructor() {}

  ngOnInit() {
    this.ratings = [
      {value: 1, text: "Strongly agree"},
      {value: 2, text: "Agree"},
      {value: 3, text: "Disagree"},
      {value: 4, text: "Strongly disagree"},
    ];
  }

  onSelectedResponse(rating) {
    this.responseSelected = true;

    this.answer = {
      questionid: "", // question id not known
      text: this.question.text,
      traitid: this.question.questiontraits[0].traitid,
      trait: this.question.questiontraits[0].trait,
      traitscore: rating.value
    }

    this.selectedResponse.emit(this.answer);
  }

  onUndo() {
    this.responseSelected = false;
    this.undo.emit(this.responseSelected)
  }
}
