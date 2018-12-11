import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private emitHeaderHideSource = new Subject<boolean>();

  headerHideEmitted$ = this.emitHeaderHideSource.asObservable();

  emitHeaderHide(change: boolean) {
    this.emitHeaderHideSource.next(change);
  }
}
