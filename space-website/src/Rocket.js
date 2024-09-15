// src/Rocket.js

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Rocket({ planetPosition, onLand }) {
  const rocketRef = useRef();
  const flameRef = useRef();
  const hasLanded = useRef(false);
  const [position, setPosition] = useState([0, 0, 0]);
  const [isMoving, setIsMoving] = useState(false); // Track if the rocket is moving
  const speed = 0.1;

  useEffect(() => {
    const handleKeyDown = (event) => {
      setPosition((prev) => {
        const [x, y, z] = prev;

        if (!hasLanded.current) {
          let moved = false;
          let newPosition = prev;

          switch (event.key) {
            case 'ArrowUp':
              newPosition = [x, y + speed, z];
              moved = true;
              break;
            case 'ArrowDown':
              newPosition = [x, y - speed, z];
              moved = true;
              break;
            case 'ArrowLeft':
              newPosition = [x - speed, y, z];
              moved = true;
              break;
            case 'ArrowRight':
              newPosition = [x + speed, y, z];
              moved = true;
              break;
            case 'w':
              newPosition = [x, y, z - speed];
              moved = true;
              break;
            case 's':
              newPosition = [x, y, z + speed];
              moved = true;
              break;
            default:
              break;
          }

          if (moved) {
            setIsMoving(true);
            return newPosition;
          }
        }
        return prev;
      });
    };

    const handleKeyUp = (event) => {
      // When any movement key is released, set isMoving to false
      if (
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 's'].includes(
          event.key
        )
      ) {
        setIsMoving(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(({ camera }) => {
    if (rocketRef.current) {
      rocketRef.current.position.set(...position);

      // Camera follows the rocket
      camera.position.lerp(
        new THREE.Vector3(
          rocketRef.current.position.x,
          rocketRef.current.position.y + 5,
          rocketRef.current.position.z + 10
        ),
        0.1
      );
      camera.lookAt(rocketRef.current.position);

      // Collision detection
      if (planetPosition && !hasLanded.current) {
        const rocketPos = new THREE.Vector3(...position);
        const planetPos = new THREE.Vector3(...planetPosition);
        const distance = rocketPos.distanceTo(planetPos);

        if (distance < 2) {
          hasLanded.current = true;
          setIsMoving(false); // Stop the flame when landed
          onLand();
        }
      }
    }

    // Animate the flame if it's moving
    if (flameRef.current) {
      flameRef.current.visible = isMoving;
      if (isMoving) {
        flameRef.current.scale.y =
          1 + Math.sin(Date.now() * 0.02) * 0.3; // Flickering effect
      }
    }
  });

  return (
    <group ref={rocketRef}>
      {/* Rocket Body */}
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 4, 32]} />
        <meshStandardMaterial color="silver" />
      </mesh>

      {/* Nose Cone */}
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[0.5, 1, 32]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Fins */}
      {/* Right Fin */}
      <mesh position={[0.5, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.2, 1, 0.05]} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/* Left Fin */}
      <mesh position={[-0.5, -1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.2, 1, 0.05]} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/* Front Fin */}
      <mesh position={[0, -1, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.2, 1, 0.05]} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/* Back Fin */}
      <mesh position={[0, -1, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.2, 1, 0.05]} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/* Engine Flame */}
      <mesh ref={flameRef} position={[0, -2.5, 0]}>
        <coneGeometry args={[0.3, 1, 32]} />
        <meshStandardMaterial
          color="orange"
          emissive="yellow"
          emissiveIntensity={1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

export default Rocket;
