//import MovieList from './components/MovieList/MovieList'
import { Scene } from './components/Scene/Scene'
import { Canvas } from '@react-three/fiber'
import './index.css'
// import MovieList from './components/MovieList/MovieList'

function App() {
  return (
   <>
    
    <Canvas shadows camera={{ position: [0,0,10], fov: 30 }}>
      <Scene/>
    </Canvas>
        
      
    
   </>
    
  )
}

export default App
