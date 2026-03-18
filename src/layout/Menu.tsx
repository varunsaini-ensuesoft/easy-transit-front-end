import * as React from 'react';
import { useState } from 'react';
import { Box } from '@mui/material';
import LabelIcon from '@mui/icons-material/Label';

import {
    useTranslate,
    DashboardMenuItem,
    MenuItemLink,
    MenuProps,
    useSidebarState,
} from 'react-admin';

import SubMenu from './SubMenu';

import orders from '../offer_orders/index'


/*
import clients from '../clients/index'
import invoices from '../invoices/index';
import bocs from '../bill_of_credits/index';
import deliveryNotes from '../deliverynotes/index';
import productionFiles from '../productionfiles/index';
*/
import requests from '../requests/index'

import users from '../users_app/index'

import disputes from "../disputes/index";

import admins from '../admins/index'




type MenuName = 'menuWork' | 'menuSales' | 'menuConfiguration';

const Menu = ({ dense = false }: MenuProps) => {
    const [state, setState] = useState({
        menuWork: true,
        menuSales: true,
        menuConfiguration: true,
    });
    //const translate = useTranslate();
    const [open] = useSidebarState();

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <Box
            sx={{
                width: open ? 200 : 50,
                marginTop: 1,
                marginBottom: 1,
                transition: theme =>
                    theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
            }}
        >
            {/* <!--<DashboardMenuItem />*/}
            <SubMenu
                handleToggle={() => handleToggle('menuSales')}
                isOpen={state.menuSales}
                name="Commercial"
                icon={<orders.icon />}
                dense={dense}
            >

                <MenuItemLink
                    to="/orders"
                    state={{ _scrollToTop: true }}
                    primaryText="Commandes"
                    leftIcon={<orders.icon />}
                    dense={dense}
                />
              {/*   <MenuItemLink
                    to="/payments"
                    state={{ _scrollToTop: true }}
                    primaryText="Paiements"
                    leftIcon={<invoices.icon/>}
                    dense={dense}
                /> */}

            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuWork')}
                isOpen={state.menuWork}
                name="Gestion"
                icon={<users.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to="/users"
                    state={{ _scrollToTop: true }}
                    primaryText="Utilisateurs"
                    leftIcon={<users.icon />}
                    dense={dense}
                />
                <MenuItemLink
                    to="/requests"
                    state={{ _scrollToTop: true }}
                    primaryText="Annonces"
                    leftIcon={<requests.icon />}
                    dense={dense}
                />
                <MenuItemLink
                    to="/disputes"
                    state={{ _scrollToTop: true }}
                    primaryText="Tickets"
                    leftIcon={<disputes.icon />}
                    dense={dense}
                />
            </SubMenu>
            <SubMenu
                handleToggle={() => handleToggle('menuConfiguration')}
                isOpen={state.menuWork}
                name="Configuration"
                icon={<admins.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to="/adminUsers"
                    state={{ _scrollToTop: true }}
                    primaryText="Administrateurs"
                    leftIcon={<admins.icon />}
                    dense={dense}
                />
                {/* <MenuItemLink
                    to="/settings"
                    state={{ _scrollToTop: true }}
                    primaryText="Réglages"
                    leftIcon={<admins.icon />}
                    dense={dense}
                /> */}
             
            </SubMenu>
            
        </Box>
    );
};


export default Menu;