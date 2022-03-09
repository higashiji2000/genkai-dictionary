import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./component/home/Home";
import { Search } from "./component/search/Search";
import { Header } from "./component/utilities/Header";
import { View } from "./component/view/View";
import { AddButton } from "./component/utilities/AddButton";
import { ViewTables } from "./component/view/ViewTables";

const App = () => {
  return (
    <div className="App">
      <Header />
      <AddButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="view" element={<View />}>
          <Route path=":firstLetter" element={<ViewTables />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
