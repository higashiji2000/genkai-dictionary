import { Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useOutletContext, Link, useParams } from "react-router-dom";

type ContextType = {
  col: string[];
};

export const View = () => {
  const currentUrl = useParams();
  const [value, setValue] = useState<string>(currentUrl.firstLetter ?? "あ");

  useEffect(() => {
    setValue(currentUrl.firstLetter ?? "あ");
  }, [currentUrl]);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string
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

  // urlの末尾と一文字目が合う配列を絞り込み
  const selectedCol = jpSyllabary.find(
    (col) => col[0] === currentUrl.firstLetter
  );

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
          <Tab
            label={col[0]}
            to={col[0]}
            value={col[0]}
            component={Link}
            key={index}
          ></Tab>
        ))}
      </Tabs>
      <Outlet context={{ col: selectedCol }} />
    </>
  );
};

export const useCol = () => {
  return useOutletContext<ContextType>();
};
