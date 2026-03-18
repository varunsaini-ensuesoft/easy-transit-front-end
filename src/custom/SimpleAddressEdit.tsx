
import { ArrayInput, required, SimpleFormIterator, TextInput } from 'react-admin';
import {Typography } from '@mui/material';

type Props = {
    source? : string,
    showTitle?:boolean
}

const SimpleAddressEdit = ({showTitle=true,source='address'}: Props) => {

    return  (
        <>
         <Typography variant="subtitle2" gutterBottom>
            {showTitle && "Adresse(s)"}
          </Typography> 
          <ArrayInput label="" source={source} >
                <SimpleFormIterator inline disableClear>
                   <TextInput label='addresse' source='value' validate={required()} />
                </SimpleFormIterator>
           </ArrayInput>
        </>
       
    ) 
};

export default SimpleAddressEdit;
