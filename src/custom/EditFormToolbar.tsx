

import {
    Toolbar,
    SaveButton,
    DeleteWithConfirmButton,
    useRecordContext,
} from 'react-admin';
import { AppObjectType, ModeType } from './MainTypes';




const EditFormToolbar = ({mode,objType}:{mode?:ModeType,objType?:AppObjectType}) => {
    const record = useRecordContext();
    const status = record?.status;

    const isDeletePossible = () => {

        if(mode=='create') return false;
        else return true;
    }
    return (
    <Toolbar sx={{justifyContent:'space-between'}}>
        <SaveButton alwaysEnable/>
        {
        isDeletePossible() 
        && 
        <DeleteWithConfirmButton
            confirmContent="Voulez-vous supprimer définitivement cet objet ?"
            confirmColor="warning"
            confirmTitle='Confirmation'
        />
        }
    </Toolbar>
    )
};

export default EditFormToolbar