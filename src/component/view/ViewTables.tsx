import { useEffect, useState } from "react";
import { useCol } from "./View";
import { ViewTable } from "./ViewTable";
import { Typography } from "@mui/material";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { db } from "../../firebase";

export type WordData = {
  first: string;
  last: string;
  length: number;
  word: string;
};

export const ViewTables = () => {
  const { col } = useCol();
  const [wordArray, setWordArray] = useState<WordData[][]>([
    [],
    [],
    [],
    [],
    [],
  ]);

  useEffect(() => {
    const wordsRef = collection(db, "words");
    const q = query(wordsRef, where("first", "in", col));

    const orderedArray: WordData[][] = [[], [], [], [], []];

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const wordData = doc.data() as WordData;
        switch (wordData.first) {
          case col[0]:
            orderedArray[0].push(wordData);
            break;
          case col[1]:
            orderedArray[1].push(wordData);
            break;
          case col[2]:
            orderedArray[2].push(wordData);
            break;
          case col[3]:
            orderedArray[3].push(wordData);
            break;
          case col[4]:
            orderedArray[4].push(wordData);
            break;
          default:
            console.log("default");
            break;
        }
      });
      console.log(orderedArray);
      setWordArray(orderedArray);
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
        <div key={index}>
          <Typography
            variant="h2"
            sx={{ fontSize: "1rem", ml: 2, mt: 2, fontWeight: 700 }}
          >
            {letter}
          </Typography>
          <ViewTable wordArray={wordArray[index]}></ViewTable>
        </div>
      ))}
    </>
  );
};
