import React from 'react';
import univali from './univali.png';

const UnivaliIcon = ({ size, sx }) => {
    return (
        <img style={sx} width={size} height="auto" id="univali" alt="univali" src={univali}/>
    );
};

export default UnivaliIcon;
