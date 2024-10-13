
import React, { useMemo, useState, useEffect} from 'react';
import { Html, Text } from '@react-three/drei';
import { useBox } from '@react-three/cannon';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';


function Hexagon({ position, label, index, rotation, setSelections, selections }) {
    const [isHover, setIsHover] = useState(null);
    const [isSelected, setIsSelected] = useState(false);

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
  
    useEffect(() => {
      if (isSelected) {
        // Add the label if selected and not already in selections
        if (!selections.includes(label)) {
          setSelections(prev => [...prev, label]);
        }
      } else {
        // Remove the label if deselected
        if (selections.includes(label)) {
          setSelections(prev => prev.filter(item => item !== label));
        }
      }
    }, [isSelected, label, selections, setSelections]);
  
    const [ref, api] = useBox(() => ({
      mass: 1,
      position,
      rotation,
      args: [1, 1, 0.2],
    }));
  
  
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
  
    return (
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        onPointerOver={() => !isSelected && setIsHover(index)}
        onPointerOut={() => !isSelected && setIsHover(null)}
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
          onClick={() => setIsSelected(prev => !prev)}
        >
          {label}
        </Text>
      </mesh>
    );
  }

  export default Hexagon