import React from 'react';
import {Show, TabbedShowLayout, Tab,TextField,
    RichTextField,BooleanField,ShowController,
    ShowView,EmailField,FunctionField,Labeled,
ImageField,
WithRecord,
ChipField} from 'react-admin'

import CertifiedField from '../renderers/field/CertifiedField';
import {downloadUrl} from '../config'
import Avatar from '@mui/material/Avatar';
import Aside from './Aside';
import { Stack } from '@mui/material';

const Title = () => {
    return <span>Visualisation d'un administrateur </span>;
};



const AdminUserShow = () => {
    return (
        <Show 
            title={<Title />} 
            aside={<Aside />}
        >
            <TabbedShowLayout>
            <Tab label="Résumé">
                        <h3>Identité</h3>
                        <TextField label="Prénom" source="first_name" />
                        <TextField label="Nom" source="last_name" />
                        <TextField label="Tel" source="phone" />

                        <h3>Compte</h3>
                        <TextField label="Email" source="email" />
                        <ChipField label="Role" source="role" />
                        <BooleanField  label="Compte actif ?" source="activated"  />

                    </Tab>
            </TabbedShowLayout>
        </Show>
    );
};



export default AdminUserShow;

