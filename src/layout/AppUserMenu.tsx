import { Logout, MenuItemLink, UserMenu, useUserMenu } from 'react-admin';
import MyProfileIcon from '@mui/icons-material/AccountCircle';

const ConfigurationMenu = () => {
  const { onClose } = useUserMenu();

    return (
        <MenuItemLink
            to="/profil"
            primaryText="Mon compte"
            leftIcon={<MyProfileIcon/>}
            onClick={onClose}
        />
    );
};

export const AppUserMenu = () => (
    <UserMenu>
        <ConfigurationMenu />
        <Logout title='Déconnexion'/>
    </UserMenu>
);
