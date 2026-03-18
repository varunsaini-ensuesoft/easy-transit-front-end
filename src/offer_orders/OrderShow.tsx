import React, { useState } from 'react';
import {Show, TabbedShowLayout, Tab,TextField,
    RichTextField,BooleanField,ShowController,
    ShowView,EmailField,FunctionField,Labeled,
    ReferenceField,UrlField,
    useRecordContext,
    DateField,
    ChipField,
    ArrayField,
    Datagrid,
    List,
    WithRecord,
    TopToolbar,
    Button,
    useDataProvider,
    useNotify,
    useRefresh} from 'react-admin'

import {downloadUrl} from '../config'


import {RequestStatus} from '../utils/request';
import {DateDisplay} from '../utils/generic';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import MuTextField from '@mui/material/TextField';
import { makeStyles } from '@mui/material/styles';
import CollapsibleTableEx from '../shows/CollapsibleTableEx';
import Aside from './Aside';
import { CardActions, CardContent, Drawer, Grid, Stack, Toolbar } from '@mui/material';
import { FullName } from '../utils/FullName';

import MuButton from '@mui/material/Button';
import MuIconButton from '@mui/material/IconButton';
import MuDeleteIcon from '@mui/icons-material/Delete';
import MuEditIcon from '@mui/icons-material/Edit';


const Title = () => {
    return <span>Visualisation d'une commande </span>;
};



const OrderShow = () => {
    return (
        <Show 
            title={<Title />} 
            aside={<Aside />}
        >
            <TabbedShowLayout>
             <Tab label="Résumé">
                   {/*  <ReferenceField label="Offre"  link = "show" source="offer" reference="offers">
                        <TextField  source='id' />
                    </ReferenceField> */}
                    
                    <GeneralInfoShow/>
                    <OfferShow/>
              </Tab>
                <Tab label="Suivi">
                    <MonitoringShow/>
                </Tab>
                <Tab label="Paiements du Client">
                    <CustomerPaymentsShow/>
                </Tab>
                <Tab label="Paiements au Transitaire">
                     <ForwarderPaymentsShow/>
                </Tab>

               {/*  <Tab label="Documents">
                    <div>Liste des documents de la commande ?</div>
                </Tab> */}
            </TabbedShowLayout>
        </Show>
    );
};

const PaymentsActions = ({onAddPaymentClicked}:{onAddPaymentClicked:any}) => (
    <TopToolbar>
        <MuButton onClick={onAddPaymentClicked}>ADD PAYMENT</MuButton>
    </TopToolbar>
);

const ForwarderPaymentsShow = () => {
    const record = useRecordContext();
    console.log("ForwarderPaymentsShow Order Record : ",record)
    const forwarderId = record?.offer?.forwarder._id
    console.log("ForwarderPaymentsShow Forwarder ID  : ",forwarderId) 

    const [open,setOpen] = useState(false);
    const [edition,setEdition] = useState("none");
    const [editedRecord,setEditedRecord] = useState(null as any);
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const refresh = useRefresh();
  
  
     const onEditClicked = (record:any) => {
            setEdition("edit")
            setEditedRecord(record);
            setOpen(true);
     }
     
     const onAddClicked = () => {
          setEdition("create")
          setEditedRecord(
            {
             order:record?.id, 
             forwarder: forwarderId,
             type:"",
             montant:0,
             info:""
            }
          )
          setOpen(true) 
     }

     const onCancelClicked = () => {
           setOpen(false);
           setEdition("none")
           setEditedRecord(null);
     }

     const onSave = async (record:any,newRecord:any) => {

        if(edition=="edit") editPayment(newRecord)
        else if(edition=="create") createPayment(newRecord)
        
    }

    const createPayment = async (newRecord:any) => {
        const {data} = await  dataProvider.create("forwarderpayments",{
            data:newRecord
           })

      if(data){
          refresh();
          notify("Création avec succès", { type: 'success' });
          setOpen(false)
      }   
      else {
          notify("Error lors de la création", { type: 'error' });
      }
    }

    const editPayment = async (newRecord:any) => {
        const {data} = await  dataProvider.update("forwarderpayments",{
            id:record?.id,
            data:newRecord,
            previousData:record
           })

      if(data){
          refresh();
          notify("Modifié avec succès", { type: 'success' });
          setOpen(false)
      }   
      else {
          notify("Error lors de la modification", { type: 'error' });
      }
    }

    const editPaymentDrawerProps = {
        open,
        editedRecord,
        onCancelClicked, 
        renderForm: () => <EditPaymentForm record={editedRecord} onCancel={onCancelClicked} onSave={onSave} />
     }
    

    return (
        <List
            perPage={50}   
            resource='forwarderpayments'
            filter={{ forwarder: forwarderId }}
            actions={<PaymentsActions onAddPaymentClicked={onAddClicked}/>}
             empty={false}
        >
            <Datagrid bulkActionButtons={false} title=''>
              
                <TextField
                    source='id'
                    label="ID"
                />
                <ReferenceField label="Transitaire"  source="forwarder" reference="users">
                        <WithRecord render={record => <span>{record?.first_name + " "+record?.last_name}</span>} />
                </ReferenceField>
        
                <TextField
                    source='montant'
                    label="Montant"
                />   
                 <TextField
                    source='type'
                    label="Type"
                /> 
                <TextField
                    source='info'
                    label="Info"
                /> 
                <DateField
                    source='date_update'
                    label="Date"
                />
                 
            
                <WithRecord 
                    render={record => (
                    <span>
                        <MuIconButton  onClick={()=>onEditClicked(record)}>
                            <MuEditIcon />
                        </MuIconButton>
                    {/*      <MuIconButton  onClick={e=>console.log("Delete Clicked")}>
                            <MuDeleteIcon />
                        </MuIconButton> */}
                    </span>
                    )
                } 

                />
             
                
                
            </Datagrid>
            <PaymentDrawer {...editPaymentDrawerProps} />
        </List>
    )
}

