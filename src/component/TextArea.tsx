import React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { styled } from "@mui/system";

export const AutoTextarea = ({
  name,
  onChange,
  value,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <StyledTextarea
      aria-label="minimum height"
      minRows={3}
      placeholder="Description"
      name={name}
      onChange={onChange}
      value={value}
      required
    />
  );
};

const blue = {
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};
const grey = {
  50: "#F3F6F9",
  300: "#C7D0DD",
  900: "#0A0A0B",
};

const StyledTextarea = styled(TextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 5px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };

    &:hover {
      border-color: black;
    }

    &:focus {
      border-color: ${blue[600]};
      box-shadow: 0 0 0 1px ${
        theme.palette.mode === "dark" ? blue[900] : blue[600]
      };
    }

    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);
