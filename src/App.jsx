import "aframe";
import { Entity, Scene } from "aframe-react";
import "babel-polyfill";
import { useEffect, useState } from "react";
import "./App.css";
import Target from "./components/Target";

const MIN_DISTANCE_BETWEEN_TARGETS = 2.0; // Adjust as needed
const COLORS = ["red", "green"];

const checkCollision = (targetA, targetB) => {
  const distance = Math.sqrt(
    Math.pow(targetA.position.x - targetB.position.x, 2) +
      Math.pow(targetA.position.y - targetB.position.y, 2) +
      Math.pow(targetA.position.z - targetB.position.z, 2)
  );

  return distance < MIN_DISTANCE_BETWEEN_TARGETS;
};

function App() {
  const NUMBER_OF_TARGETS = 20;
  const [remainingLives, setRemainingLives] = useState(5);
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    generateTargets();
  }, []);

  useEffect(() => {
    if (remainingLives === 0) {
      alert("Game over!");
      generateTargets();
      setRemainingLives(5);
    }
  }, [remainingLives]);

  const generateTargets = () => {
    const _targets = [];
    for (let i = 0; i < NUMBER_OF_TARGETS; i++) {
      const newTarget = {
        id: i,
        position: {
          x: Math.random() * 10 - 5,
          y: Math.random() * 10 - 5,
          z: Math.random() * 10 - 5,
        },
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };

      // Check for collisions with existing targets
      let collision = false;
      for (const existingTarget of _targets) {
        if (checkCollision(newTarget, existingTarget)) {
          collision = true;
          break;
        }
      }

      // If collision detected, generate a new position for the target
      if (collision) {
        i--; // Try generating the target again
      } else {
        _targets.push(newTarget);
      }
    }
    setTargets(_targets);
  };

  const onTargetClick = (target) => {
    if (target.color === "red") {
      if (remainingLives >= 1) setRemainingLives((prev) => prev - 1);
    } else if (target.color === "green") {
      setTargets((prev) => prev.filter((t) => t.id !== target.id));
    }
  };

  return (
    <Scene>
      <a-assets>
        <img id="bg" src="/assets/bg.jpg" alt="sky" />
      </a-assets>
      <Entity primitive="a-camera">
        <Entity
          primitive="a-cursor"
          cursor={{ fuse: false }}
          geometry={{
            primitive: "ring",
            radiusInner: 0.01,
            radiusOuter: 0.02,
          }}
          material={{ color: "white", shader: "flat" }}
          position="0 0 -1"
        />
        <Entity
          text={{
            value: `Lives: ${remainingLives}`,
            align: "center",
            width: 2,
          }}
          position={{ x: 0, y: 0.1, z: -1 }}
        />
      </Entity>

      {targets.map((target) => (
        <Target
          key={target.id}
          target={target}
          onClick={(target) => onTargetClick(target)}
        />
      ))}
    </Scene>
  );
}

export default App;
