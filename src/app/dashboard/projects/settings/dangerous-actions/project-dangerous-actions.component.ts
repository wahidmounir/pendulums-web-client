import { Component, Input }           from '@angular/core';
import { Project }                    from '../../../../shared/state/project/project.model';
import { ProjectService }             from '../../../shared/projects.service';
import { AppState }                   from '../../../../shared/state/appState';
import { Store }                      from '@ngrx/store';
import { ProjectsActions }            from '../../../../shared/state/project/projects.actions';
import { ErrorService }               from '../../../../core/error/error.service';
import { ModalService }               from '../../../../core/modal/modal.service';
import { CurrentActivityActions }     from '../../../../shared/state/current-activity/current-activity.actions';

@Component({
  selector: 'dangerous-actions',
  templateUrl: './project-dangerous-actions.component.html',
  styleUrls: ['./project-dangerous-actions.component.sass']
})

export class DangerousActionsComponent {
  @Input() project: Project;
  @Input() readOnly: boolean;
  @Input() isOwner: boolean;
  @Input() isAdmin: boolean;
  @Input() projectIdInCurrentActivity: string;
  projectNameInput: String;
  deleteConfirmation = false;
  deleteButtonDisabled = false;

  constructor(
    private projectService: ProjectService,
    private store: Store<AppState>,
    private projectsAction: ProjectsActions,
    private errorService: ErrorService,
    private modalService: ModalService,
    private currentActivityActions: CurrentActivityActions) {
  }

  confirmToDelete() {
    if (this.projectNameInput === this.project.name) {
      this.deleteConfirmation = true;
    } else {
      this.showError('Project name mismatch.');
    }
  }

  cancelDelete() {
    this.deleteConfirmation = false;
  }

  confirmFinalDelete() {
    if (this.projectNameInput === this.project.name) {
      if (!this.deleteButtonDisabled) {
        this.deleteButtonDisabled = true;
        if (this.projectNameInput.valueOf() === this.project.name.valueOf()) {
          this.projectService.delete(this.project.id)
            .then(response => {
              this.store.dispatch(this.projectsAction.removeProject(this.project.id));
              this.showError('The project was deleted successfully');

              // if we have current activity on deleted project we should clear it
              if (this.project.id === this.projectIdInCurrentActivity) {
                this.store.dispatch(this.currentActivityActions.clearCurrentActivity());
              }

              this.deleteButtonDisabled = false;
              this.modalService.close();
            })
            .catch(error => {
              this.deleteButtonDisabled = false;
              this.showError('Server communication error');
            });
        }
      }
    } else {
      this.showError('Project name mismatch.');
    }
  }

  showError(error) {
    this.errorService.show({
      input: error
    });
  }
}

