
import React from 'react';
import {Edit,TabbedForm,FormTab,
        TextInput,BooleanInput,
        required,Toolbar,SaveButton,BooleanField,FunctionField,EmailField,
        TextField,SelectInput,
        Labeled,
        DateInput,
        NumberInput,
        ArrayField,
        DateField,
        useFormGroupContext,
        useNotify,
        WithRecord,
        RecordContextProvider} from 'react-admin';


import Aside from './Aside';
import { MessagesList } from './DisputeShow';
import { useFormContext,useWatch } from 'react-hook-form';
import { Button, Stack, Typography } from "@mui/material";

const Title = () => {
       return <span>Edition d'un ticket</span>;
};

const EditToolbar = (props:any) => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);
/*
*<TabbedShowLayout>
                <Tab label="Résumé">
                        <h3>Informations Générales</h3>
                        <TextField label="ID" source="id" />
                        <TextField label="Titre" source="title" />
                        <DateField label="Crée le" source="opened_at" />
                        <TextField label="Priority" source="priority" />
                        

                        <h3>{"Traitement"}</h3>
                        <TextField label="Statut" source="status" />
                        <DateField label="A traiter avant" source="sla_due_at" />
                        <DateField label="Fermé le" source="closed_at" />

                       
                </Tab>
                <Tab label="CONVERSATION">
                        <ArrayField source="messages">
                            <MessagesList/>
                        </ArrayField>
                </Tab>
            </TabbedShowLayout>
        </Show>
*/

const statusChoices = [
   { id: 'OPEN', name: 'OPEN' },
   { id: 'REJECTED', name: 'REJECTED' },
   { id: 'RESOLVED', name: 'RESOLVED' },
];
export const DisputeEditForm = ({mode='edit'}:{mode?:'edit'|'create'}) => {

    return (
     
            <TabbedForm syncWithLocation={false}  toolbar={<EditToolbar/>} >
                   <FormTab label="Résumé">
                    <h3>Informations Générales</h3>
                        <Labeled>
                        <TextField label="Titre" source="title" />
                        </Labeled>
                        <Labeled>
                            <DateField label="Crée le" source="opened_at" />
                        </Labeled>
                        
                        <NumberInput label="Priority" source="priority" />
                        
                        <h3>{"Traitement"}</h3>
                        <SelectInput label="Statut" source="status"  choices={statusChoices}/>
                        <DateInput label="A traiter avant" source="sla_due_at" />
                        <DateInput label="Fermé le" source="closed_at" />
                        
                 </FormTab>
                 <FormTab label="Conversation">
                        <WithRecord
                            render={record => 
                                <RecordContextProvider value={record}>
                                    <ArrayField source="messages">
                                        <MessagesList requestId={record?.order?.offer?.request?._id}/>
                                    </ArrayField>
                                </RecordContextProvider>
                                
                            } 
                                                
                        />
                        <MessagesComposer/>
                 </FormTab>
                                   
            </TabbedForm>
    
    );
};

const DisputeEdit = () => (
    <Edit title={<Title/>} aside={<Aside/>}>
        <DisputeEditForm/>
    </Edit>
);


 export const MessagesComposer = () => {
  const { getValues,setValue } = useFormContext();

  console.log("MESSAGES = ",getValues("messages"))

  const messages = useWatch({ name: "messages" }) ?? [];

  const [text, setText] = React.useState("");
  const [addedMessages, setAddedMessages] = React.useState([]as Array<any>);

  const addMessage = () => {
    const trimmed = text.trim();
    if (!trimmed) return;


    const newMessage = {
      body: trimmed,
      date: new Date().toISOString(),
      author: null,
      type:"TEXT",
      seen:false,
    };

    setValue("messages", [...messages, newMessage], {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setAddedMessages ([...addedMessages,newMessage])

    setText("");
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Messages ajoutés</Typography>

      {addedMessages.map(m => <div>. {m.body}</div>)}

      {/* Your "textarea" */}
      <TextInput
        source="__messageDraft"     // not saved (fake field)
        label="New message"
        multiline
        minRows={4}
        fullWidth
        value={text}
        onChange={(e: any) => setText(e.target.value)}
        helperText={false}
      />

      <Button variant="contained" onClick={addMessage}>
        Ajouter Message
      </Button>

     
      
    </Stack>
  );
};

export default DisputeEdit;