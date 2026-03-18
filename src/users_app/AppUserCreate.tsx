
import {
    SimpleForm,
    TextInput,
    Create,
    SaveContextProvider,
    useNotify,
    useRedirect,
} from 'react-admin';
import { supabase } from '../supabase/mySupabaseClient';
import { AppUserDataType } from './appUserTypes';





export const validateForm = (
    values: Record<string, any>
): Record<string, any> => {
    const errors = {} as any;
    return errors;
};

function generateDefaultPassword(length:number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}


const defaultAppUserValues = {
 
    firstname : "",
    lastname : "",
    email : "",
    password : generateDefaultPassword(8) ,

}

const createNewUser = (user:any) => {

    return {

    } as any
}

const AppUserCreateForm = () => {
    const notify = useNotify();
    const redirect = useRedirect()
    const saving = false;
    const mutationMode = "pessimistic";

  
    //TODO change
    const save =  async({firstname,lastname,email,password}:AppUserDataType) => {

        //
        const { data, error } = createNewUser({
            email,
            password,
            options: {
              data: {
                firstname,
                lastname,
              },
            },
          })

        
        if(error) {
            notify("Erreur lors de la création de l'utilisateur "+error.message, { type: 'error' })
            return;
        }
        
        redirect("list","profiles")
        

        console.log("AppUser created  ",data)
        
    }

    

    return (
    <SaveContextProvider value={{ save, saving, mutationMode }}>
        <SimpleForm validate={validateForm}  defaultValues={defaultAppUserValues}>
                <TextInput label="Prénom" source="firstname" required/>
                <TextInput label="Nom" source="lastname" required />
                <TextInput label="Email" source="email" type='email' required/>
                <TextInput label="Mot de passe" source="password"  required/>                      
        </SimpleForm>
    </SaveContextProvider>
)

}


const AppUserCreate = () => {
    return (
        <Create>
             <AppUserCreateForm/>
        </Create>
    );
};



export default AppUserCreate;


