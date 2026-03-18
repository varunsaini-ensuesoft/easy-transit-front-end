
import React from 'react';
import {Edit,TabbedForm,FormTab,
        TextInput,BooleanInput,
        required,Toolbar,SaveButton,BooleanField,FunctionField,EmailField,
        TextField,SelectInput,
        ReferenceField,
        DateField,
        DateInput,
        ChipField,
        ArrayInput,
        SimpleFormIterator,
        NumberInput,
        Labeled} from 'react-admin';
import {RequestStatus,requestStatusOptions} from '../utils/request';
import {DateDisplay} from '../utils/generic';
import Aside from './Aside';
import { GeneralInfoShow, MonitoringShow, OfferShow } from './OrderShow';



const Title = () => {
       return <span>Edition d'une annonce </span>;
};

const EditToolbar = (props:any) => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);



const OrderEdit = () => (
    <Edit title={<Title/>}  aside={<Aside/>} redirect='show'>
     <TabbedForm toolbar={<EditToolbar />} >
            <FormTab label="Résumé">
                <GeneralInfoShow/>
                <OfferShow/>
            </FormTab>
            <FormTab label="Suivi">
                    <MonitoringShow/>
            </FormTab>
   {/*          <FormTab label="Paiements">
                 <PaymentsEdit/>
            </FormTab> */}
            {/* <FormTab label="Documents">
                    <div>Liste des documents de la commande ?</div>
            </FormTab> */}
        </TabbedForm>
    </Edit>
);


/* const PaymentsEdit = () => (
    <>
        <h3>Editer les paiements ?</h3>
        <ArrayInput label="Liste des paiements" source="payments">
            <SimpleFormIterator inline disableClear >
                <DateInput  source="date"  label="Date"/>
                <NumberInput source="amount" label="Montant"/>
                <TextInput source="description" label="Description"/>
            </SimpleFormIterator>
        </ArrayInput>
    </>
   
)
 */
                

export default OrderEdit;