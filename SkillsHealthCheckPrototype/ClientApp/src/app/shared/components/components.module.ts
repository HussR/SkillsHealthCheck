import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ProgressComponent } from './progress/progress.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { PhaseBannerComponent } from './phase-banner/phase-banner.component';
import { QuestionComponent } from './question/question.component';

@NgModule({
  declarations: [
    BreadcrumbsComponent,
    PhaseBannerComponent,
    ProgressComponent,
    QuestionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    FormsModule,
    BreadcrumbsComponent,
    PhaseBannerComponent,
    ProgressComponent,
    QuestionComponent
  ]
})
export class ComponentsModule { }
