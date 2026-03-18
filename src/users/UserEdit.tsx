
import React from 'react';
import {Edit,TabbedForm,FormTab,
        TextInput,BooleanInput,
        required,Toolbar,SaveButton,BooleanField,FunctionField,EmailField,
        TextField,SelectInput,
        Labeled} from 'react-admin';

import CertifiedField from '../renderers/field/CertifiedField';
import {downloadUserFiles} from '../config'
import Avatar from '@mui/material/Avatar'
import Aside from './Aside';


const Title = () => {
       return <span>Edition d'un utilisateur </span>;
};

const EditToolbar = (props:any) => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);

const ValidationStatus = ({status}:{status:string}) => {
    return (
        <span>
            {(status=="Default") && "Pas Complet" }
            {(status=="Complete") && "Complet"  }
            {(status=="Validated") && "Validé"  }
            {(status=="Problem") && "Problématique" }
        </span>
    )
    
}

const UserEditForm = () => {

    return (
     
            <TabbedForm syncWithLocation={false}  toolbar={<EditToolbar/>} >
                   <FormTab label="Résumé">
                    <h3>{"Editer le compte & profil ?"}</h3>
                    <Labeled>
                        <FunctionField label="Photo" render={record => <Avatar variant="rounded" src={downloadUserFiles(record.email,record.photo)} />} />
                    </Labeled>

                    <Labeled>
                    <EmailField label="Email" source="email" />
                    </Labeled>
                    
                    <Labeled>
                    <BooleanField  label="Email valide ?" source="valid_email"  />
                    </Labeled>
                    
                    <Labeled>
                    <TextField label="Description" source="description" />
                    </Labeled>
                    
                    <Labeled>
                    <TextField label="Profil" source="profil.type" />
                    </Labeled>

                     <CertifiedField/>
                    
                    <Labeled>
                    <FunctionField label="Statut" render={record => <ValidationStatus status={record.validation.status}/>} />
                    </Labeled>
                    
                    <SelectInput label="Changer statut ?" source="validation.status" choices={[
                        { id: 'Default', name: 'Pas Complet' },
                        { id: 'Complete', name: 'Complet' },
                        { id: 'Validated', name: 'Validé' },
                        { id: 'Problem', name: 'Problématique' },
                     ]} />
         
                        
                 </FormTab>
                                   
            </TabbedForm>
    
    );
};

const UserEdit = () => (
    <Edit title={<Title/>} aside={<Aside/>}>
        <UserEditForm/>
    </Edit>
);


export default UserEdit;