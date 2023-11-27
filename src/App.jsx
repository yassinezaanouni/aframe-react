import "aframe";
import { Entity, Scene } from "aframe-react";
import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    console.log("click");
  };

  return (
    <Scene>
      <Entity
        primitive="a-box"
        color="red"
        position="0 0 -5"
        events={{
          click: handleClick,
        }}
      />
    </Scene>
  );
}

export default App;
