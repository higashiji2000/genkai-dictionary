import { useEffect, useState } from "react";
import { Table } from "../utilities/Table";
import { Typography } from "@mui/material";
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { db } from "../../firebase";

export type WordDoc = {
  first: string;
  last: string;
  length: number;
  word: string;
};

export type WordDocWithId = WordDoc & {
  id: string;
};

export const ViewTables = (props: { col: string[] }) => {
  //["あ","い","う","え","お"] みたいな配列
  const { col } = props;

  const [wordArray, setWordArray] = useState<WordDocWithId[][]>([]);

  useEffect(() => {
    const wordsRef = collection(db, "words");
    const q = query(wordsRef, where("first", "in", col));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("subscribe");
      const wordDataArrays: WordDocWithId[][] = [[], [], [], [], []];
      const wordDataArray: WordDocWithId[] = querySnapshot.docs.map((doc) => {
        const wordDoc = doc.data() as WordDoc;
        return { ...wordDoc, id: doc.id };
      });
      console.log(wordDataArray);
      wordDataArray.forEach((doc) => {
        switch (doc.first) {
          case col[0]:
            wordDataArrays[0].push(doc);
            break;
          case col[1]:
            wordDataArrays[1].push(doc);
            break;
          case col[2]:
            wordDataArrays[2].push(doc);
            break;
          case col[3]:
            wordDataArrays[3].push(doc);
            break;
          case col[4]:
            wordDataArrays[4].push(doc);
            break;
          default:
            console.log("default");
            break;
        }
      });
      //昇順にソートした新たな配列の配列を作成
      const orderedArray: WordDocWithId[][] = wordDataArrays.map((array) =>
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
          <Table wordArray={wordArray[index]} />
        </div>
      ))}
    </>
  );
};