const CustomerPaymentsShow = () => {
    const record = useRecordContext();
    console.log("CustomerPaymentsShow Order Record : ",record)
    const userId = record?.offer?.request?.user?._id
    console.log("CustomerPaymentsShow User ID  : ",userId) 

    const [open,setOpen] = useState(false);
    const [edition,setEdition] = useState("none");
    const [editedRecord,setEditedRecord] = useState(null as any);
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const refresh = useRefresh();
  
  
     const onEditClicked = (record:any) => {
            setEdition("edit")
            setEditedRecord(record);
            setOpen(true);
     }
     
     const onAddClicked = () => {
          setEdition("create")
          setEditedRecord(
            {
             order:record?.id, 
             user: userId,
             type:"",
             montant:0,
             info:""
            }
          )
          setOpen(true) 
     }

     const onCancelClicked = () => {
           setOpen(false);
           setEdition("none")
           setEditedRecord(null);
     }

     const onSave = async (record:any,newRecord:any) => {

        if(edition=="edit") editPayment(newRecord)
        else if(edition=="create") createPayment(newRecord)
        
    }

    const createPayment = async (newRecord:any) => {
        const {data} = await  dataProvider.create("customerpayments",{
            data:newRecord
           })

      if(data){
          refresh();
          notify("Création avec succès", { type: 'success' });
          setOpen(false)
      }   
      else {
          notify("Error lors de la création", { type: 'error' });
      }
    }

    const editPayment = async (newRecord:any) => {
        const {data} = await  dataProvider.update("customerpayments",{
            id:record?.id,
            data:newRecord,
            previousData:record
           })

      if(data){
          refresh();
          notify("Modifié avec succès", { type: 'success' });
          setOpen(false)
      }   
      else {
          notify("Error lors de la modification", { type: 'error' });
      }
    }

    const editPaymentDrawerProps = {
        open,
        editedRecord,
        onCancelClicked, 
        renderForm: () => <EditPaymentForm record={editedRecord} onCancel={onCancelClicked} onSave={onSave} />
     }
    

    return (
        <List
            perPage={50}   
            resource='customerpayments'
            filter={{ user: userId }}
            actions={<PaymentsActions onAddPaymentClicked={onAddClicked}/>}
            empty={false}
        >
            <Datagrid bulkActionButtons={false} title=''>
              
                <TextField
                    source='id'
                    label="ID"
                />
                <ReferenceField label="Client"  source="user" reference="users">
                        <WithRecord render={record => <span>{record?.first_name + " "+record?.last_name}</span>} />
                </ReferenceField>
        
                <TextField
                    source='montant'
                    label="Montant"
                />   
                 <TextField
                    source='type'
                    label="Type"
                /> 
                <TextField
                    source='info'
                    label="Info"
                /> 
                <DateField
                    source='date_update'
                    label="Date"
                />
                 
            
                <WithRecord 
                    render={record => (
                    <span>
                        <MuIconButton  onClick={()=>onEditClicked(record)}>
                            <MuEditIcon />
                        </MuIconButton>
                    {/*      <MuIconButton  onClick={e=>console.log("Delete Clicked")}>
                            <MuDeleteIcon />
                        </MuIconButton> */}
                    </span>
                    )
                } 

                />
             
                
                
            </Datagrid>
            <PaymentDrawer {...editPaymentDrawerProps} />
        </List>
    )
}

type EditDrawerProps = {
    open?:boolean,
    renderForm?:any,
    editedRecord?:any,
}

