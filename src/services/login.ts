interface SignInResponse {
  token: string;
  id: string;
}

export const signIn = async (credentials: {
  username: string;
  password: string;
}): Promise<SignInResponse> => {
  try {
    const response = await fetch(`http://localhost:3005/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Failed to signIn");
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};
