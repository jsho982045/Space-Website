// src/Starfield.js

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function Starfield() {
  const starRef = useRef();

  // Generate random star positions
  const starPositions = Array.from({ length: 1000 }, () => [
    (Math.random() - 0.5) * 2000,
    (Math.random() - 0.5) * 2000,
    (Math.random() - 0.5) * 2000,
  ]).flat();

  return (
    <points ref={starRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={starPositions.length / 3}
          array={new Float32Array(starPositions)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="white"
        size={1}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default Starfield;
