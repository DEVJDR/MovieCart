import React, { useEffect, useState, useRef, useCallback } from 'react';
import {  OrbitControls, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import SeriesDb from '../DbList/SeriesDb';
import { useFrame} from '@react-three/fiber';

interface MovieListProps {
  data: string;
}

const SeriesBox: React.FC<MovieListProps> = ({data}) => {
  
 
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  const [visiblePosters, setVisiblePosters] = useState<JSX.Element[]>([]);
  const [showNextPoster, setShowNextPoster] = useState(false);
  const posters: JSX.Element[] = [];
  const moveToNextPoster = () => {
    if (currentPosterIndex < posters.length) {
      setShowNextPoster(true);
    }
  };
 

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        moveToNextPoster();
      }
    },
    [currentPosterIndex]
  );
  
  const textureLoader = new THREE.TextureLoader();
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
  


  useEffect(() => {
    console.log(data)
    SeriesDb.forEach((movie) => {
      if (
        (data === 'Happy' && movie.genres.includes('Comedy')) ||
        (data === 'Adventurous' && (movie.genres.includes('Adventurous') || movie.genres.includes('Thriller')))
      ) {
        const texture = textureLoader.load(movie.image.medium);

        const poster = (
          <mesh key={movie.id}>
            <OrbitControls/>
            <RoundedBox args={[1, 1, 1]} >
              <meshBasicMaterial map={texture} side={THREE.DoubleSide}  />
            </RoundedBox>
          </mesh>
        );

        posters.push(poster);
     }
    });
  }, [data, textureLoader]);
  const containerRef = useRef<THREE.Group>(null);
  useFrame(() => {
        if (showNextPoster && currentPosterIndex < posters.length) {
          const nextPoster = posters[currentPosterIndex];
          setVisiblePosters([nextPoster]);
          setCurrentPosterIndex(currentPosterIndex + 1);
          setShowNextPoster(false);
        }  
      } 
  );

  return (
    <group  ref={containerRef} >
      <mesh>
        <directionalLight castShadow  color={'orange'} position={[0,0,-3]}/>
        <ambientLight intensity={1}/>
        {visiblePosters}
        </mesh>
     
    </group>
  );
};

export default SeriesBox;








