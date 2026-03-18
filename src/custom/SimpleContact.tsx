import {Typography,Box,SxProps } from '@mui/material';
import { memo } from 'react';
import MuContactNameIcon from '@mui/icons-material/ContactPage';
import MuContactTelIcon from '@mui/icons-material/Call';
import MuContactEmailIcon from '@mui/icons-material/AlternateEmail';
import MuContactFaxIcon from '@mui/icons-material/Fax';
import { ContactType } from './MainTypes';

type ContactBoxProps = {
    contact:ContactType;
}
type IconProps = {
    sx?:SxProps,
    fontSize?:'large'|'medium'|'small'
}

const ContactBox = ({contact}:ContactBoxProps) => {

    const {name,tel,email,fax} = contact;
    const iconProps = {
        sx:{color:'gray'},
        fontSize:'small'
    } as IconProps


    return (
        <Box sx={{ borderLeft: '2px solid gray',paddingLeft:'5px' }}>
             <Typography
                variant="body2"
                display="flex"
                flexWrap="nowrap"
                alignItems="center"
                component="div"
            >
                <MuContactNameIcon {...iconProps} /> {name}
                
            </Typography>
            <Typography
                variant="body2"
                display="flex"
                flexWrap="nowrap"
                alignItems="center"
                component="div"
            >
                <MuContactTelIcon {...iconProps}/> {tel}
                
            </Typography>
            <Typography
                variant="body2"
                display="flex"
                flexWrap="nowrap"
                alignItems="center"
                component="div"
            >
                <MuContactEmailIcon {...iconProps} /> {email}
                
            </Typography>
            <Typography
                variant="body2"
                display="flex"
                flexWrap="nowrap"
                alignItems="center"
                component="div"
            >
                <MuContactFaxIcon {...iconProps}/> {fax}
                
            </Typography>
                
        </Box>

    );
        
};

type SimpleContactProps = {
    contacts : Array<ContactType>,
    showTitle ?: boolean
}

const SimpleContact = ({showTitle=true,contacts}:SimpleContactProps) => {


    return (
        <>
         <Typography variant="subtitle2" gutterBottom>
             {showTitle && "Contact(s)"}
        </Typography> 
        {
            contacts?.map(contact => (
                <>
                    <ContactBox contact={contact}/>
                    <Box mt="20px"/>
                </>
            ))
        }
        </>
    )

}


export default memo<SimpleContactProps>(SimpleContact);