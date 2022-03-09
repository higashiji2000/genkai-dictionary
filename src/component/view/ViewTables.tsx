import { useEffect } from "react";
import { useCol } from "./View";
import { ViewTable } from "./ViewTable";
import { Typography } from "@mui/material";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { db } from "../../firebase";

export const ViewTables = () => {
  const { col } = useCol();

  useEffect(() => {
    const wordsRef = collection(db, "words");
    const q = query(wordsRef, where("first", "in", col));
    console.log(q);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    });
    return () => {
      unsubscribe();
      //恐ろしいので残しています
      console.log("unsub");
    };
  }, [col]);

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
