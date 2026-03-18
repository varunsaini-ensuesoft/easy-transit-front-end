import React from 'react';
import {Show, TabbedShowLayout, Tab,TextField,
    RichTextField,BooleanField,ShowController,
    ShowView,EmailField,FunctionField,Labeled,
ImageField,
WithRecord,
DateField,
useGetList,
useInfiniteGetList,
useRecordContext,
ArrayField,
SingleFieldList,
ReferenceField,
WithListContext,
RecordContextProvider} from 'react-admin'

import CertifiedField from '../renderers/field/CertifiedField';
import {downloadDisputeFiles, downloadUrl} from '../config'
import Avatar from '@mui/material/Avatar';
import Aside from './Aside';
import { Card, Stack } from '@mui/material';
import WhatsAppUI, { Messages } from './chat/WhatsAppUI';
import { formatIsoToFrenchShort } from '../utils/DateUtils';

const Title = () => {
    return <span>Visualisation d'un ticket </span>;
};


const messages: Messages = [
    { id: 1, from: "them", text: "Hey! How are you?", time: "10:40" },
    { id: 2, from: "me", text: "I’m good, you?", time: "10:41" },
    { id: 3, from: "them", text: "All good. See you soon!", time: "10:45" },
]

const DisputeShow = () => {
    return (
        <Show 
            title={<Title />} 
            aside={<Aside />}
        >
            <TabbedShowLayout>
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
                        <WithRecord 
                            render={record => 
                              <RecordContextProvider value={record}>
                                  <ArrayField source="messages">
                                      <MessagesList requestId={record?.order?.offer?.request?._id}/>
                                    </ArrayField>
                              </RecordContextProvider>
                            } 
                        
                        />
                        
                       
                </Tab>
            </TabbedShowLayout>
        </Show>
    );
};



export default DisputeShow;


export const MessagesList = ({requestId}:{requestId:any}) => {
 return (
  <WithListContext 
    render={({ data }) => (
      <div style={{ display: "flex", flexDirection: "column", gap: 12,width:"500px",border:"1px solid grey", padding:"10px"}}>
        {data?.map((message: any, index: number) => {
          const isOutgoing = !message.author; // your current user logic

          return (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: isOutgoing ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "65%",
                  padding: "10px 14px",
                  borderRadius: 18,
                  background: isOutgoing ? "#DCF8C6" : "#FFF",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                }}
              >
                {/* Author */}
                <RecordContextProvider value={message}>
                        <FunctionField  render={record => record?.author? <strong>{`${record?.author?.first_name} ${record?.author?.last_name}`}</strong>:null}/>
                </RecordContextProvider>
                

                {/* Body */}
                <div style={{ marginTop: 4 }}>
                  {message.body}
                  <br/>
                  {
                    message.documents?
                      message.documents.map((doc:any)=><a href={downloadDisputeFiles(message?.author?.email,doc,requestId)}>{doc}</a>)
                    :
                    null
                  }
                </div>

                {/* Footer */}
                <div
                  style={{
                    fontSize: 11,
                    opacity: 0.6,
                    marginTop: 6,
                    textAlign: "right",
                  }}
                >
                  {new Date(message.date).toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}
  />
)
} ;

/*
const Conversation = () => {
    const dispute = useRecordContext();
    if(!dispute) return null;

    const disputeId = dispute.id
    const { data,isPending, error } = useGetList(
       'disputeMessages',
       { filter: { dispute:disputeId}, sort: { field: 'created_at', order: 'ASC' } }
   );
   if (isPending) { return <p>LOADING</p>; }
   if (error) { return <p>ERROR</p>; }
   if(data) {
       const messages = data.map( ({id,sender_type,body,created_at}) => (
        {
         id,
         from:(sender_type=="EASYTRANSIT")?"me":"them",
         text:body,
         time:formatIsoToFrenchShort(created_at)
       }
       ))
       return (
            <WhatsAppUI messages={messages} unread={2} chatName={"Palaye"}/>
       )
   }
}*/