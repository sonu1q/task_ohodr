import React, { createContext, useState } from "react";

const PatientContext = createContext();

const PatientProvider = (props) => {
  const [patientData, setPatientData] = useState([]);

  return (
    <>
      <PatientContext.Provider value={[patientData, setPatientData]}>
        {props.children}
      </PatientContext.Provider>
    </>
  );
};

export { PatientContext };
export { PatientProvider };
