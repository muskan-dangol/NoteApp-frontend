import React from "react";
import { useQuery } from "react-query";
import { fetchData, deleteNote } from "../api";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Notes: React.FC = () => {
  const { data, error, isLoading, refetch } = useQuery("myData", fetchData, {
    enabled: true,
  });

  const handleDeleteNote = async (_id: string) => {
    try {
      await deleteNote(_id);
      console.log("deleted: ", _id);
      refetch();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {}</div>;
  }

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      <Grid item xs={10} md={8}>
        <Typography variant="h4" >Your notes:</Typography>
      </Grid>
      {data.map((note: any, index: number) => (
        <Grid item key={index} xs={10} md={8}>
          <Accordion sx={{ width: "100%" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6" sx={{fontSize: '1.3rem'}} >{note.title}</Typography>
            </AccordionSummary>
            <Divider />
            <AccordionDetails>
              <Typography>Created on: {note.date}</Typography>
              <Divider
                sx={{ width: 174, mt: 0, mb: 2, borderBlockColor: "#0a0a00" }}
              />
              <Typography sx={{fontSize: '1.1rem'}}>{note.content}</Typography>
            </AccordionDetails>
            <AccordionActions sx={{mb: 1}}>
              <Button variant="contained">Edit</Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#bb2124", "&:hover": {
                  backgroundColor: "#8f0000",
                }, }}
                onClick={() => handleDeleteNote(note._id)}
              >
                Delete
              </Button>
            </AccordionActions>
          </Accordion>
        </Grid>
      ))}
    </Grid>
  );
};
export default Notes;