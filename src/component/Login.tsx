import React, { useState } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { loginUserState } from "../store/atom";
import { signIn } from "../services/login";
import AddNewNote from "./NewNote";
import Notes from "./NotesList";
import { setToken, setUserId } from "../services/api";
import {
  Button,
  FormControl,
  Grid,
  Typography,
  TextField,
} from "@mui/material";

type Props = {};
const UserLogin: React.FC<Props> = () => {
  const [userInfo, setUserInfo] = useRecoilState(loginUserState);

  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const User = JSON.parse(loggedUserJSON);
      setToken(User.token);
      setUserId(User.id);
      setUser(User);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const User = await signIn(userInfo);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(User));
      setToken(User.token);
      setUserId(User.id);
      setUser(User);
    } catch (error) {
      throw error;
    }
  };

  
  return (
    <div>
      {user === null ? (
        <form onSubmit={handleLogin}>
          <Grid container>
            <Grid
              item
              md={12}
              sm={12}
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mt: 30,
              }}
            >
              <Typography
                variant="h3"
                sx={{ justifyContent: "left", alignItems: "left", mb: 2 }}
              >
                NoteBook
              </Typography>
              <FormControl
                sx={{
                  width: "50vw",
                  border: "1px solid gray",
                  p: 5,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h4">Sign In</Typography>

                <TextField
                  sx={{ mt: 3 }}
                  type="text"
                  placeholder="Username"
                  value={userInfo.username}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, username: e.target.value })
                  }
                />

                <TextField
                  sx={{ mt: 2 }}
                  type="password"
                  placeholder="Password"
                  value={userInfo.password}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                  }
                />
                <Grid container>
                  <Grid item xs={12} mt={2} sx={{ textAlign: "center" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ width: "100%", height: 50 }}
                    >
                      sign in
                    </Button>
                    <Typography variant="h6" sx={{ mt: 2 }} color="primary">
                      Forgotten password?
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    sx={{ mt: 3, textAlign: "center" }}
                  >
                    <Button variant="contained" sx={{ height: 50 }}>
                      Create New Account
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      ) : (
        <>
          <AddNewNote />
          <Notes />
        </>
      )}
    </div>
  );
};

export default UserLogin;
