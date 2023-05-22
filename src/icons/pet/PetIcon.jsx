import React from 'react';
import { Box } from '@mui/material';
import pet from './pet.png';

const PetIcon = ({ sx }) => {
    return (
        <Box sx={sx} component='img' id="pet" alt="pet" src={pet}/>
    );
};

export default PetIcon;
