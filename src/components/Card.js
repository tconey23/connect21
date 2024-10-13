import React, { useMemo, useState, useEffect} from 'react';
import { Button } from '@mui/material';
import { Html, Text } from '@react-three/drei';
import { useBox } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import HexagonGrid from './HexagonGrid';


const Card = ({ items, setCenterHex, setSelections, selections }) => {
  return (

    <>
    <HexagonGrid mass={mass} phys={phys} items={items} setCenterHex={setCenterHex} setSelections={setSelections} selections={selections}/>

    </>
  );
};

export default Card;  
