import React, { useEffect, useState, useRef, useCallback } from 'react';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import BooksDb from '../DbList/BookDb';
import { useFrame } from '@react-three/fiber';

interface MovieListProps {
  data: any;
}

const BookList: React.FC<MovieListProps> = ({data}) => {
  
  
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
    BooksDb.forEach((book) => {
      // if (
      //   (data === 'Happy' && book.Genre.includes('Comedy')) ||
      //   (data === 'Adventurous' && (book.Genre.includes('War') || book.Genre.includes('Thriller')))
      // ) {
        const texture = textureLoader.load(book.title);

        const poster = (
          <mesh key={book.author}>
            <RoundedBox args={[1, 1, 1]} >
              <meshBasicMaterial map={texture} side={THREE.DoubleSide}  />
            </RoundedBox>
          </mesh>
        );

        posters.push(poster);
      // }
    });
  }, [data, textureLoader]);
  const containerRef = useRef<THREE.Group>(null);
  useFrame((state,delta) => {
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
       
        {visiblePosters}
        </mesh>
     
    </group>
  );
};

export default BookList;








