import { Canvas } from '@react-three/fiber';
import { CameraControls, Html, OrbitControls } from '@react-three/drei';
import Scene from './components/Scene/Scene';
import "./index.css"




function App(){
  return(
    <>
    <Canvas shadows  >
      <Scene/>
    </Canvas>
    </>
  )
}
export default App;