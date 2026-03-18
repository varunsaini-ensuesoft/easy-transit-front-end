
import { ArrayInput, SimpleFormIterator, TextInput } from 'react-admin';
import {Typography } from '@mui/material';

type Props = {
    source? : string,
    showTitle?:boolean
}
const SimpleContactEdit = ({showTitle=true,source='contacts'}: Props) => {

    return  (
        <>
         <Typography variant="subtitle2" gutterBottom>
            {showTitle && "Contact(s)"}
          </Typography> 
          <ArrayInput label="" source={source} >
                <SimpleFormIterator inline disableClear>
                   <TextInput label='Nom/Description' source='name'  />
                   <TextInput label='Tel' source='tel' />
                   <TextInput label='Email' type='email' source='email' />
                   <TextInput label='Fax'  source='fax' />
                </SimpleFormIterator>
          </ArrayInput>
        </>
        
    ) 
};

export default SimpleContactEdit;
