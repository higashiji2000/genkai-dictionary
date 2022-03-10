import { useState, useEffect } from "react";
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
import { collection, query, where, onSnapshot } from "firebase/firestore";
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
  const [formData, setFormData] = useState<Query>();
  const [wordArray, setWordArray] = useState<WordDocWithId[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Query>({ criteriaMode: "all" });

  useEffect(() => {
    // 初回は早期return
    if (!formData) return;

    const wordsRef = collection(db, "words");
    // formの内容からクエリを作成
    const queryOptions = [];
    if (formData?.first) {
      queryOptions.push(where("first", "==", formData.first));
    }
    if (formData?.last) {
      queryOptions.push(where("last", "==", formData?.last));
    }
    if (formData?.wordCount) {
      formData?.isPlus
        ? queryOptions.push(where("length", ">=", formData?.wordCount))
        : queryOptions.push(where("length", "==", formData?.wordCount));
    }
    const q = query(wordsRef, ...queryOptions);
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      const wordDataArray: WordDocWithId[] = querySnapshot.docs.map((doc) => {
        const wordDoc = doc.data() as WordDoc;
        return { ...wordDoc, id: doc.id };
      });
      const SortedArray = wordDataArray
        .slice()
        .sort((a, b) => a.length - b.length);
      setWordArray(SortedArray);
    });
    return unSubscribe;
  }, [formData]);

  const onSubmit = (data: Query) => {
    setFormData(data);
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
          sx={{
            mt: 2,
            mb: 4,
            color: "primary.main",
            bgcolor: "black",
            "&:hover": { bgcolor: "black" },
          }}
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
