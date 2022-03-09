import { useCol } from "./View";

export const ViewTables = () => {
  const { col } = useCol();

  return <div>{col[0]}</div>;
};
