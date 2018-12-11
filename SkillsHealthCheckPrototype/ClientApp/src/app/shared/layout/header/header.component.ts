import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs'
import { SharedService } from '../../../core/services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  displaySubHeaderTitle : boolean = true;
  subHeaderTitleChanges: Subscription;
  title = 'Explore my skills and discover careers';

  constructor(private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
    // this.displaySubHeaderTitle = true;

    this.subHeaderTitleChanges = this.sharedService.headerHideEmitted$.subscribe(isDisplayed => {
      this.displaySubHeaderTitle = isDisplayed
    })
  }

  ngOnDestroy () {
    this.subHeaderTitleChanges.unsubscribe();
  }

  onNavigateHome() {
    this.sharedService.emitHeaderHide(true);
    this.router.navigate(['/'])
  }
}
