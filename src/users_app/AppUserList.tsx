
import {
    CreateButton,
    DatagridConfigurable,
    List,
    SearchInput,
    SelectColumnsButton,
    TopToolbar,
    EmailField,
    TextField,
    BooleanField,
    WithRecord,
    useRecordContext,
    useDataProvider,
    useNotify,
    useRefresh
} from 'react-admin';

import {Stack } from '@mui/material';
import ActionsMenu from './ActionsMenu';
import { getUserRolesExcept } from '../custom/mainConstants';

import MuBlockUserIcon from '@mui/icons-material/Block';
import MuChangeUserRoleIcon from '@mui/icons-material/PermIdentity';

const userFilters = [
    <SearchInput source="fullname:ilike" alwaysOn  placeholder='Recherche par nom'/>,
];

const UserListActions = () => (
    <TopToolbar>
        <CreateButton />
        <SelectColumnsButton />
    </TopToolbar>
);

const UserList = () => {
       return (
        <List
            filters={userFilters}
            perPage={50}
            actions={<UserListActions />}
            sort={{field:'created_at',order:'DESC'}}
        >
            <DatagridConfigurable
                    rowClick={false}
                    sx={{
                        '& .column-groups': {
                            md: { display: 'none' },
                            lg: { display: 'table-cell' },
                        },
                    }}
             >
              
                <TextField
                    source='firstname'
                    label="Prénom"
                />

                <TextField
                    source='lastname'
                    label="Nom"
                />
                
                <EmailField
                    source='email'
                    label="Email"
                />

                <TextField
                    source='role'
                    label="Role"
                />

                <BooleanField
                    source='activated'
                    label="Actif ?"
                />

                <WithRecord 
                    label="Actions"
                    render={record => <UserActions/>}
                 />


            </DatagridConfigurable>
            
        </List>
    );
};
export default UserList;

const UserActions = () => {
    const record = useRecordContext();
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const refresh = useRefresh();

    if(!record) return null;
    const {id,activated,role} = record;

    const resetPassword = () => {
            //dataProvider.update()
    }

    const updateUser = async (newData:any) => {
        console.log("updating user")
        const {data} = await  dataProvider.update("profiles",{
            id,
            data:newData,
            previousData:record}
        )

        if(data){
            console.log("toggle response ",data)
            notify("L'utilisateur a été mis à jour avec succès", { type: 'success' });
            refresh();
        }   
        else {
             notify("Erreur lors de la mise à jour de l'utilisateur", { type: 'error' });
        }
    }
    const toggleActivation = () => updateUser({...record,activated:!activated}) 

    const activateOption = {
        itemTitle:(activated ? "Désactiver":"Activer")+" l'utilisateur",
        onItemClicked : toggleActivation,
        itemIcon:<MuBlockUserIcon/>
    }

    const changeRole = (newRole:string) => updateUser({...record,role:newRole}) 

    const otherRoles = getUserRolesExcept(role);

    const otherRolesOptions = otherRoles.map(curRole=>(
        {
            itemTitle : "Changer le role à " + curRole,
            onItemClicked : () => changeRole(curRole),
            itemIcon:<MuChangeUserRoleIcon/>
        }
    ));

    const actionsMenuOptions = [activateOption,...otherRolesOptions]

    const resetPasswordOption = {
        itemTitle : "Réinitialiser le mot de passe",
        onItemClicked : resetPassword
    }

    return (
        <Stack direction="row">
             <ActionsMenu label="Modifier" options={actionsMenuOptions} />
                        
        </Stack>
    )
}




