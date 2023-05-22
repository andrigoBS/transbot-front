import React from 'react';
import { Box, Grid, Link, Typography } from '@mui/material';
import CNPqIcon from '../icons/cnpq/CNPqIcon';
import UnivaliIcon from '../icons/univali/UnivaliIcon';

const styles = {
    box: {
        backgroundColor: 'white',
        padding: '45px',
        textAlign: 'center'
    },
    margin: {
        marginBottom: '30px'
    }
};

const Partners = () => {
    const partners = [
        {
            element: <UnivaliIcon size={'140px'}/>,
            url: 'https://univali.br'
        },
        {
            element: <CNPqIcon size={'220px'}/>,
            url: 'https://cnpq.br'
        },
    ];

    return (
        <Box sx={styles.box}>
            <Typography variant="h4" color={'secondary'} sx={styles.margin}>
                Parceiros
            </Typography>
            <Grid container spacing={5} justifyContent={'center'} alignItems={'center'}>
                {partners.map((partner, key) => (
                    <Grid item key={'partners-' + key}>
                        <Link href={partner.url} underline="hover" target={'_blank'} color={'white'}>
                            {partner.element}
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Partners;
