import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Outlet, useOutletContext, Link } from "react-router-dom";

type ContextType = {
  col: string[];
};

export const View = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: number
  ) => {
    setValue(value);
  };

  const jpSyllabary = [
    ["あ", "い", "う", "え", "お"],
    ["か", "き", "く", "け", "こ"],
    ["さ", "し", "す", "せ", "そ"],
    ["た", "ち", "つ", "て", "と"],
    ["な", "に", "ぬ", "ね", "の"],
    ["は", "ひ", "ふ", "へ", "ほ"],
    ["ま", "み", "む", "め", "も"],
    ["や", "ゆ", "よ"],
    ["ら", "り", "る", "れ", "ろ"],
    ["わ", "を"],
  ];

  return (
    <>
      <Tabs
        value={value}
        variant="scrollable"
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
        sx={{ mt: "56px" }}
      >
        {jpSyllabary.map((col, index) => (
          <Tab label={col[0]} to={col[0]} component={Link} key={index}></Tab>
        ))}
      </Tabs>
      <Outlet context={{ col: jpSyllabary[value] }} />
    </>
  );
};

export const useCol = () => {
  return useOutletContext<ContextType>();
};
