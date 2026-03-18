
import {Create} from 'react-admin';
import { AdminUserEditForm } from './AdminUserEdit';

const Title = () => {
       return <span>Création d'un administrateur </span>;
};


const AdminUserCreate = () => (
    <Create redirect="show" title={<Title/>} >
        <AdminUserEditForm mode='create'/>
    </Create>
); 

export default AdminUserCreate;