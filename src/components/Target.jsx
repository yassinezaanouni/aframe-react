import "aframe";
import { Entity } from "aframe-react";
import React from "react";

function Target({ target, onClick }) {
  const handleClick = () => {
    onClick(target);
  };
  return (
    <Entity
      width="0.5"
      height="0.5"
      depth="0.5"
      primitive="a-box"
      color={target.color}
      position={target.position}
      events={{
        click: handleClick,
      }}
    />
  );
}

export default Target;
