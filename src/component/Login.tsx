import React from "react";
import { useRecoilState } from "recoil";
import { loginUserState } from "../store/atom";
import { signIn } from "../services/login";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const User = await signIn(userInfo);      
      navigate("/notes");
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(User));
      const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
      if (!loggedUserJSON) {
        throw new Error();
      }
      JSON.parse(loggedUserJSON);
    } catch (error) {
      throw error;
    }
  };
  const handleClickRegister = () => {
    navigate("/signup");
  };

  return (
    <div>
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
              mt: 10,
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
                <Grid item xs={12} md={12} sx={{ mt: 3, textAlign: "center" }}>
                  <Button
                    variant="contained"
                    sx={{ height: 50 }}
                    onClick={handleClickRegister}
                  >
                    Create New Account
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default UserLogin;
