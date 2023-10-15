import React, { useState,useRef} from 'react';
import { MeshPortalMaterial, OrbitControls, RoundedBox, TrackballControls,Svg, useTexture, Html,CameraControls,Scroll,ScrollControls} from '@react-three/drei';
import * as THREE from 'three';
import MeshWithKeyboardControls from './trail';
import MovieList from '../MovieList/MovieList';
import { useThree,useFrame, } from '@react-three/fiber';

const Scene = () => {
  const text = useTexture('./textures/1.jpg');
  const [active, setActive] = useState<string | null>(null);
  const [tactive, setTactive] = useState<string | null>(null);
  const name: string = 'vs';
  const nmae: string = 'dfv';
  const isSecondRoundedBoxActive = tactive === nmae;
  
  return (
    <>
      
     
<OrbitControls/>
      <RoundedBox args={[2, 3, 0.1]} onDoubleClick={() => setActive(active === name ? null : name)}>
        <ambientLight intensity={0.5} />
        <MeshPortalMaterial side={THREE.DoubleSide} blend={active === name ? 1 : 0}>
          <ambientLight intensity={2} />
          <MeshWithKeyboardControls />
          <mesh rotation={[0, 1.5, 0]}>
            <sphereGeometry args={[8, 64, 64]} />
            <meshStandardMaterial displacementScale={4} map={text} side={THREE.BackSide} />
            <RoundedBox
              args={[1, 1, 1]}
              position={[3, -1.4, 3]}
              rotation-y={-1.6}
              onDoubleClick={() => setTactive(tactive === nmae ? null : nmae)}
            >
              <MeshPortalMaterial side={THREE.DoubleSide} blend={tactive === nmae ? 1 : 0}>
                <ambientLight intensity={2} />
                
                {isSecondRoundedBoxActive && (
                  
                 
                 
                   <MovieList data='Adventurous'/>
                    
                
                         
           
                  
                )}
              </MeshPortalMaterial>
            </RoundedBox>
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </>
  );
};

export default Scene;
