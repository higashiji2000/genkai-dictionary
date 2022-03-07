import { useEffect } from "react";
import "./App.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const App = () => {
  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "words"));
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
    })();
  }, []);
  return <div className="App"></div>;
};

export default App;
