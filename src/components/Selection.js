import React, { useEffect, Suspense, useState, useMemo, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, useBox } from '@react-three/cannon';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const SetCameraLookAt = ({ targetRef }) => {
    const { camera } = useThree();
  
    
    useFrame(() => {
      if (targetRef) {
        targetRef.position = [2,3,0]
        // console.log(targetRef.position)
        camera.lookAt(...targetRef.position);
      }
    });
  
    return null;
  };

// Helper function to create the hexagon shape
const createHexagonShape = (radius) => {
  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    if (i === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }
  shape.closePath();
  return shape;
};

// Memoize the Hexagon component to prevent unnecessary re-renders
const Hexagon = memo(({ position, label, index, rotation, setSelections, selections }) => {
  const [isHover, setIsHover] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const handleRemove = (index) => {
    setSelections((prevSelections) => {
      // Filter out the item at the given index
      const newSelections = prevSelections.filter((_, i) => i !== index);
      return newSelections; // Return the updated array
    });
  };
  

  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    rotation,
    args: [1.8, 2, 0.29],
  }));

  // Memoize the hexagon shape and geometry for performance
  const hexagonShape = useMemo(() => createHexagonShape(1), []);
  const hexagonGeometry = useMemo(
    () =>
      new THREE.ExtrudeGeometry(hexagonShape, {
        depth: 0.29, // Thickness of the hexagon (making it 3D)
        bevelEnabled: true,
      }),
    [hexagonShape]
  );

  const handleSelection = (index, label) => {
    setSelections((prev) => {
      if (!prev.includes(label)) {
        return [...prev, label]; // Add the new label
      }
      return prev; // No change, return previous state
    });

    setIsSelected(true);
  };

  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      onPointerOver={() => !isSelected && setIsHover(index)}
      onPointerOut={() => !isSelected && setIsHover(null)}
      onClick={() => handleRemove(index)}
    >
      <primitive object={hexagonGeometry} attach="geometry" />
      <meshStandardMaterial
        color={isSelected ? 'grey' : 'blue'}
        transparent={true}
        opacity={0.8}
        roughness={0.8}
        metalness={0.6}
      />

      <Text
        position={[0, 0, 0.51]}
        fontSize={0.15}
        color="silver"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, 0]}
        maxWidth={0.7}
        textAlign="center"
      >
        {label}
      </Text>
    </mesh>
  );
});

const Selection = ({ setOpen, open, selections, setSelections }) => {

    const [currDir, setCurrDir] = useState(1)



    useEffect(() => {
        if(selections && selections.length && selections.length < 6 && currDir == 1){
            setCurrDir(-1)
        } 

        if(selections && selections.length && selections.length < 6 && currDir == -1){
            setCurrDir(1)
        } 

        if(selections && selections.length && selections.length == 6){
            setCurrDir(0)
        }
    }, [selections])

  const DrawerList = useMemo(() => (
    <>
      {selections &&
        selections.map((text, index) => (
          <Hexagon
            selections={selections}
            key={text} // Use unique text as a key or a unique ID if available
            position={[currDir, 8, 0]}
            label={text}
            index={index}
            setSelections={setSelections}
            rotation={[0, 0, 0]}
          />
        ))}
    </>
  ), [selections]); // Memoize the DrawerList to prevent re-renders

  // Add Invisible Walls with collision boundaries
  function Walls({ debug = false }) {
    // Left Wall
    useBox(() => ({
      args: [0.1, 10, 2], // Width (thickness), height, depth
      position: [-5, 5, 0], // Adjust position as needed
      type: 'Static', // Static means the wall doesn't move
    }));

    // Right Wall
    useBox(() => ({
      args: [0.1, 10, 2],
      position: [5, 5, 0],
      type: 'Static',
    }));

    // Top Wall
    useBox(() => ({
      args: [10, 0.1, 2], // Width, height (thickness), depth
      position: [0, 10, 0],
      type: 'Static',
    }));

    // Bottom Wall
    useBox(() => ({
      args: [10, 0.1, 2],
      position: [0, 0, 0],
      type: 'Static',
    }));

    // Front Wall
    useBox(() => ({
      args: [10, 10, 0.1],
      position: [0, 5, 0.25],
      type: 'Static',
    }));

    // Back Wall
    useBox(() => ({
      args: [10, 10, 0.1],
      position: [0, 5, -0.25],
      type: 'Static',
    }));

    return null; // No need to render geometry for walls
  }

  return (
    <div style={{width: '40%', height: '90vh'}}>
    <Canvas shadows camera={{ position: [5, 6, 9.04], fov: 60 }}>
      <ambientLight intensity={0.8} />
      <directionalLight intensity={15} position={[0, -5, 1]} castShadow />

      <SetCameraLookAt targetRef={[0,0,0]} />

      <Suspense fallback={null}>
        <Physics gravity={[0, -2, 0]}>
          {DrawerList} {/* Only re-renders when `selections` changes */}
          <Walls debug={false} /> {/* Set `debug` to true to show wireframe walls */}
        </Physics>
      </Suspense>
    </Canvas>
    </div>
  );
};

export default Selection;
