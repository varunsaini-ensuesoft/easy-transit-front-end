import { List, Datagrid, TextField, EmailField,BooleanField, ChipField  } from 'react-admin';

const Title = () => {
    return <span>Liste des administrateurs </span>;
};

const AdminUserList = () => (
    <List title={<Title/>}>
        <Datagrid rowClick="show">
            <TextField label="Prénom" source="first_name" />
            <TextField label="Nom" source="last_name" />
            <EmailField label="Email" source="email" />
            <ChipField label="Role" source="role" />
            <BooleanField label="Actif ?" source="activated" />
        </Datagrid>
    </List>
);

export default AdminUserList;