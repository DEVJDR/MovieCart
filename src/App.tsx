import { Canvas } from '@react-three/fiber';
import { CameraControls, Html, OrbitControls } from '@react-three/drei';
import Scene from './components/Scene/Scene';
import "./index.css"
import MovieDb from './components/MovieDb/MovieDb';

import { Suspense } from 'react';
import MovieList from './components/MovieBox/MovieBox'




function App(){
  return(
    <>
    <Canvas camera={{position:[0,0,5] ,fov:40}} shadows  >
    <Suspense>
   
     <Scene/> 
    </Suspense>
      
    </Canvas>
    </>
  )
}
export default App;