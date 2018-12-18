import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { SharedService } from '../core/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './enter-ref.component.html',
  styleUrls: ['./enter-ref.component.scss']
})
export class EnterRefComponent implements OnInit {
  questionType: string;
  displayPreamble: boolean;
  customerRef: string;

  subHeaderTitleChanges: Subscription;

  faClock = faClock;

  constructor(private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
  }

  hideHeader(value: boolean) {
    this.sharedService.emitHeaderHide(value);
  }

  onEnterRef() {
    this.hideHeader(false);
    console.log('customerRef:' + this.customerRef);
    this.router.navigateByUrl('/outcome-history?customerRef=' + this.customerRef);
  }
}
