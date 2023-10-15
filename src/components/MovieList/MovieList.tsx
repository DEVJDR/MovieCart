import React, { useRef } from 'react';
import MovieDb from '../MovieDb/MovieDb';
import { Card } from 'react-bootstrap';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { Html, ScrollControls, Scroll, OrbitControls, Svg, TrackballControls, } from '@react-three/drei';

interface MovieListProps {
  data: string;
}

const MovieList: React.FC<MovieListProps> = (props) => {
  const { data } = props;
  const containerRef = useRef<THREE.Group>(null);
  const posters: JSX.Element[] = [];
  let xOffset = -1; // Adjust this value to control the horizontal spacing between posters
  const zOffset = -10; // Adjust this value to control the vertical spacing between posters
  let yOffset = 2;

  useFrame(({ camera }) => {
    if (containerRef.current) {
      containerRef.current.lookAt(camera.position);
    }
  });

  MovieDb.forEach((movie) => {
    if ((data === 'Happy' && movie.Genre.includes('Comedy')) || (data === 'Adventurous' && (movie.Genre.includes('War') || movie.Genre.includes('Thriller')))) {
      const position = new Vector3(xOffset, yOffset, zOffset);
      posters.push(
        <mesh key={movie.Title} position={position}>
          
          <Html>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={movie.Poster} />
              
              
            </Card>
          </Html>
        </mesh>
      );
      xOffset += 2; // Adjust this value to control the horizontal spacing between posters
     
    }
  });

  return (
    <ScrollControls>
      <Scroll>
        <group ref={containerRef}>{posters}</group>
      </Scroll>
    </ScrollControls>
  );
};

export default MovieList;
