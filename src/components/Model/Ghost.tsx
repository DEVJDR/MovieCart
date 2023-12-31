/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 public/textures/Ghost_Skull.gltf -o src/components/ModelGhost.jsx -r public 
*/

import { useRef,useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Ghost(props:any) {
  const group = useRef()
  const { nodes, materials, animations }:any = useGLTF('/textures/Ghost_Skull.gltf')
  const { actions }:any = useAnimations(animations, group)

  useEffect(()=>{
    actions["Flying_Idle"].reset().fadeIn(.5).play();
    return ()=>actions["Flying_idle"].fadeOut(.5)
  },[])
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="CharacterArmature">
          <primitive object={nodes.Root} />
          <group name="Ghost_Skull">
            <skinnedMesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials.Ghost_Secondary} skeleton={nodes.Cube001.skeleton} />
            <skinnedMesh name="Cube001_1" geometry={nodes.Cube001_1.geometry} material={materials.Ghost_Main} skeleton={nodes.Cube001_1.skeleton} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/textures/Ghost_Skull.gltf')
