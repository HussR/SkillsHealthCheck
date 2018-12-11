import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phase-banner',
  templateUrl: './phase-banner.component.html',
  styleUrls: ['./phase-banner.component.scss']
})
export class PhaseBannerComponent implements OnInit {
  phase = "Alpha" // fixme: inject phase text to component
  constructor() { }

  ngOnInit() {
  }
}
