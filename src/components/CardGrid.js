import React, { useEffect, Suspense, useState, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics, useBox } from '@react-three/cannon';
import * as THREE from 'three';
import Card from './Card';


const SetCameraLookAt = ({ targetRef }) => {
  const { camera } = useThree();

  
  useFrame(() => {
    if (targetRef) {
      targetRef.position = [4,4.4,0]
      camera.position.set(4,5,8)
      // console.log(targetRef.position)
      camera.lookAt(...targetRef.position);
    }
  });

  return null;
};


const CardGrid = ({items, setSelections, selections}) => {

  const [centerHex, setCenterHex] = useState()


const movingObjectRef = useRef();
  return (
    <Canvas shadows camera={{ position: [6, 6, 10], fov: 70 }}>
      <ambientLight intensity={0.8} />
      <directionalLight intensity={5} position={[10, 10, 20]} castShadow/>

      <SetCameraLookAt targetRef={centerHex} />
      {/* <OrbitControls /> */}

      <Suspense fallback={null}>

        <Physics gravity={[0, 0, 0]} >
      
          <Card setCenterHex={setCenterHex} items={items} movingObjectRef={movingObjectRef} setSelections={setSelections} selections={selections}/>
        </Physics>
      </Suspense>
    </Canvas>
  );
};

export default CardGrid;
