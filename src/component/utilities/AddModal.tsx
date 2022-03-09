/** @jsxImportSource @emotion/react */
import { Modal, Box, Typography } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { css } from "@mui/material/styles";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

type Props = {
  open: boolean;
  handleClose: () => void;
};

type FormValues = {
  word: string;
};

export const AddModal = (props: Props) => {
  const { open, handleClose } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    shouldUnregister: true,
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await addDoc(collection(db, "words"), {
      first: data.word.slice(0, 1),
      last:
        data.word.slice(-1) === "ー"
          ? data.word.slice(-2, -1)
          : data.word.slice(-1),
      length: data.word.length,
      word: data.word,
    });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography align="center">単語追加</Typography>
        <form action="submit" onSubmit={handleSubmit(onSubmit)} css={form}>
          <input
            type="text"
            {...register("word", {
              required: "入力必須です",
              pattern: {
                value: /^[あ-んゔー]+$/,
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
  margin-top: 16px;
  gap: 8px;
`;
