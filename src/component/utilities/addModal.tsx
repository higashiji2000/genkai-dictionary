import { Modal, Box } from "@mui/material";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  bgcolor: "background.paper",
  p: 4,
  width: "fit-content",
};

export const AddModal = (props: Props) => {
  const { open, handleClose } = props;
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>hello</Box>
    </Modal>
  );
};
