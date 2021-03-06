import { Injectable }                 from '@angular/core';
import { HttpClient, HttpParams }     from '@angular/common/http';
import { Activity }                   from '../../shared/state/current-activity/current-activity.model';
import { SyncService }                from './sync.service';
import { environment }                from '../../../environments/environment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ActivityService {
  private options;
  constructor(
    private http: HttpClient,
    private syncService: SyncService
  ) {
    this.options = {...environment.httpOptions, responseType: 'text'};
  }

  create(projectId, activity): Promise<any> {
    return this.http
      .post(environment.apiEndpoint + '/projects/' + projectId
        + '/activities?socketId=' + this.syncService.getSocketId() ,
        JSON.stringify({activity: activity}) , environment.httpOptions)
      .toPromise()
      .then(response => response as Activity)
      .catch(this.handleError);
  }

  createManually(projectId, activity): Promise<any> {
    return this.http
      .post(environment.apiEndpoint + '/projects/' + projectId + '/activities/manualActivity' ,
        JSON.stringify({activity: activity}) , environment.httpOptions)
      .toPromise()
      .then(response => response as Activity)
      .catch(this.handleError);
  }

  editCurrentActivity(projectId, activity): Promise<any> {
    return this.http
      .put(environment.apiEndpoint + '/projects/' + projectId + '/activities/current/' + activity.id
        + '?socketId=' + this.syncService.getSocketId(),
        JSON.stringify({activity: activity}),
        environment.httpOptions)
      .toPromise()
      .then(response => response as Activity)
      .catch(this.handleError);
  }

  editOldActivity(projectId, activity): Promise<any> {
    return this.http
      .put(environment.apiEndpoint + '/projects/' + projectId + '/activities/old/' + activity.id ,
        JSON.stringify({activity: activity}),
        environment.httpOptions)
      .toPromise()
      .then(response => response as Activity)
      .catch(this.handleError);
  }

  getActivities(projectId , users, page: number = 0): Promise<Activity[]> {
    const httpParams = new HttpParams()
      .set('page', page.toString())
      .set('users', JSON.stringify(users));
    const optionsWithParams = {...environment.httpOptions, params: httpParams};
    return this.http
      .get(environment.apiEndpoint + '/projects/' + projectId + '/activities', optionsWithParams)
      .toPromise()
      .then(response => response as Activity[])
      .catch(this.handleError);
  }

  getCurrentActivities(projectId): Promise<Activity[]> {
    return this.http
      .get(environment.apiEndpoint + '/projects/' + projectId + '/activities/currentActivities', environment.httpOptions)
      .toPromise()
      .then(response => response as Activity[])
      .catch(this.handleError);
  }

  getStat(projectId, users, fromDate, toDate): Promise<any> {
    const httpParams = new HttpParams()
      .set('users', JSON.stringify(users))
      .set('from', JSON.stringify(fromDate))
      .set('to', JSON.stringify(toDate));
    const optionsWithParams = {...environment.httpOptions, params: httpParams};
    return this.http
      .get(environment.apiEndpoint + '/projects/' + projectId + '/stats/hours', optionsWithParams)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  delete(projectId, activityId): Promise<any> {
    return this.http
      .delete(environment.apiEndpoint + '/projects/' + projectId + '/activities/' + activityId , this.options)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error);
  }
}
