import { Environment, MeshPortalMaterial, OrbitControls, RoundedBox, useTexture } from '@react-three/drei'
import * as THREE from "three"
import { useState } from 'react';
import Model from '../Model/Demon.jsx'
// import MovieList from '../MovieList/MovieList.js';

 export const Scene= () => {
  const text=useTexture('./textures/1.jpg')
  const [active,setActive]=useState(null);
 const name:any ="vs" ;
  return (
    <>
    
    <ambientLight intensity={.5}/>
    
    <OrbitControls />
    
    <RoundedBox args={[2,3,.1]} onDoubleClick={()=>setActive(active===name?null:name)}> 
        <MeshPortalMaterial side={THREE.DoubleSide} blend={active===name?1:0} >
              <ambientLight intensity={.5}/>
              <Model scale={.6} position-y={0} position-x={0} rotation-y={-0.1} />
            <mesh rotation={[0,1.2,0]}>
              <sphereGeometry args={[8,64,64]} />
              <meshStandardMaterial displacementScale={4} map={text} side={THREE.BackSide} />
            </mesh>
        </MeshPortalMaterial>
    </RoundedBox>
  </>

  )
}
