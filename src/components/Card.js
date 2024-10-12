import React, { useMemo, useState, useEffect} from 'react';
import { Html, Text } from '@react-three/drei';
import { useBox } from '@react-three/cannon';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Helper function to create a hexagon shape
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

function Hexagon({ position, label, index, rotation, setSelections, selections }) {
  const [isHover, setIsHover] = useState(null);
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    console.log(selections.includes(label))
    if(isSelected && !selections.includes(label)){
      setIsSelected(false)
      setIsHover(false)
    }
  }, [isSelected, selections])

  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    rotation,
    args: [1, 1, 0.2],
  }));

  const initialX = position[0];
  const initialY = position[1];
  const initialZ = position[2];

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    const rot = (xyz) => {
      return xyz + Math.sin(time + index) * 0.05;
    };

    const rx = rot(rotation[0]);
    const ry = rot(rotation[1]);
    const rz = rot(rotation[2]);

    // Update the physics body's position dynamically (uncomment as needed)
    // api.rotation.set(rx, ry, rz);
    const newX = initialX + Math.sin(time + index) * 0;
    const newY = initialY + Math.sin(time + index) * 0;
    const newZ = initialZ + Math.sin(time + index) * 0.04;

    // api.position.set(newX, newY, newZ);
  });

  // Memoize the hexagon shape and geometry for performance
  const hexagonShape = useMemo(() => createHexagonShape(1), []);
  const hexagonGeometry = useMemo(
    () =>
      new THREE.ExtrudeGeometry(hexagonShape, {
        depth: 0.29, // Thickness of the hexagon (making it 3D)
        bevelEnabled: true, // No bevel
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
  
    setIsSelected(true)

  };

  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      onPointerOver={() => !isSelected && setIsHover(index)}
      onPointerOut={() => !isSelected && setIsHover(null)}
      onClick={() => !isSelected && handleSelection(index, label)}
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
        color={isSelected ? 'grey': 'blue'}
        transparent={true} // Enable transparency
        opacity={0.8} // Set opacity to make it translucent
        roughness={0.8} // Adjust roughness for better lighting interaction
        metalness={0.6} // You can tweak this for reflectivity, if needed
      />

      <Text
        position={[0, 0, 0.51]} // Slightly above the hexagon
        fontSize={0.15} // Size of the text
        color="silver" // Color of the text
        anchorX="center" // Align horizontally to center
        anchorY="middle" // Align vertically to middle
        rotation={[0, 0, 0]} // Rotation will match the hexagon
        maxWidth={0.7}
        textAlign="center"
      >
        {label}
      </Text>
    </mesh>
  );
}


// Generate a hexagon grid
const HexagonGrid = ({ items, setCenterHex, setSelections, selections}) => {
  const hexRadius = 1.5;
  const hexHeight = Math.sqrt(3) * hexRadius;
  const hexWidth = 2.5 * hexRadius;
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
      const offsetX = row % 2 === 0 ? 0 : hexWidth / 2; // Staggered row
      const x = col * hexWidth + offsetX;
      const y = row * hexHeight * 0.36; // Adjust the vertical gap
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
          rotation={[0,0,0]}
          setSelections={setSelections}
          selections={selections}
        />
      ))}
    </>
  );
};


const Card = ({ items, setCenterHex, setSelections, selections }) => {
  return (
    <HexagonGrid items={items} setCenterHex={setCenterHex} setSelections={setSelections} selections={selections}/>
  );
};

export default Card;
