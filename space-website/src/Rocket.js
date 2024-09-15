// src/Rocket.js

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

function Rocket() {
  const rocketRef = useRef();
  const [position, setPosition] = useState([0, 0, 0]);
  const speed = 0.1;

  useEffect(() => {
    const handleKeyDown = (event) => {
      setPosition((prev) => {
        const [x, y, z] = prev;
        switch (event.key) {
          case 'ArrowUp':
            return [x, y + speed, z];
          case 'ArrowDown':
            return [x, y - speed, z];
          case 'ArrowLeft':
            return [x - speed, y, z];
          case 'ArrowRight':
            return [x + speed, y, z];
          default:
            return prev;
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
}, []);

  
  useFrame(() => {
    if(rocketRef.current){
        rocketRef.current.position.set(...position);
    }
  });

  return (
    <mesh ref={rocketRef}>
      <coneGeometry args={[0.2, 0.5, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

export default Rocket;
