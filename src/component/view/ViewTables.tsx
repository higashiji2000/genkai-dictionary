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
  //["あ","い","う","え","お"] みたいな配列
  const [wordArray, setWordArray] = useState<WordData[][]>([]);

  useEffect(() => {
    const wordsRef = collection(db, "words");
    const q = query(wordsRef, where("first", "in", col));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("subscribe");
      const wordDataArrays: WordData[][] = [[], [], [], [], []];
      querySnapshot.forEach((doc) => {
        const wordData = doc.data() as WordData;
        switch (wordData.first) {
          case col[0]:
            wordDataArrays[0].push(wordData);
            break;
          case col[1]:
            wordDataArrays[1].push(wordData);
            break;
          case col[2]:
            wordDataArrays[2].push(wordData);
            break;
          case col[3]:
            wordDataArrays[3].push(wordData);
            break;
          case col[4]:
            wordDataArrays[4].push(wordData);
            break;
          default:
            console.log("default");
            break;
        }
      });
      //昇順にソートした新たな配列の配列を作成
      const orderedArray: WordData[][] = wordDataArrays.map((array) =>
        array.sort((a, b) => a.length - b.length)
      );
      console.log(orderedArray);
      setWordArray(orderedArray);
    });
    return () => {
      unsubscribe();
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
