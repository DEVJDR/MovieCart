import React, { useRef } from 'react';
import { RoundedBox, OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

const MovieList: React.FC = () => {
  const containerRef = useRef<THREE.Mesh>(null);

  const { camera } = useThree();

  useFrame(() => {
    // Update the camera position and rotation
    camera.position.x += 0.1;

    // Reset the position for the next animation
    if (camera.position.x >= 20) {
      camera.position.x = -20;
    }
  });

  return (
    <>
      <mesh ref={containerRef}>
        <RoundedBox args={[1, 1, 1]} />
      </mesh>
      <OrbitControls />
    </>
  );
};

export default MovieList;
