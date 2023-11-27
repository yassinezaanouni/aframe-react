import "aframe";
import { Entity, Scene } from "aframe-react";
import "babel-polyfill";
import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    console.log("Clicked!");
  };

  const handleCollide = () => {
    console.log("Collided!");
  };

  return (
    <Scene>
      <Entity
        primitive="a-box"
        color="red"
        position="0 0 -5"
        events={{
          click: handleClick,
          collide: [handleCollide],
        }}
      />
      {/* add camera */}
      <Entity primitive="a-camera">
        <Entity
          primitive="a-cursor"
          cursor={{ fuse: false }}
          geometry={{ primitive: "ring", radiusInner: 0.01, radiusOuter: 0.02 }}
          material={{ color: "white", shader: "flat" }}
          position="0 0 -1"
        />
      </Entity>
      <Entity
        text={{
          value: `welcoem ${count}`,
          align: "center",
          color: "red",
          width: "2.5",
          height: "2.5",
        }}
        position="-1 0.5 -5"
      />
    </Scene>
  );
}

export default App;
