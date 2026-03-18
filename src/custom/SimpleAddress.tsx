import { SxProps, Typography } from '@mui/material';
import { memo } from 'react';
import MuLocationIcon from '@mui/icons-material/LocationOn';
import { AddressType } from './MainTypes';

type Props = {
    sx?: SxProps,
    showTitle?:boolean,
    address?: Array<AddressType>
}

const SimpleAddress = ({sx,showTitle=false,address}: Props) => {

    return (
        <>
        <Typography variant="subtitle2" gutterBottom>
             {showTitle && "Adresse(s)"}
        </Typography> 
        {
                address?.map((el,i) => (
                            <Typography
                                variant="body2"
                                display="flex"
                                flexWrap="nowrap"
                                alignItems="center"
                                component="div"
                                sx={sx}
                                key={i}
                            >
                                <MuLocationIcon color='info' fontSize='small'/> {el?.value}
                
                            </Typography>
                       
                ))
        }
        </>

    );
        
};

export default memo<Props>(SimpleAddress);
