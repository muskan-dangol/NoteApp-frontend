import React from "react";
import { useRecoilState } from "recoil";
import { SignInUserState } from "../store/atom";
import { signUp } from "../services/login";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  Grid,
  Typography,
  TextField,
} from "@mui/material";

type Props = {};
const UserSignUp: React.FC<Props> = () => {
  const [newUser, setNewUser] = useRecoilState(SignInUserState);

  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signUp(newUser);
      navigate("/");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>
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
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
              <TextField
                sx={{ mt: 3 }}
                type="text"
                placeholder="name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <TextField
                sx={{ mt: 2 }}
                type="password"
                placeholder="Password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
              <Grid container>
                <Grid item xs={12} mt={2} sx={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: "100%", height: 50 }}
                  >
                    sign up
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

export default UserSignUp;
