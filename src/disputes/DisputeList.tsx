import { List, Datagrid, TextField, EmailField,BooleanField,FunctionField, ReferenceField, DateField  } from 'react-admin';



const Title = () => {
    return <span>Tickets</span>;
};



const DisputeList = (props:any) => (
    <List title={<Title/>} {...props}>
        <Datagrid rowClick="show">
            <TextField label="ID" source="id" />
            <ReferenceField label="Commande" link = "show" source="order" reference="orders">
                 <TextField  source='id' />
            </ReferenceField> 
            <TextField label="Titre" source="title" />
            <TextField label="Statut" source="status" />
            <TextField label="Priorité" source="priority" />
            <DateField label="Crée le" source="opened_at" />
        </Datagrid>
    </List>
);

export default DisputeList;