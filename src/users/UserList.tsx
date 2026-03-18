import { List, Datagrid, TextField, EmailField,BooleanField,FunctionField  } from 'react-admin';
import Tooltip from '@mui/material//Tooltip';
import StatusComplete from '@mui/icons-material/PlaylistAddCheck';
import StatusDefault from '@mui/icons-material/Notes'
import StatusValidated from '@mui/icons-material/DoneAll'
import StatusInvalid from '@mui/icons-material/Close'




const Profil = ({status}:{status:string}) => {
    return (
        <span>
            {(status=="Default") && <Tooltip title="Pas complet"><StatusDefault/></Tooltip> }
            {(status=="Complete") && <Tooltip title="Complet"><StatusComplete/></Tooltip> }
            {(status=="Validated") && <Tooltip title="Validé"><StatusValidated style={{color:"green"}}/></Tooltip> }
            {(status=="Problem") && <Tooltip title="Problématique"><StatusValidated style={{color:"red"}}/></Tooltip> }
            {(status=="Invalid") && <Tooltip title="Email non validé"><StatusInvalid style={{color:"red"}}/></Tooltip> }
        </span>
    )
    
}


const Title = () => {
    return <span>Liste des utilisateurs </span>;
};

const CertifiedAvatar = ({show}:{show:boolean}) => show?<Tooltip title="Certifié"><span style={{backgroundColor:'grey',borderRadius:'50%',padding:3}}>C</span></Tooltip>:null


const UserList = (props:any) => (
    <List title={<Title/>} {...props}>
        <Datagrid rowClick="show">
            <TextField label="Prénom" source="first_name" />
            <TextField label="Nom" source="last_name" />
            <EmailField label="Email" source="email" />
            <FunctionField label="Profil" render={record => <span>{record.profil.type} <CertifiedAvatar show={record.profil.isCertified} /></span>} />
            <FunctionField label="Tel" render={record => (record && record.phone)?`(${record.phone.phone_code}) ${record.phone.phone_number}`:""} />
            <FunctionField label="Status" render={record => <Profil status = {record.validation.status} />} />
        </Datagrid>
    </List>
);

export default UserList;