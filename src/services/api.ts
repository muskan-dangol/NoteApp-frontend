import { apiBaseUrl } from "../constant";

export const getUserId = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
  if (!loggedUserJSON) {
    throw new Error("User is not logged in");
  }
  const user = JSON.parse(loggedUserJSON);
  return user.id;
};

export const getToken = () => {
  const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
  if (!loggedUserJSON) {
    throw new Error("User is not logged in");
  }
  const user = JSON.parse(loggedUserJSON);
  return `Bearer ${user.token}`;
};


export const fetchData = async () => {
  try {
    const token = getToken();
    const response = await fetch(apiBaseUrl, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch notes error:", error);
  }
};

export const addNewNote = async (note: any) => {
  const userId = getUserId();
  const token = getToken();
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
