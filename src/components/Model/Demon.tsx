/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 public/textures/Demon.gltf -o src/components/Demon.gltf -r public 
*/

import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
function Demon(props:any) {
  const group = useRef();
  const { nodes, materials, animations }:any = useGLTF("/textures/Demon.gltf");
 
const {actions}:any= useAnimations(animations, group);
useEffect(()=>{
  actions["Flying_Idle"].reset().fadeIn(.5).play();
  return ()=>actions["Flying_idle"].fadeOut(.5)
},[])
 
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <skinnedMesh
            name="Demon_Flying"
            geometry={nodes.Demon_Flying.geometry}
            material={materials.Demon_Main}
            skeleton={nodes.Demon_Flying.skeleton}
          />
          <group name="Demon_Flying001">
            <skinnedMesh
              name="Cube000"
              geometry={nodes.Cube000.geometry}
              material={materials.Black}
              skeleton={nodes.Cube000.skeleton}
            />
            <skinnedMesh
              name="Cube000_1"
              geometry={nodes.Cube000_1.geometry}
              material={materials.Eye_Black}
              skeleton={nodes.Cube000_1.skeleton}
            />
            <skinnedMesh
              name="Cube000_2"
              geometry={nodes.Cube000_2.geometry}
              material={materials.Eye_White}
              skeleton={nodes.Cube000_2.skeleton}
            />
          </group>
          <group name="Demon_Flying002">
            <skinnedMesh
              name="Cube001"
              geometry={nodes.Cube001.geometry}
              material={materials.Demon_Main}
              skeleton={nodes.Cube001.skeleton}
            />
            <skinnedMesh
              name="Cube001_1"
              geometry={nodes.Cube001_1.geometry}
              material={materials.Black}
              skeleton={nodes.Cube001_1.skeleton}
            />
            <skinnedMesh
              name="Cube001_2"
              geometry={nodes.Cube001_2.geometry}
              material={materials.Eye_White}
              skeleton={nodes.Cube001_2.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/textures/Demon.gltf");
export default Demon;
