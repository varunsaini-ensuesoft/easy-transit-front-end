import { TextField } from 'react-admin';


const CompanyFields =  ({ record, source, ...rest }:{record:any,source:string}) =>{
    if(record && record.company_info){
        
        const data = record.company_info

        return (
            <>
            <span>here !!! </span>
            <TextField label="Nom de l'entreprise" record={data} source={"name"} {...rest} />
            </>
        )

    }
    else return null


}
    

export default CompanyFields;