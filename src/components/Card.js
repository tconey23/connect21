import React, { useMemo, useState, useEffect} from 'react';
import { Html, Text } from '@react-three/drei';
import { useBox } from '@react-three/cannon';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import HexagonGrid from './HexagonGrid';


const Card = ({ items, setCenterHex, setSelections, selections }) => {
  return (
    <HexagonGrid items={items} setCenterHex={setCenterHex} setSelections={setSelections} selections={selections}/>
  );
};

export default Card;
