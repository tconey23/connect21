import React, { useMemo, useState, useEffect} from 'react';
import { Button } from '@mui/material';
import { Html, Text } from '@react-three/drei';
import { useBox } from '@react-three/cannon';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

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

function Hexagon({ position, label, index, rotation, setSelections, selections, mass, phys }) {
  const [isHover, setIsHover] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const [ref, api] = useBox(() => ({
    mass: isSelected ? 0 : mass, 
    position,
    rotation,
    args: [1, 1, 0.2],
  }));
  
  useEffect(() => {
    if (isSelected) {
        ref.mass = 2
      if (!selections.includes(label)) {
        setSelections(prev => [...prev, label]);
      }
    } else {
      if (selections.includes(label)) {
        setSelections(prev => prev.filter(item => item !== label));
      }
    }
  }, [isSelected, label, selections, setSelections, ref]);


  const hexagonShape = useMemo(() => createHexagonShape(1), []);
  const hexagonGeometry = useMemo(
    () =>
      new THREE.ExtrudeGeometry(hexagonShape, {
        depth: 0.29,
        bevelEnabled: true,
      }),
    [hexagonShape]
  );

  return (
    <>
      {label && 
        <mesh
          ref={ref}
          className='hex-hover'
          castShadow
          receiveShadow
          onPointerOver={() => {
            if (!isSelected) {
              setIsHover(index);
              document.body.style.cursor = 'pointer'; // Change cursor to pointer
            }
          }}
          onPointerOut={() => {
            if (!isSelected) {
              setIsHover(null);
              document.body.style.cursor = 'default'; // Reset cursor to default
            }
          }}
          onClick={() => setIsSelected(prev => !prev)}
        >
          <pointLight
            position={[0, 0, 0.7]}
            intensity={isHover === index ? 0.1 : 0}
            distance={10}
            color={"white"}
            decay={200}
          />

          <primitive object={hexagonGeometry} attach="geometry" />
          <meshStandardMaterial
            color={isSelected ? 'purple' : 'blue'}
            transparent={true}
            opacity={0.8}
            roughness={0.8}
            metalness={0.6}
          />

          <Text
            position={[0, 0, 0.51]}
            fontSize={0.18}
            color="silver"
            anchorX="center"
            anchorY="middle"
            rotation={[0, 0, 0]}
            maxWidth={0.8}
            textAlign="center"
            onClick={() => setIsSelected(prev => !prev)}
          >
            {label}
          </Text>
        </mesh>
      }
    </>
  );
}





const HexagonGrid = ({mass, items, setCenterHex, setSelections, selections, phys }) => {
  const hexRadius = 1.5;
  const hexHeight = Math.sqrt(3) * hexRadius;  // Vertical height of a hexagon
  const hexWidth = 2 * hexRadius;              // Horizontal width of a hexagon
  
  // To make hexagons fit like puzzle pieces:
  const horizontalSpacingFactor = 1.0; // Exact width, no extra spacing
  const verticalSpacingFactor = 0.50;  // This is the natural height offset for hexagon tessellation
  const rows = 7; // Number of rows
  const cols = 3; // Number of columns
  const hexagons = [];
  let count = 0;

 
  // Calculate the grid center based on the number of rows and columns
  const gridCenterX = (cols * hexWidth) / 2;
  const gridCenterY = (rows * hexHeight * 0.75) / 2;
  
  // Create a staggered grid of hexagons
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const offsetX = row % 2 === 0 ? 0 : hexWidth / 2; // Stagger every other row
      const x = col * hexWidth * horizontalSpacingFactor + offsetX;
      const y = row * hexHeight * verticalSpacingFactor; // Adjust the vertical gap for tight fit

      hexagons.push({ position: [x, y, 0], label: items[count], index: count });
      count += 1;
    }
  }

  // Optionally find and set the center hexagon
  const centerHexIndex = Math.floor((rows * cols) / 2); // Find the middle hexagon
  if (setCenterHex) setCenterHex(hexagons[centerHexIndex]); // Set the center hexagon

  return (
    <>
      {hexagons.map((hex, index) => (
        <Hexagon
          key={index}
          position={hex.position}
          label={hex.label}
          index={hex.index}
          phys={phys}
          rotation={[0, 0, 0]}
          setSelections={setSelections}
          selections={selections}
          mass={mass}
        />
      ))}
    </>
  );
};

const Card = ({ items, setCenterHex, setSelections, selections, phys }) => {

  const [dropping, setDropping] = useState(false);
  const [mass, setMass] = useState(10)

  useEffect(() => {
    if(dropping){
      setMass(10)
    }
  }, [dropping])

  // Handler for when the user clicks the Next button
  const handleNextClick = () => {
    if (selections.length >= 3) {
      setDropping(true);  // Start dropping unselected hexagons
    } else {
      alert("Please select at least 3 options.");
    }
  };
  

  return (

    <>
    <HexagonGrid mass={mass} phys={phys} items={items} setCenterHex={setCenterHex} setSelections={setSelections} selections={selections}/>

    </>
  );
};

export default Card;
