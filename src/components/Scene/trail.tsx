import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import Model from '../Model/Demon.jsx';
enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump',
}

const MeshWithKeyboardControls: React.FC = () => {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(() => [
    { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
  ], []);

  const meshRef = useRef<THREE.Group|null>(null);

  // Initialize the mesh's position
  const meshPosition = useRef<[number, number, number]>([0, 0, 0]);

  useFrame(() => {
    // Update the mesh's position based on keyboard inputs
    if (meshRef.current) {
      meshRef.current.position.set(meshPosition.current[0], meshPosition.current[1], meshPosition.current[2]);
    }
  });

  const handleKeyboardControls = (event: string) => {
    // Update the mesh's position based on keyboard inputs
    const speed = 1; // Adjust the movement speed as needed

    switch (event) {
      case Controls.forward:
        meshPosition.current[2] -= speed;
        break;
      case Controls.back:
        meshPosition.current[2] += speed;
        break;
      case Controls.left:
        meshPosition.current[0] -= speed;
        break;
      case Controls.right:
        meshPosition.current[0] =4.2;
        meshPosition.current[1] =0;
        meshPosition.current[2] =-5;

        break;
      default:
        break;
    }
  };

  return (
    <group ref={meshRef} >
      <KeyboardControls map={map} onChange={(event:any) => handleKeyboardControls(event)} >
      <mesh>
      <Model   scale={0.5} position-y={-0.8} position-x={0} rotation-y={0} />
      </mesh>
      </KeyboardControls>
    </group>
  );
};

export default MeshWithKeyboardControls;
