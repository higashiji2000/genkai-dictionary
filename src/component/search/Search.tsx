import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { WordDoc, WordDocWithId } from "../view/ViewTables";
import { Table } from "../utilities/Table";

type Query = {
  first?: string;
  isPlus: boolean;
  last?: string;
  wordCount: number;
};

export const Search = () => {
  const [wordArray, setWordArray] = useState<WordDocWithId[]>([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Query>({ criteriaMode: "all" });

  const wordsRef = collection(db, "words");

  const onSubmit = async (data: Query) => {
    const queryOptions = [];
    if (data.first) {
      queryOptions.push(where("first", "==", data.first));
    }
    if (data.last) {
      queryOptions.push(where("last", "==", data.last));
    }
    if (data.wordCount) {
      data.isPlus
        ? queryOptions.push(where("length", ">=", data.wordCount))
        : queryOptions.push(where("length", "==", data.wordCount));
    }
    const q = query(wordsRef, ...queryOptions);

    const querySnapshot = await getDocs(q);
    const wordDataArray: WordDocWithId[] = querySnapshot.docs.map((doc) => {
      const wordDoc = doc.data() as WordDoc;
      return { ...wordDoc, id: doc.id };
    });
    setWordArray(wordDataArray);
  };

  return (
    <Container sx={{ pb: 10 }}>
      <Typography variant="h2" align="center" sx={{ fontSize: "2rem", p: 3 }}>
        Search
      </Typography>
      <Typography align="center" sx={{ p: 1 }}>
        特に指定がない場合は空欄
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box>
          <Controller
            control={control}
            name="first"
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="最初"
                sx={{ width: "100%" }}
              />
            )}
            rules={{
              maxLength: {
                value: 1,
                message: "一文字で入力してください。",
              },
              pattern: {
                value: /^[あ-んゔー]+$/,
                message: "ひらがなのみ入力可能です",
              },
            }}
          />
          <ErrorMessage
            errors={errors}
            name="first"
            render={({ messages }) =>
              messages
                ? Object.entries(messages).map(([type, message]) => (
                    <Typography
                      color="secondary"
                      key={type}
                      sx={{ fontSize: "12px" }}
                    >
                      {message}
                    </Typography>
                  ))
                : null
            }
          />
        </Box>
        <Box>
          <Controller
            control={control}
            name="last"
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="最後"
                sx={{ width: "100%" }}
              />
            )}
            rules={{
              maxLength: {
                value: 1,
                message: "一文字で入力してください。",
              },
              pattern: {
                value: /^[あ-んゔー]+$/,
                message: "ひらがなのみ入力可能です",
              },
            }}
          />
          <ErrorMessage
            errors={errors}
            name="last"
            render={({ messages }) =>
              messages
                ? Object.entries(messages).map(([type, message]) => (
                    <Typography
                      color="secondary"
                      key={type}
                      sx={{ fontSize: "12px" }}
                    >
                      {message}
                    </Typography>
                  ))
                : null
            }
          />
        </Box>
        <Box sx={{ display: "flex" }}>
          <FormControl variant="standard" sx={{ flex: 1 }}>
            <InputLabel id="wordCountLabel">文字数</InputLabel>
            <Controller
              control={control}
              name="wordCount"
              defaultValue={0}
              render={({ field }) => (
                <Select
                  {...field}
                  label="文字数"
                  id="wordCount"
                  labelId="wordCountLabel"
                >
                  <MenuItem value={0}>指定なし</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                </Select>
              )}
            />
          </FormControl>
          <Controller
            control={control}
            name="isPlus"
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={<Checkbox />}
                label="plus"
                labelPlacement="bottom"
                value="plus"
              />
            )}
          />
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="inherit"
          sx={{ mt: 2, mb: 4 }}
        >
          Search
        </Button>
      </Box>
      <Typography variant="h3" align="center" sx={{ fontSize: "1.5rem", p: 3 }}>
        Result
      </Typography>
      {wordArray[0] && <Table wordArray={wordArray} />}
    </Container>
  );
};
