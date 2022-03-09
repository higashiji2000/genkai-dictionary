import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const rows = ["hoge", "hoge", "hoge"];

export const ViewTable = () => {
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
          {rows.map((row) => (
            <TableRow key={row} sx={{ "&:last-child td": { border: 0 } }}>
              <TableCell>{row}</TableCell>
              <TableCell align="right">{row}</TableCell>
              <TableCell align="right">delete</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
