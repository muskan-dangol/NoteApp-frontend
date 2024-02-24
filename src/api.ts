import { apiBaseUrl } from "./constant";

export const fetchData = async () => {
  const response = await fetch(apiBaseUrl);
  const data = await response.json();
  return data;
};

export const addNewNote = async (note: object) => {
  try {
    const response = await fetch(apiBaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      throw new Error("Failed to add a new note");
    }
    return response.json();
  } catch (error) {
    console.error("Error adding a new note:", error);
    throw error; // Rethrow the error to be caught by the calling code
  }
};

export const deleteNote = async (_id: string) => {
  const response = await fetch(`http://localhost:3005/api/notes/${_id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
  return response.json();
};

export const updateNote = async (
  _id: string,
  updatedNote: { content: string; title: string }
) => {
  try {
    const response = await fetch(`http://localhost:3005/api/notes/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedNote),
    });

    if (!response.ok) {
      throw new Error("Failed to update the note");
    }

    return response.json();
  } catch (error) {
    console.error("Error updating the note:", error);
    throw error;
  }
};
