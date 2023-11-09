import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useFrame} from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import MovieDb from '../MovieDb/MovieDb';
interface MovieListProps {
  data: string;
}

const MovieList: React.FC<MovieListProps> = (props) => {
  const { data } = props;

  const containerRef = useRef<THREE.Group>(null);
  const posters: JSX.Element[] = [];
  // Initial z position, where the box appears
  const animationSpeed = 0.05; // Adjust the speed of animation
  const myRou = useRef<THREE.Mesh>(null);
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  const [visiblePosters, setVisiblePosters] = useState<JSX.Element[]>([]);
  const [showNextPoster, setShowNextPoster] = useState(false);

  const textureLoader = new THREE.TextureLoader();

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

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    MovieDb.forEach((movie) => {
      if (
        (data === 'Happy' && movie.Genre.includes('Comedy')) ||
        (data === 'Adventurous' && (movie.Genre.includes('War') || movie.Genre.includes('Thriller'))
      )) {
        const texture = textureLoader.load(movie.Poster);
        
        const poster = (
          <group key={movie.Title} position={[0,0,0]}>
            <RoundedBox args={[1, 1, 1]} ref={myRou}>
              <meshBasicMaterial map={texture} side={THREE.DoubleSide}  />
            </RoundedBox>
          </group>
        );
        posters.push(poster);
      }
    });
  }, [data, textureLoader]);
  let i=-20
  useFrame(() => {
    
    if (showNextPoster && currentPosterIndex < posters.length) {
      const nextPoster = posters[currentPosterIndex];
     
      if (nextPoster.props.position.z < 0) {
        nextPoster.props.position.z += animationSpeed;
      } else {
        nextPoster.props.position.z = 0;
        setVisiblePosters((prevVisiblePosters) => [...prevVisiblePosters, nextPoster]);
        setCurrentPosterIndex((prevIndex) => prevIndex + 1);
        setShowNextPoster(false);
      }
    }
    if (containerRef.current) {
      
      containerRef.current.position.x = i;
            if (i <= 20) {
              i += 0.9;
            }
          }
  });

  return (
      <group ref={containerRef}>{visiblePosters}</group>
  )
};

export default MovieList;
