import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { WordData } from "./ViewTables";

const rows = ["hoge", "hog", "ho"];

type Props = {
  wordArray: WordData[] | undefined;
};

export const ViewTable = (props: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell component={"th"}>word</TableCell>
            <TableCell component={"th"} align="right">
              length
            </TableCell>
            <TableCell component={"th"} align="right">
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
                <TableCell align="right">{word.length}</TableCell>
                <TableCell align="right">delete</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
