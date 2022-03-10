import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { WordDocWithId } from "./ViewTables";

type Props = {
  wordArray: WordDocWithId[] | undefined;
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
                <TableCell align="center">delete</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
