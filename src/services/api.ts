import { apiBaseUrl } from "../constant";

let token: null | string = null;
export let userId: null | string = null;

export const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};
export const setUserId = (newUserId: string) => {
  userId = newUserId;
};
export const fetchData = async () => {
  const response = await fetch(apiBaseUrl);
  const data = await response.json();
  return data;
};

export const addNewNote = async (note: any) => {
  try {
    if (!token) {
      throw new Error("Token is not available");
    }
    if (!userId) {
      throw new Error("UserId is not available");
    }
    const response = await fetch(apiBaseUrl, {
      method: "POST",
      headers: {
        Authorization: token,
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
    throw error;
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
