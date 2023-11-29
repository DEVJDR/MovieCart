import  { useState, useRef,useEffect } from 'react';
import { useSpring, animated } from '@react-spring/three';
import MonsterWorlds from './MovieWorld';
import Demon from '../Model/Demon';
import { Ghost } from '../Model/Ghost';
import BookList from '../MovieBox/BookBox';
import SeriesList from '../MovieBox/SeriesBox';
import MovieList from '../MovieBox/MovieBox';
import * as THREE from 'three';
import { Hywirl } from '../Model/Hywirl';


const Scene = () => {
  const [active, setActive] = useState<string | null>(null);
  const [tactive, setTactive] = useState('');
  const handleTactiveChange = (data: string) => {
    setTactive(data);
  };

  const MovieboxRef = useRef<THREE.Mesh>(null);
  const SeriesboxRef = useRef<THREE.Mesh>(null);
  const BookboxRef = useRef<THREE.Mesh>(null);

//defining animation using spring
        const [springProps1, api1] = useSpring(() => ({
          from: {x:0, y: 0 },
          config: { duration: 500 },
        }));

        const [springProps2, api2] = useSpring(() => ({
          from: { x: -2.5, y: 0 },
          config: { duration: 500 },
        }));

        const [springProps3, api3] = useSpring(() => ({
          from: { x: 2.5, y: 0 },
          config: { duration: 500 },
        }));
 
// control animation of each worlds
  useEffect(()=>{
    if(confirm("cd")){
      api1.start({ x:0,y: 3.5, onRest: 
      () => api2.start({ x: 0, y: 0,onRest:
      ()=>api1.start({ x:-2.5,y:3.5,onRest:
      ()=>api1.start({x:-2.5,y:0,onRest:
      ()=>api2.start({x:0,y: 3.5,onRest:
      ()=>api3.start({  x: 0, y: 0, onRest: 
      () => api2.start({ x:2.5,y:3.5,onRest:
      ()=>api2.start({x:2.5,y:0,onRest:
      ()=>api3.start({ x:0,y: -3.5, onRest: 
      () => api3.start({ x:-2.5,y:-3.5,onRest:
      ()=>api1.start({x:0,y:0,onRest:
      ()=>api3.start({x:-2.5,y:0})})})})}) })})})})})}) });
      }
  
  },[])


  return (
    <>
      <ambientLight intensity={1} />
      <animated.mesh  position-y={springProps1.y} position-x={springProps1.x}>
        <MonsterWorlds
          texture={'./textures/1.jpg'}
          name={'Movie'}
          color={'blue'}
          handleTactiveChange={() => handleTactiveChange('Movie')}
          active={active}
          setActive={setActive}
          RoundedBoxRef={MovieboxRef}
          id={<MovieList data={tactive} />} 
        >
          <Demon position-y={-1} scale={0.8}/>
        </MonsterWorlds>
      </animated.mesh>

      
       <animated.mesh position-x={springProps2.x} position-y={springProps2.y}>
       <MonsterWorlds 
          texture={'./textures/3.jpg'}
          
          name={'Book'}
          color={'black'}
          handleTactiveChange={() => handleTactiveChange('Book')}
          id={<BookList data={tactive} />}
          active={active}
          setActive={setActive}
          RoundedBoxRef={BookboxRef} 
        >
          <Ghost position-y={-1} scale={0.8}/>
        </MonsterWorlds>
       </animated.mesh>
      

      <animated.mesh  position-x={springProps3.x} position-y={springProps3.y}>
        <MonsterWorlds
          texture={'./textures/4.jpg'}
          
          name={'Series'}
          color={'yellow'}
          handleTactiveChange={() => handleTactiveChange('Series')}
          id={<SeriesList data={tactive} />}
          active={active}
          setActive={setActive}
          RoundedBoxRef={SeriesboxRef}
        >
         
          <Hywirl position-y={-1} scale={0.8}/>
        </MonsterWorlds>
      </animated.mesh>
    </>
  );
};

export default Scene;
