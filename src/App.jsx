import React from "react";
import { CartContextProvider } from "./contexts";
import { Dashboard } from "./pages";


const App = () => {
  return (
    <CartContextProvider>
      <Dashboard />
    </CartContextProvider>
  );
};

export default App;
