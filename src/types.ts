export interface Note {
  id: string;
  title: string;
  content: string;
  date?: string;
}

export type NoteFormValue = Omit<Note, "id ">;
