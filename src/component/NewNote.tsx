import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AutoTextarea } from "./TextArea";
import { addNewNote } from "../services/api";
import { noteDataState } from "../store/atom";
import { useRecoilState } from "recoil";
import { fetchData } from "../services/api";
import { useQuery } from "react-query";
import { getUserId } from "../services/api";

type Props = {};
const AddNewNote: React.FC<Props> = () => {
  const { refetch } = useQuery("myData", fetchData, {
    enabled: true,
  });
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [note, setNote] = useRecoilState(noteDataState);

  const onModalCloseRequest = (): void => {
    setIsModalOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const noteWithUserId = {
        ...note,
        user: [getUserId()],
      };
      await addNewNote(noteWithUserId);

      setIsModalOpen(false);
      refetch();
      console.log(noteWithUserId);
    } catch (error: any) {
      console.log(error.stack);
      console.error("Error adding a new note:", error);
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("loggedNoteappUser");
    navigate("/");
  };

  return (
    <Grid container mt={5} justifyContent="center" alignItems="center">
      <Grid item xs={10} md={8} sx={{ textAlign: "right" }}>
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="contained"
          sx={{ mb: 3, mr: 1 }}
        >
          Add Note
        </Button>
        <Button onClick={handleLogOut} variant="contained" sx={{ mb: 3 }}>
          log out
        </Button>
        <Modal open={isModalOpen} onClose={onModalCloseRequest}>
          <Grid container>
            <Box sx={{ ...style, width: "60%" }}>
              <form onSubmit={(e) => handleSubmit(e)}>
                <Grid container>
                  <Grid item xs={8} sm={10} sx={{ textAlign: "left" }}>
                    <Typography variant="h6">Add Note</Typography>
                  </Grid>
                  <Grid item xs={4} sm={2} sx={{ textAlign: "right" }}>
                    <CloseIcon
                      sx={{ mb: 3, fontSize: 30 }}
                      onClick={() => setIsModalOpen(false)}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={6} md={6}>
                  <TextField
                    label="Title"
                    fullWidth
                    name="title"
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={12} mt={2}>
                  <AutoTextarea
                    value={note.content}
                    name="content"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={12} mt={2} sx={{ textAlign: "right" }}>
                  <Button
                    variant="contained"
                    onClick={() => setIsModalOpen(false)}
                    sx={{
                      mt: 1,
                      backgroundColor: "#bb2124",
                      "&:hover": {
                        backgroundColor: "#8f0000",
                      },
                    }}
                  >
                    cancel
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ ml: 1.5, mt: 1 }}
                  >
                    Add
                  </Button>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Modal>
      </Grid>
    </Grid>
  );
};

export default AddNewNote;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
