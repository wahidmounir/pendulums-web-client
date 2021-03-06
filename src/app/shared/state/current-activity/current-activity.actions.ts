import { Injectable }         from '@angular/core';
import { Action }             from '@ngrx/store';
import { Activity }           from './current-activity.model';
import { ActionWithPayload }  from '../action-with-payload';

@Injectable()
export class CurrentActivityActions {
  static LOAD_CURRENT_ACTIVITY = 'LOAD_CURRENT_ACTIVITY';
  static CLEAR_CURRENT_ACTIVITY = 'CLEAR_ACTIVITY';
  static RENAME_CURRENT_ACTIVITY = 'RENAME_CURRENT_ACTIVITY';

  loadCurrentActivity(activity: Activity): ActionWithPayload<Activity> {
    return {
      type: CurrentActivityActions.LOAD_CURRENT_ACTIVITY,
      payload: activity
    };
  }

  renameCurrentActivity(name: string): ActionWithPayload<string> {
    return {
      type: CurrentActivityActions.RENAME_CURRENT_ACTIVITY,
      payload: name
    };
  }

  clearCurrentActivity(): Action {
    return {
      type: CurrentActivityActions.CLEAR_CURRENT_ACTIVITY
    };
  }
}
