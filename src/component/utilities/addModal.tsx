/** @jsxImportSource @emotion/react */
import { Modal, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { css } from "@mui/material/styles";

type Props = {
  open: boolean;
  handleClose: () => void;
};

export const AddModal = (props: Props) => {
  const { open, handleClose } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldUnregister: true, reValidateMode: "onSubmit" });
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography align="center">単語追加</Typography>
        <form
          action="submit"
          onSubmit={handleSubmit(
            (data) => {
              console.log(data);
            },
            (data) => {
              console.log("error" + data);
            }
          )}
          css={form}
        >
          <input
            type="text"
            {...register("word", {
              required: "入力必須です",
              pattern: {
                value: /^[あ-ん]+$/,
                message: "ひらがなのみ入力可能です",
              },
            })}
          />
          <button>追加！！</button>
        </form>
        {errors.word && (
          <Typography sx={{ color: "warning.main" }}>
            {errors.word.message}
          </Typography>
        )}
      </Box>
    </Modal>
  );
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

const form = css`
  display: flex;
`;
