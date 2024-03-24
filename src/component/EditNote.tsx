import React, { useState } from "react";
import { Button, Modal, Grid, Box, Typography, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { updateNote } from "../services/api";
import { AutoTextarea } from "./TextArea";
interface EditNoteProps {
  open: boolean;
  onClose: () => void;
  _id: string;
  currentContent: string;
  currentTitle: string;
  onNoteUpdated: () => void;
}

const EditNote: React.FC<EditNoteProps> = ({
  open,
  onClose,
  _id,
  currentContent,
  currentTitle,
  onNoteUpdated,
}) => {
  const [newContent, setNewContent] = useState(currentContent);
  const [newTitle, setNewTitle] = useState(currentTitle);

  const handleUpdateNote = async () => {
    try {
      await updateNote(_id, { content: newContent, title: newTitle });
      onNoteUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Grid container>
        <Box sx={{ ...style, width: "60%" }}>
          <Grid container>
            <Grid item xs={8} sm={10} sx={{ textAlign: "left" }}>
              <Typography variant="h6">Edit note</Typography>
            </Grid>
            <Grid item xs={4} sm={2} sx={{ textAlign: "right" }}>
              <CloseIcon sx={{ mb: 3, fontSize: 30 }} onClick={onClose} />
            </Grid>
            <Grid item xs={4} sm={8}>
              <TextField
                label="Edit Content"
                fullWidth
                rows={1}
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                sx={{ mb: 2, mt: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <AutoTextarea
                name="newContent"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={12} mt={2} sx={{ textAlign: "right" }}>
              <Button onClick={onClose}>Cancel</Button>
              <Button
                onClick={handleUpdateNote}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Modal>
  );
};

export default EditNote;

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
