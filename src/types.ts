export interface Note {
  id: string;
  title: string;
  content: string;
  date?: string;
}
export interface User {
  id: string;
  username: string;
  name: string;
  password: string;
}

export type NoteFormValue = Omit<Note, "id ">;
export type UserValue = Omit<User, "id">;
