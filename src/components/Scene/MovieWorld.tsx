import React, { ReactElement, useEffect, useRef, useState} from 'react';
import {
  MeshPortalMaterial,
  OrbitControls,
  RoundedBox,
  useTexture,Text, PortalMaterialType, CameraControls
} from '@react-three/drei';
import * as THREE from 'three';
import {  useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';
import MeshWithKeyboardControls from './KeyboardControls';
import MovieList from '../MovieBox/MovieBox'
import SeriesBox from '../MovieBox/SeriesBox';


interface MonsterWorldsProps {
    children:ReactElement;
    texture: string;
    id:ReactElement;
    name:string;
    handleTactiveChange: (data: string) => void;
    color:string;
    active: string | null;
    setActive: React.Dispatch<React.SetStateAction<string | null>>;
    RoundedBoxRef:any;
    
    // Add any additional props here
  }


 // ... (import statements)

 const MonsterWorlds: React.FC<MonsterWorldsProps> = ({
  children,
  active,
  setActive,
  id,
  color,
  handleTactiveChange,
  name,
  texture,
  RoundedBoxRef,
  ...props
}) => {
  const [isBlending, setIsBlending] = useState(false);
  const text = useTexture(texture);
  const back = useTexture("textures/card.jpg"); // Use forward slash and start from the public folder
  const controlworldRef = useRef<any>();
  const scene = useThree((state) => state.scene);
  const targetPosition = new THREE.Vector3();
  
  useEffect(() => {
    if (active) {
      const targetObject = scene.getObjectByName(active);
  
      // Check if targetObject is not undefined
      if (targetObject && controlworldRef.current) {
        targetObject.getWorldPosition(targetPosition);
        controlworldRef.current.setLookAt(
          0,
          0,
          5,
          targetPosition.x,
          targetPosition.y,
          targetPosition.z,
          true
        );
      }
    } else {
      // Check if controlworldRef.current is not undefined
      if (controlworldRef.current) {
        controlworldRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
      }
    }
  }, [active]);

 // Added dependencies to useEffect

  // const handleEnterPress = (dat: string) => {
  //   setIsBlending(true);
  //   handleTactiveChange(dat);
  //   console.log(dat);
  // };

  const portalMaterial = useRef<PortalMaterialType>(null);

  useFrame((_state, delta) => {
    const WorldOpen = active === name;
    if (portalMaterial.current) {
      easing.damp(portalMaterial.current, "blend", WorldOpen ? 1 : 0, 0.2, delta);
    }
  });
  return (
    <group {...props}>
<CameraControls ref={controlworldRef}/>
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onDoubleClick={() => setActive(active === name ? null : name)}
        ref={RoundedBoxRef}
      >
        <Text font="textures\Anton-Regular.ttf" fontSize={0.3} anchorY={'bottom'} position={[0, -1.3, 0.051]} color={color}>
          {name}
        </Text>
        <meshBasicMaterial map={isBlending ? back : undefined} side={THREE.BackSide} />
        <MeshPortalMaterial side={THREE.DoubleSide} ref={portalMaterial}>
          <ambientLight intensity={2} />

          <MeshWithKeyboardControls>{children}</MeshWithKeyboardControls>

          <mesh rotation={[0, 1.5, 0]}>
            <sphereGeometry args={[8, 64, 64]} />
            <meshStandardMaterial displacementScale={4} map={text} side={THREE.BackSide} />
          </mesh>

          <mesh>
            
              <RoundedBox args={[1.5, 1.5, 1.5]} position={[-4, -2, -5]} rotation-y={-1.6}  onClick={()=>setIsBlending(!isBlending)}/>
                <OrbitControls />
                <ambientLight intensity={2} />

                {/* Movie content */}
                {active === 'Movie' && (
                  <MeshPortalMaterial side={THREE.DoubleSide} blend={isBlending ? 1 : 0}>
                    <MovieList data="Happy" />
                  </MeshPortalMaterial>
                )}

                {/* Series content */}
                {active === 'Series' && (
                  <MeshPortalMaterial side={THREE.DoubleSide} blend={isBlending ? 1 : 0}>
                    <SeriesBox data="Happy" />
                  </MeshPortalMaterial>
                )}
              
          
          </mesh>

          {/* Other posters go here... */}
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};

export default MonsterWorlds;

  