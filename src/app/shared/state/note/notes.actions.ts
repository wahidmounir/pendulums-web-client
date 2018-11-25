import { Injectable }         from '@angular/core';
import { Notes }           from './notes.model';
import { Note }            from './note.model';
import { ActionWithPayload }  from '../action-with-payload';

@Injectable()
export class NotesActions {
  static LOAD_NOTES = 'LOAD_NOTES';
  static LOAD_DB_NOTES = 'LOAD_DB_NOTES';
  static ADD_NOTE = 'ADD_NOTE';
  static REMOVE_NOTE = 'REMOVE_NOTE';

  loadNotes(notes: Note[]):  ActionWithPayload<Note[]> {
    return {
      type: NotesActions.LOAD_NOTES,
      payload: notes
    };
  }

  loadDbNotes(notes: Notes): ActionWithPayload<Notes> {
    return {
      type: NotesActions.LOAD_DB_NOTES,
      payload: notes
    };
  }

  addNote(note: Note): ActionWithPayload<Note> {
    return {
      type: NotesActions.ADD_NOTE,
      payload: note
    };
  }

  removeNote(note: string): ActionWithPayload<string> {
    return {
      type: NotesActions.REMOVE_NOTE,
      payload: note
    };
  }
}