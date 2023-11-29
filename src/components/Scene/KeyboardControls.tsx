import React, { ReactElement, useMemo, useRef, useState } from 'react';
import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump',
}

interface MeshWithKeyboardControlsProps {
  children: ReactElement;
  
}

const MeshWithKeyboardControls = ({ children }: MeshWithKeyboardControlsProps): ReactElement => {
  const map = useMemo<KeyboardControlsEntry<Controls>[]>(() => [
    { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
    { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
    { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
    { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    { name: Controls.jump, keys: ['Enter'] }, 
  ], []);

  const meshRef = useRef<THREE.Group | null>(null);
  const meshPosition = useRef<[number, number, number]>([0, 0, 0]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.set(meshPosition.current[0], meshPosition.current[1], meshPosition.current[2]);
    }
  });

  const handleKeyboardControls = (event: string) => {
    const speed = 1;

    switch (event) {
     
      case Controls.left:
        meshPosition.current[0]=-4;
        meshPosition.current[1]=1;
        meshPosition.current[2]=-5
        break;
      case Controls.right:
        meshPosition.current[0]=4;
        meshPosition.current[1]=1;
        meshPosition.current[2]=-5
        break;
       
      default:
        break;
    }
  };

  return (
    <group ref={meshRef}>
      <KeyboardControls map={map} onChange={(event: any) => handleKeyboardControls(event)}>
        {children}
      </KeyboardControls>
    </group>
  );
};

export default MeshWithKeyboardControls;
