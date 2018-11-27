import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchQuestionsComponent } from './fetch-questions/fetch-questions.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { OutcomeComponent } from './outcome/outcome.component';
import { CustomersComponent } from './customers/customers.component';
import { ResultsComponent } from './results/results.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchQuestionsComponent,
    AssessmentComponent,
    OutcomeComponent,
    CustomersComponent,
    ResultsComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ChartsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-questions', component: FetchQuestionsComponent },
      { path: 'assessment', component: AssessmentComponent },
      { path: 'outcome', component: OutcomeComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'results', component: ResultsComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
