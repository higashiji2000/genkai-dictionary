import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

export const View = () => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: number
  ) => {
    setValue(value);
    console.log(value);
  };

  return (
    <Tabs
      value={value}
      variant="scrollable"
      onChange={handleChange}
      indicatorColor="secondary"
      textColor="secondary"
      sx={{ mt: "56px" }}
    >
      <Tab label="あ"></Tab>
      <Tab label="か"></Tab>
      <Tab label="さ"></Tab>
      <Tab label="た"></Tab>
      <Tab label="な"></Tab>
      <Tab label="は"></Tab>
    </Tabs>
  );
};
