import { useState } from 'react';
import { CameraControls, Environment, MeshPortalMaterial, OrbitControls, RoundedBox, useTexture} from '@react-three/drei';
import * as THREE from 'three';
import MovieList from '../MovieBox/MovieBox'
import MeshWithKeyboardControls from './KeyboardControls';


const Scene = () => {
  const text = useTexture('./textures/4.jpg');
  const [active, setActive] = useState<string | null>(null);
  const [tactive, setTactive] = useState<string | null>(null);
  const name: string = 'vs';
  const nmae: string = 'dfv';
  const isSecondRoundedBoxActive = tactive === nmae;
  
  return (
    <>
    <mesh>
    <ambientLight intensity={1} /> 
    <RoundedBox args={[2, 3, 0.1]} onDoubleClick={() => setActive(active === name ? null : name)}>
        
      
        <MeshPortalMaterial side={THREE.DoubleSide} blend={active === name ? 1 : 0}>
              <ambientLight intensity={2} />
              <MeshWithKeyboardControls/>
              <mesh rotation={[0, 1.5, 0]}>
                <sphereGeometry args={[8, 64, 64]} />
                <meshStandardMaterial displacementScale={4} map={text} side={THREE.BackSide}  />
              </mesh>
              <mesh >
                 
                      <RoundedBox
                        args={[1.5,1.5,1.5]}
                        position={[4, -2, -5]}
                        rotation-y={-1.6}
                        onDoubleClick={() => setTactive(tactive === nmae ? null : nmae)} />
                                                                
                     <CameraControls/>
                            <MeshPortalMaterial side={THREE.DoubleSide} blend={tactive === nmae ? 1 : 0}>
                            <ambientLight intensity={1} />
                            {isSecondRoundedBoxActive&&<MovieList data="Happy" />}
                            </MeshPortalMaterial>
                      
              </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </mesh>
   
     
    </>
  );
};

export default Scene;
