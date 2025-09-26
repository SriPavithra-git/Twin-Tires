import React, { useState } from "react";
import TwinTiresLanding from "./TwinTiresLanding";
import LogoAnimation from "./components/LogoAnimation";

function App() {
  const [showLanding, setShowLanding] = useState(false);

  return (
    <>
      {!showLanding ? (
        <LogoAnimation onFinish={() => setShowLanding(true)} />
      ) : (
        <TwinTiresLanding />
      )}
    </>
  );
}

export default App;