const PaymentDrawer = ({open=false,renderForm=()=>null}:EditDrawerProps) => {

    
    return (
        <Drawer
                anchor="right"
                open={open}
            >
            <Box
                sx={{ width: 350 }}
                role="presentation"
            >
                 <Toolbar sx={{backgroundColor:'#2196f3'}}> 
                    <Typography sx={{color:'white'}} variant="subtitle2" noWrap> 
                        {"Creation/Modification > "}
                    </Typography> 
                 </Toolbar>
                 
                 {renderForm()}
               
             </Box>
          </Drawer>
    )
}

const FormSaveCancel = ({onSave,onCancel}:{onSave:any,onCancel:any}) => (
    <>
    <Button  label='ENREGISTRER' onClick={onSave}></Button>
    <Button  color="error" label='ANNULER' onClick={onCancel}></Button>
    </>
)

const EditPaymentForm = ({record,onSave=()=>{},onCancel=()=>{}}:{record:any,onSave?:any,onCancel?:any}) => {

    const [newValue,setNewValue] = useState(record)
    console.log("newValue = ",newValue)
        return (
            <>
             <CardContent>
             <Grid container spacing={2}>
               <Grid item xs={12}>
                     <MuTextField 
                        label={"Type"} 
                        variant="filled"
                        value={newValue?.type} 
                        onChange={e=>setNewValue({...newValue,type:e.target.value})}
                        multiline />

                        <MuTextField 
                        label={"Montant"} 
                        variant="filled"
                        value={newValue?.montant} 
                        onChange={e=>setNewValue({...newValue,montant:e.target.value})}
                        multiline />

                        <MuTextField 
                        label={"Infos"} 
                        variant="filled"
                        value={newValue?.info} 
                        onChange={e=>setNewValue({...newValue,info:e.target.value})}
                        multiline />
               </Grid>
             </Grid>
                 
             </CardContent>
             <CardActions>
                   <FormSaveCancel onCancel={onCancel} onSave={()=>onSave(record,newValue)}/>
             </CardActions>
             </>
         )
    
}


/* const PaymentsShow = () => (
    <ArrayField label="Liste des paiements" source="payments">
        <Datagrid bulkActionButtons={false}>
            <DateField  source="date"  label="Date"/>
            <TextField source="amount" label="Montant"/>
            <TextField source="description" label="Description"/>
        </Datagrid>
    </ArrayField>
)
 */
export const OfferShow = () => (
    <Stack spacing={2}>
        <h3>Details de l'offre</h3>
        <Labeled>
        <FunctionField 
            label="Transitaire" 
            render={({offer}) => <FullName record={offer?.forwarder} />} 
        /> 
        </Labeled>

        <Labeled>
        <TextField label="Prix" source="offer.amount"  />
        </Labeled>

        <Labeled>
         <TextField label="Prix dédouanement" source="offer.price_clearance"  />
        </Labeled>
        
        <Labeled>
        <TextField label="Commission transitaire" source="offer.price_forwarder"  />
        </Labeled>

        <h3>Frais EasyTransit</h3>
        <Labeled>
        <TextField label="Frais client" source="offer.client_application_fees"  />
        </Labeled>
        
        <Labeled>
        <TextField label="Frais transitaire" source="offer.forwarder_application_fees"  />
        </Labeled>
    

    </Stack>    
)





export const GeneralInfoShow = () => (
    <Stack spacing={2}>

        <h3>Infos Cargaison</h3>
        <Labeled>
        <FunctionField 
            label="Client" 
            render={({offer}) => <FullName record={offer?.request?.user} />} 
        /> 
        </Labeled>

        <Labeled>
         <TextField label="Route" source="offer.request.route" />
        </Labeled>
        
        <Labeled>
        <TextField label="Origine" source="offer.request.place_departure" />
        </Labeled>

        <Labeled>
        <TextField label="Destination" source="offer.request.place_arrival" />
        </Labeled>

        <Labeled>
        <DateField label="Date d'arrivée (estimée)" source="offer.request.expected_arrival" />
        </Labeled>

        <h3>Infos Commande</h3>
        <Labeled>
           <TextField label="Commentaire" source="comment" />
        </Labeled>

        <Labeled>
          <DateField label="Créé le" source="date_creation"/>
        </Labeled>
        
        <Labeled>
           <DateField label="Livraison prévue le" source="delivery_date"/>
        </Labeled>
        
        <Labeled>
            <ChipField label="Statut" source="status" />
        </Labeled>
    </Stack>
)

export const MonitoringShow = () => (
    <Stack spacing={2}>

        <h3>Avance / Retard</h3>
        <Labeled>
            <TextField label="Nombre de jours de retard" source="penalities.delay"/>
        </Labeled>

        <h3>Pénalités</h3>
        <Labeled>
             <TextField label="Montant de pénalités calculé" source="penalities.amount"/>
        </Labeled>
  

    </Stack>
)


export default OrderShow;

