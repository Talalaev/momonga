import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';

interface loadingAction {
  state: boolean,
  requestPoint: string
}

@Injectable()
export class LoadingService {
  private loadingSource = new BehaviorSubject<loadingAction>({state: false, requestPoint: 'init'});

  loadingStream$ = this.loadingSource.asObservable();

  emitLoading(action: loadingAction) {
    this.loadingSource.next(action);
  }
}

