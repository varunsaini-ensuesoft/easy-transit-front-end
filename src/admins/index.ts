
import AdminIcon from '@mui/icons-material/ManageAccounts';
import AdminUserShow from './AdminUserShow';
import AdminUserCreate from './AdminUserCreate';
import AdminUserEdit from './AdminUserEdit';
import AdminUserList from './AdminUserList';

export default {
    icon: AdminIcon,
    show:AdminUserShow,
    create:AdminUserCreate,
    edit:AdminUserEdit,
    list:AdminUserList,
    options:{ label: 'Administrateurs' },
};
