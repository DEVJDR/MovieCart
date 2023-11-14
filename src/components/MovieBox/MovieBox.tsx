import React, { useEffect, useState, useRef, useCallback } from 'react';
import { CameraControls, OrbitControls, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import MovieDb from '../MovieDb/MovieDb';
import { useFrame,useThree } from '@react-three/fiber';

interface MovieListProps {
  data: string;
}

const MovieList: React.FC<MovieListProps> = (props) => {
  
  const { data } = props;
  const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
  const [visiblePosters, setVisiblePosters] = useState<JSX.Element[]>([]);
  const [showNextPoster, setShowNextPoster] = useState(false);
  const [stopPoster, setstopPoster] = useState(true);
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
    MovieDb.forEach((movie) => {
      if (
        (data === 'Happy' && movie.Genre.includes('Comedy')) ||
        (data === 'Adventurous' && (movie.Genre.includes('War') || movie.Genre.includes('Thriller')))
      ) {
        const texture = textureLoader.load(movie.Poster);

        const poster = (
          <mesh key={movie.Title}>
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
  const { camera } = useThree();
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

export default MovieList;





//   const containerRef = useRef<THREE.Group>(null);
//   const posters: JSX.Element[] = [];
//   const [currentPosterIndex, setCurrentPosterIndex] = useState(0);
//   const [visiblePosters, setVisiblePosters] = useState<JSX.Element[]>([]);
//   const [showNextPoster, setShowNextPoster] = useState(false);

//   const textureLoader = new THREE.TextureLoader();

//   // const moveToNextPoster = () => {
//   //   if (currentPosterIndex < posters.length) {
//   //     setShowNextPoster(true);
//   //   }
//   // };

//   // const handleKeyPress = useCallback(
//   //   (event: KeyboardEvent) => {
//   //     if (event.key === 'Enter') {
//   //       moveToNextPoster();
//   //     }
//   //   },
//   //   [currentPosterIndex]
//   // );

//   // useEffect(() => {
//   //   window.addEventListener('keydown', handleKeyPress);

//   //   return () => {
//   //     window.removeEventListener('keydown', handleKeyPress);
//   //   };
//   // }, [handleKeyPress]);

//   useEffect(() => {
//     MovieDb.forEach((movie) => {
//       if (
//         (data === 'Happy' && movie.Genre.includes('Comedy')) ||
//         (data === 'Adventurous' && (movie.Genre.includes('War') || movie.Genre.includes('Thriller'))
//       )) {
//         const texture = textureLoader.load(movie.Poster);  
        
//          const poster=(
//           <RoundedBox args={[1, 1, 1]}>
//               <meshBasicMaterial map={texture} side={THREE.DoubleSide}  />
//             </RoundedBox>
            
//          )
//          posters.push(poster)   
     
        
       
//       }
//     });
//   }, [data, textureLoader]);
//   // let i=-20
//   // useFrame(() => {
//   //   if (showNextPoster && currentPosterIndex < posters.length) {
//   //     const nextPoster = posters[currentPosterIndex];
//   //       setVisiblePosters([nextPoster]);
//   //       setCurrentPosterIndex(currentPosterIndex + 1);
//   //       setShowNextPoster(false);      
//   //   }
//   //   if (containerRef.current) {
      
//   //     containerRef.current.position.x = i;
//   //           if (i <= 20) {
//   //             i += 0.9;
//   //           }
//   //         }
//   // });

//   return (
//     <>
//     {posters}
    
//     </>
    
   
//       // <group ref={containerRef}>{visiblePosters}</group>
      
//   )
// };


