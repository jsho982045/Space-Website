import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'; 
import Starfield from './Starfield';
import Planet from './Planet';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        {/* Set the background color to black */}
        <color attach="background" args={['black']} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Starfield */}
        <Starfield />

        {/* Planet */}
        <Planet position={[5, 0, 0]} />

        {/* Controls */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
