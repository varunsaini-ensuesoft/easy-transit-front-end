
import {
    Button,
} from 'react-admin';
import {
    Stack
} from '@mui/material';





const ValidationBox = ({onAccepted=()=>{},onRejected=()=>{}}) => (
    <Stack direction="row" justifyContent="space-between">
        <Button sx={{marginRight:'5px'}} label = "ACCEPTER" variant="contained" onClick={onAccepted} color='success' />
        <Button sx={{marginLeft:'5px'}} label = "REJETER" variant="contained" onClick={onRejected} color='warning'/>
    </Stack>  
)


export default ValidationBox;