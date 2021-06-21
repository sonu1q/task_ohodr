import React, { createContext, useState } from "react";

const DataContext = createContext();

const DataProvider = (props) => {
  const [viewData, setViewData] = useState([]);

  return (
    <>
      <DataContext.Provider value={[viewData, setViewData]}>
        {props.children}
      </DataContext.Provider>
    </>
  );
};

export { DataContext };
export { DataProvider };
