
import React from 'react';
import {Edit,TabbedForm,FormTab,
        TextInput,BooleanInput,
        required,Toolbar,SaveButton,BooleanField,FunctionField,EmailField,
        TextField,SelectInput,
        Labeled,
        DateField,
        ReferenceField,
        isRequired} from 'react-admin';
import {RequestStatus,requestStatusOptions} from '../utils/request';
import {DateDisplay} from '../utils/generic';
import { CargoInfoShow, DocsShow, GeneralInfoShow, OffersShow, ProductsShow } from './RequestShow';
import { Stack } from '@mui/material';
import { FullName } from '../utils/FullName';
import Aside from './Aside';


const Title = () => {
       return <span>Edition d'une annonce </span>;
};

const EditToolbar = (props:any) => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);



const RequestEdit = () => (
    <Edit title={<Title/>} aside={<Aside/>}>
     <TabbedForm toolbar={<EditToolbar />} >
            <FormTab label="Résumé">
            
             {/*
                <h3>{"Editer l'annonce ?"}</h3>
                <TextField label="Description" source="description" />
                <FunctionField 
                            label="Date de publication" 
                            render={({publication_date}) => <DateDisplay dateString={publication_date}/>  } 
                />
                <FunctionField label="Statut" render={({status}) => <RequestStatus status={status}/>} />   
                <SelectInput label="Changer statut ?" source="status"  choices={requestStatusOptions} />      
            */}
    
                <GeneralInfoEdit/>
                <CargoInfoShow/> 
            </FormTab>
                   
            <FormTab label="Produits" path="products">
                    <ProductsShow/>
            </FormTab>
            <FormTab label="Offres" path="offers">
                    <OffersShow/> 
            </FormTab>
            <FormTab label="Docs" path="docs">
                        <DocsShow/>
            </FormTab>
        </TabbedForm>
    </Edit>
);




export const GeneralInfoEdit = () => (
    <Stack spacing={2}>
        <h3>Informations Générales</h3>
        <Labeled>
             <TextField label="Id" source="id" />
        </Labeled>
        <Labeled>
             <TextField label="Description" source="description" />
        </Labeled>
        <Labeled>
            <DateField label="Date de publication" source="publication_date"/> 
        </Labeled>
        
        
        <SelectInput label="Changer statut ?" source="status" required validate={required()}  choices={requestStatusOptions} /> 
        
        <Labeled>
            <ReferenceField label="Client" link = "show" source="user" reference="users">
                <FunctionField 
                    label="Client" 
                    render={record => <FullName record={record}/>} 
                />
            </ReferenceField>
        </Labeled>   
    </Stack>
    
)

export default RequestEdit;