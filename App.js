import React, { useContext } from "react";
import Routes from "./routes/routes";
import Login from "./pages/authentication/login";
import Forget from "./pages/authentication/Forget";

function App() {
  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
