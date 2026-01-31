import React from "react";
import Routes from "./Routes";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { BehavioralAuthProvider } from "./contexts/BehavioralAuthContext";

function App() {
  return (
    <DarkModeProvider>
      <BehavioralAuthProvider>
        <Routes />
      </BehavioralAuthProvider>
    </DarkModeProvider>
  );
}

export default App;
