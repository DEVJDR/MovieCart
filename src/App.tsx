import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import Scene from './components/Scene/Scene';
import MovieList from './components/MovieList/MovieList';
import "./index.css"

function App() {


  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
        <Scene />  
      </Canvas>
    
    </>
  );
}

export default App;
