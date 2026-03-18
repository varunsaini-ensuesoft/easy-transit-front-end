
import React from 'react';
import {Edit,TabbedForm,FormTab,
        TextInput,BooleanInput,
        required,Toolbar,SaveButton,BooleanField,FunctionField,EmailField,
        TextField,SelectInput,
        Labeled} from 'react-admin';


import Aside from './Aside';


const Title = () => {
       return <span>Edition d'un administrateur </span>;
};

const EditToolbar = (props:any) => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);



export const AdminUserEditForm = ({mode='edit'}:{mode?:'edit'|'create'}) => {

    return (
     
            <TabbedForm syncWithLocation={false}  toolbar={<EditToolbar/>} >
                   <FormTab label="Résumé">
                    <h3>Identité</h3>
                    <TextInput label="Prénom" source="first_name" />
                    <TextInput label="Nom" source="last_name" />
                    <TextInput label="Tel" source="phone" />

                    <h3>Compte</h3>
                    {mode=='edit'?
                        <Labeled>
                        <TextField label="Email" source="email" />
                        
                        </Labeled>
                         :
                        <>
                            <Labeled>
                             <TextInput label="Email" source="email" />
                            </Labeled>
                            
                            <Labeled>
                             <TextInput label="Mot de passe" source="password" />
                            </Labeled>        
                        </>    
                    }
                    <SelectInput label="Changer role ?" source="role" choices={[
                        { id: 'Assistant', name: 'Assistant' },
                        { id: 'Direction', name: 'Direction' }
                     ]} />

                    <BooleanInput label="Compte actif ?" source="activated"  />
                        
                 </FormTab>
                                   
            </TabbedForm>
    
    );
};

const AdminUserEdit = () => (
    <Edit title={<Title/>} aside={<Aside/>}>
        <AdminUserEditForm/>
    </Edit>
);


export default AdminUserEdit;