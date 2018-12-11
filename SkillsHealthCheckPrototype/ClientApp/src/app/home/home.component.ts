import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { SharedService } from '../core/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  questionType: string;
  displayPreamble: boolean;

  subHeaderTitleChanges: Subscription;

  faClock = faClock;

  constructor(private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
  }

  hideHeader(value: boolean) {
    this.sharedService.emitHeaderHide(value);
  }

  onSelectedQuestionType(type) {
    this.questionType = type;
    this.displayPreamble = true;

    this.hideHeader(false);
  }

  onStartQuestion() {
    this.hideHeader(false);
    this.router.navigate(['assessment-neg'])
  }
}
