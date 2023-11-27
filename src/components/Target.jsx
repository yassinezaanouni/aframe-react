import "aframe";
import { Entity } from "aframe-react";
import React from "react";
function Target() {
  const handleClick = () => {
    console.log("click");
  };
  return (
    <Entity
      geometry={{ primitive: "box" }}
      material={{ color: "red" }}
      position={{ x: 0, y: 0, z: -5 }}
      events={{
        click: handleClick,
      }}
    />
  );
}

export default Target;
