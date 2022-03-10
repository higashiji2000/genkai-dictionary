import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { WordDocWithId } from "./ViewTables";

type Props = {
  wordArray: WordDocWithId[] | undefined;
};

const handleDelete = (id: string) => {
  const result = window.confirm("本当に消しますか");
  if (result === true) {
    deleteDoc(doc(db, "words", id));
  }
};

export const ViewTable = (props: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell component={"th"}>word</TableCell>
            <TableCell component={"th"} align="center" sx={{ width: "80px" }}>
              length
            </TableCell>
            <TableCell component={"th"} align="center" sx={{ width: "50px" }}>
              delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.wordArray &&
            props.wordArray.map((word) => (
              <TableRow
                key={word.word}
                sx={{ "&:last-child td": { border: 0 } }}
              >
                <TableCell>{word.word}</TableCell>
                <TableCell align="center">{word.length}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleDelete(word.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
