import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'; 
import Starfield from './Starfield';
import Planet from './Planet';
import Rocket from './Rocket';

function App() {
  const [landed, setLanded] = useState(false);

  const handleLand = () => {
    setLanded(true);
  };

  const planetPosition = [5, 0, 0];

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas>
        <color attach="background" args={['black']} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* Starfield */}
        <Starfield />

        {/* Planet */}
        <Planet position={planetPosition} />

        <Rocket planetPosition={planetPosition} onLand={handleLand} />

        {/* Controls */}
        <OrbitControls />
      </Canvas>
      {landed && (
        <div style={styles.overlay}>
          <h1>Welcome to My Portfolio</h1>
          <p>This is where projects will be showcased</p>
          <button onClick={() => setLanded(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  overlay: {
    position: 'absolute', 
    top: 0, 
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    display: 'fles',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
};

export default App;
