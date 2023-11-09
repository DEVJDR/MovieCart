import { useState } from 'react';
import { MeshPortalMaterial, OrbitControls, RoundedBox, useTexture} from '@react-three/drei';
import * as THREE from 'three';
import MovieList from '../MovieList/MovieList';
import MeshWithKeyboardControls from './trail';


const Scene = () => {
  const text = useTexture('./textures/1.jpg');
  const [active, setActive] = useState<string | null>(null);
  const [tactive, setTactive] = useState<string | null>(null);
  const name: string = 'vs';
  const nmae: string = 'dfv';
  const isSecondRoundedBoxActive = tactive === nmae;
  
  return (
    <>
    <mesh>
    <OrbitControls/>
    <RoundedBox args={[2, 3, 0.1]} onDoubleClick={() => setActive(active === name ? null : name)}>
        
        <ambientLight intensity={0.5} />
        <MeshPortalMaterial side={THREE.DoubleSide} blend={active === name ? 1 : 0}>
              <ambientLight intensity={2} />
              <MeshWithKeyboardControls/>
              <mesh rotation={[0, 1.5, 0]}>
                <sphereGeometry args={[8, 64, 64]} />
                <meshStandardMaterial displacementScale={4} map={text} side={THREE.BackSide}  />
              </mesh>
              <mesh >
                  <ambientLight intensity={1} />
                      <RoundedBox
                        args={[2,2,2]}
                        position={[3, 3, 3]}
                        rotation-y={-1.6}
                        onDoubleClick={() => setTactive(tactive === nmae ? null : nmae)}
                      >
                            <MeshPortalMaterial side={THREE.DoubleSide} blend={tactive === nmae ? 1 : 0}>
                            <ambientLight intensity={1} />
                            {isSecondRoundedBoxActive&&<MovieList data="Happy" />}
                            </MeshPortalMaterial>
                      </RoundedBox>
              </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </mesh>
   
     
    </>
  );
};

export default Scene;
