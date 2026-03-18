import {TextField,
    RichTextField,ShowController,
    ShowView,TabbedShowLayout,Tab, ReferenceField,FunctionField,Labeled,
   } from 'react-admin'

import {DateDisplay} from '../utils/generic'

const Title = () => {
    return <span>Visualisation d'un message </span>;
};


const MessageShow = (props:any) => (
    <ShowController {...props}>
        {controllerProps =>
            <ShowView title={<Title/>} {...props} {...controllerProps}>
                <TabbedShowLayout>
                    <Tab label="Résumé">
                        <TextField label="Id" source="id" />
                        <TextField label="Statut" source="status" />
                        <ReferenceField link = "show" source="author" reference="users">
                            <Labeled>
                               <FunctionField  label="Auteur" render={record => `${record.first_name} ${record.last_name}`} />
                            </Labeled>
                            
                        </ReferenceField>
                        <FunctionField 
                            label="Date" 
                            render={({date}) => <DateDisplay dateString={date}/>  } 
                          />
                        <RichTextField label="Texte" source="text" />
                    </Tab>
                </TabbedShowLayout>
            </ShowView>
        }
    </ShowController>
);



export default MessageShow;

