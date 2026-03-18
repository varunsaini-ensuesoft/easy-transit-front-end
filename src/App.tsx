
import { Admin, CustomRoutes, NotFoundClasses, Resource} from 'react-admin';
import { Layout, Login } from './layout/';
import  authProvider  from './authProvider';

import users_app from "./users_app/index";
import requests from "./requests/index";
import offer_orders from './offer_orders/index';

import users from "./users/index";
import admins from "./admins/index"


import disputes from "./disputes/index";

import NotFound from './NotFound';

import { Route } from "react-router-dom";
import i18nProvider from './i18nProvider';
import adminProvider from './providers/adminProvider';
import MyProfile from './my_profile/MyProfile';


export const App = () => (
    <Admin
        layout={Layout}
        dataProvider={adminProvider}
		authProvider={authProvider}
        loginPage={Login}
        catchAll={NotFound}
        requireAuth
	>
        

        <Resource name="users"  {...users}/> 
        <Resource name="adminUsers"  {...admins}/> 
        
        {/* <Resource name="profiles"  {...users_app}/>  */}
        <Resource  name="requests" {...requests}/>
        <Resource  name="orders" {...offer_orders}/>

        <Resource  name="disputes" {...disputes}/>

        <Resource  name="forwarderpayments" hasCreate={false} hasEdit={false} hasShow={false} />
        {/* <Resource  name="disputeMessages" hasCreate={false} hasEdit={false} hasShow={false} /> */}
         
        <Resource  name="customerpayments" />
      
        <CustomRoutes>
            <Route path="/profil" element={<MyProfile />} />
        </CustomRoutes>
     
       
    </Admin>
);

    