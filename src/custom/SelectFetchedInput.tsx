
import {

    SelectInput,
    required,
    useNotify,
    Validator,
 
} from 'react-admin';



import { useEffect, useState } from 'react';
import { supabase } from '../supabase/mySupabaseClient';

type SelectFetchedInputPropsType = {
 source:string,
 label:string,
 defaultChoices?:Array<{[key:string]:string|number}>,
 parse?: (value:any)=>any,
 format:(value:any)=>any,
 optionText?:string,
 optionValue?:string,
 defaultValue?:any,
 validate?: Validator | Validator[],
 fetchFunc:  () => any
}


const SelectFetchedInput = ({source,label,defaultChoices,defaultValue,optionText,optionValue,parse,format,validate,fetchFunc}:SelectFetchedInputPropsType) => {
  const [choices,setChoices] = useState(defaultChoices?defaultChoices:[]);

  const fetchData = async () => {
    const results =  await fetchFunc();
    if(results){
        setChoices(results)
    }
    
}

 const defaultParse = (value:any) => {
    return choices.find(choice => format(choice)==value)
 }



useEffect(() => {
    fetchData()
}, [])

return (
    <SelectInput label={label} source={source} choices={choices}
         defaultValue={defaultValue}
         validate={validate}
         optionText={optionText}
         optionValue={optionValue}
         parse = {parse?parse:defaultParse}
         format = {format}

    />
)
}

export default SelectFetchedInput;







