
import {
    ChipField,
    useRecordContext,
    WithRecord,
   
} from 'react-admin';

import MuChip from '@mui/material/Chip';




const ShowStatusChip = ({source='status',successValue,warningValue,errorValue}
    : {source?:string,successValue:string,warningValue?:string,errorValue?:string}
) => {
    const record = useRecordContext();
    if(!record) return null;

    const status = record[source];
    let color:'default'|'success'|'warning'|'error' = 'default'

    if(status==successValue) color = 'success'
    else if(status==warningValue) color = 'warning'
    else if(status==errorValue) color = 'error'
 
    return  (
        <ChipField source={source} variant='outlined' color={color} />
    )


}

export default ShowStatusChip;

type ShowStatusChipExProps = {
    source?:string,
    successValues?:Array<string>,
    warningValues?:Array<string>,
    errorValues?:Array<string>
    labelFunc?:(text:string)=>string
    size?:'medium'|'small'
    label?:string
}
export const ShowStatusChipEx = ({source='status',successValues=[],warningValues=[],errorValues=[],labelFunc,size='medium'}
    : ShowStatusChipExProps
) => {
    const record = useRecordContext();
    if(!record) return null;

    const status = record[source];
    const displayedText = labelFunc?labelFunc(status):status;
    let color:'default'|'success'|'warning'|'error' = 'default';

    if(successValues.indexOf(status)!=-1) color = 'success'
    else if(warningValues.indexOf(status)!=-1) color = 'warning'
    else if(errorValues.indexOf(status)!=-1) color = 'error'
 
    return  (
        <MuChip label={displayedText} variant='outlined' color={color} size={size} />
    )


}

