import "aframe";
import { Entity, Scene } from "aframe-react";
import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count + 1);
    console.log("click");
  };

  return (
    <>
      <h1
        style={{
          color: "red",
          fontSize: "50px",
        }}
      >
        {count}
      </h1>
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
    </>
  );
}

export default App;
