import React, { useEffect, useState } from "react";
import AddReceipe from "../../../../../components/Receipes/AddReceipe";

const RecipesTab = () => {
  const [pageLimit, setPageLimit] = useState({
    page: 1,
    limit: 999,
  });
  return (
    <>
      <AddReceipe />
    </>
  );
};

export default RecipesTab;
