import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { AddModal } from "./AddModal";

export const AddButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <AddIcon></AddIcon>
      </Fab>
      <AddModal open={open} handleClose={handleClose} />
    </>
  );
};
