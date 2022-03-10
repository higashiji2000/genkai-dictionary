import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./component/home/Home";
import { Search } from "./component/search/Search";
import { Header } from "./component/utilities/Header";
import { View } from "./component/view/View";
import { AddButton } from "./component/utilities/AddButton";

const App = () => {
  return (
    <div className="App">
      <Header />
      <AddButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="view/:firstLetter" element={<View />}></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
