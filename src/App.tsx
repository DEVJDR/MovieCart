import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene/Scene';
import "./index.css"
import { Suspense } from 'react';
import { Html} from '@react-three/drei';


function App(){
  return(
    <>
    <Canvas camera={{position:[0,0,10] ,fov:40}} shadows  >
    <Suspense fallback={<Html><p>vdjbh</p></Html>}>
   <Scene/>
    </Suspense>
      
    </Canvas>
    </>
  )
}
export default App;