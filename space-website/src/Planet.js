// src/Planet.js

import React from 'react';
import { MeshWobbleMaterial } from '@react-three/drei';

function Planet({ position }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshWobbleMaterial
        attach="material"
        color="blue"
        factor={0.5} // Strength of the wobble effect
        speed={1}    // Speed of the wobble effect
      />
    </mesh>
  );
}

export default Planet;
