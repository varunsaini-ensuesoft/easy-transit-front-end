
import { TextField,EmailField } from 'react-admin';

export const ConditionalTextField =  ({ record, source, ...rest }:{record:any,source:string}) =>
    record && record[source]
        ? <TextField  record={record} source={source} {...rest} />
        : null;



export const ConditionalEmailField =  ({ record, source, ...rest }:{record:any,source:string}) =>
record && record[source]
    ? <EmailField  record={record} source={source} {...rest} />
    : null;