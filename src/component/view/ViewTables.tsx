import { useCol } from "./View";
import { ViewTable } from "./ViewTable";
import { Typography } from "@mui/material";

export const ViewTables = () => {
  const { col } = useCol();

  return (
    <>
      {col.map((letter, index) => (
        <>
          <Typography
            variant="h2"
            sx={{ fontSize: "1rem", ml: 2, mt: 2, fontWeight: 700 }}
          >
            {letter}
          </Typography>
          <ViewTable key={index}></ViewTable>
        </>
      ))}
    </>
  );
};
