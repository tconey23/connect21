import React, { useEffect, Suspense, useState, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics, useBox } from '@react-three/cannon';
import * as THREE from 'three';
import Card from '../components/Card';

const SetCameraLookAt = ({ centerHex }) => {
    const { camera } = useThree();
  
    useFrame(() => {
      if (centerHex && centerHex.position) {
        // Set camera position to a fixed location, adjust as needed
        camera.position.set(3.5, 2, 7);
        // Make the camera look at the centerHex
        camera.lookAt(centerHex.position[0], centerHex.position[1], centerHex.position[2]);
      }
    });
  
    return null;
  };
 
  

const StageTwo = ({items, setSelections, selections}) => {
    const [centerHex, setCenterHex] = useState()
    const movingObjectRef = useRef();
    
    const stageTwoItems = items.slice(0, 21); // 21 items for stage one
  
    return (
        <Canvas shadows camera={{ position: [6, 6, 10], fov: 70 }}>
        <ambientLight intensity={0.8} />
        <directionalLight intensity={5} position={[10, 10, 20]} castShadow />
        {/* Pass the centerHex to SetCameraLookAt */}
        <SetCameraLookAt centerHex={centerHex} />
        <Suspense fallback={null}>
          <Physics gravity={[0, 0, 0]}>
            <Card setCenterHex={setCenterHex} items={items} movingObjectRef={movingObjectRef} setSelections={setSelections} selections={selections} />
          </Physics>
        </Suspense>
      </Canvas>
    );
  };

export default StageTwo;