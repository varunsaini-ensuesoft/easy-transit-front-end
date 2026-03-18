
import { Card, CardContent,Stack,Typography,Box} from '@mui/material';

import MuTextField from '@mui/material/TextField';
import MuEditIcon from '@mui/icons-material/Edit';
import MuButton from '@mui/material/Button';
import MuCircularProgress from '@mui/material/CircularProgress';
import MuSaveIcon from '@mui/icons-material/Save';
import MuCancelIcon from '@mui/icons-material/Close';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Labeled, Title, useAuthProvider, useNotify } from 'react-admin';



const MyProfile = () => { 
    
    return (
    <Card sx={{marginTop:'20px'}}>
        <Title title="Mon Profil" />
        <CardContent>
            <Stack spacing={2} maxWidth="500px">
                <MuButton variant='text'color='primary' size='small' startIcon={<MuEditIcon/>}>
                    MODIFIER MOT DE PASSE
                </MuButton>
                <Labeled label="Prénom ">
                    <Typography variant="body2" gutterBottom>Abdoulaye</Typography>
                </Labeled>
                <Labeled label="Nom ">
                    <Typography variant="body2" gutterBottom>SOW</Typography>
                </Labeled>
                <Labeled label="Rôle ">
                    <Typography variant="body2" gutterBottom>Admin</Typography>
                </Labeled>
            </Stack>
        </CardContent>
    </Card>
)};


export default MyProfile


