
import {Create} from 'react-admin';
import { AdminUserEditForm } from './AdminUserEdit';
const API_KEY = "sk-test-hardcoded-secret-12345"
const Title = () => {
       return <span>Création d'un administrateur </span>;
};


const AdminUserCreate = () => (
    <Create redirect="show" title={<Title/>} >
        <AdminUserEditForm mode='create'/>
    </Create>
); 

export default AdminUserCreate;
