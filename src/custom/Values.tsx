import {
    ArrayInput,
    SimpleFormIterator,
    TextInput,

} from 'react-admin';
import {Stack, Typography } from '@mui/material';


export type ValueObjType = {
    value:string,
}
export type ValuesDisplayProps = {
    icon? : JSX.Element|null,
    title?:string,
    values:Array<ValueObjType>
}

export const ValuesDisplay = ({icon=null,title='',values=[]}:ValuesDisplayProps) => (
    <Stack>
        <Typography variant='subtitle2' gutterBottom>
            {title}
        </Typography>
    {
    values.map(({value})=> <Typography variant="overline" gutterBottom>{icon}{value}</Typography>)
    }
    </Stack>
)

export const ValuesEdit = ({title='',sourceArray='',sourceValue='value',valueLabel='value'}) => (
    <>
        <Typography variant='subtitle2' gutterBottom>
            {title}
        </Typography>
        <ArrayInput source={sourceArray} label={false}>
                       <SimpleFormIterator inline>
                           <TextInput label={valueLabel} source={sourceValue} multiline  />
                       </SimpleFormIterator>
        </ArrayInput>
  
    </>
)