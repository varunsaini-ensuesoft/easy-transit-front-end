
import {
    useRecordContext,
    useNotify,
} from 'react-admin';
import {Stack, Typography } from '@mui/material';



import { useEffect, useState } from 'react';
import { supabase } from '../supabase/mySupabaseClient';
import { evalSimpleDateTimeFromISOString } from '../pdf/utils';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import { AppObjectType, AppResourceType } from '../custom/MainTypes';




const History =  ({showTitle=false,objectType}:
               {showTitle?:boolean,objectType:AppResourceType}) => {

    const record = useRecordContext();
    const notify = useNotify();
    const [data,setData] = useState([]as Array<any>)
    if(!record ) return null;
    const {id} = record;
   

    const fetchData = async () => {
         
            const {data,error} =  await supabase.from("history").select(
                    `
                        id,
                        objectType,
                        objectId,
                        action,
                        additionalInfo,
                        created_at,
                        profiles (
                            id,
                            firstname,
                            lastname,
                            fullname
                        )
                    `
            )
              .eq("objectType",objectType)
              .eq("objectId",id)
              .order("id", { ascending:false})

            console.log("Fetch History : ",data,error)

            if(error) {
                notify("Error when loading history "+error.message, { type: 'error' });
                return;
            }

            setData(data);
    }

   

    useEffect(() => {
      
        // call the function
        fetchData()
  
      }, [])


     return (
        <>
            <Typography variant="subtitle2" gutterBottom>
            {showTitle && "Historique"}
            </Typography>
            
            
            <Stack>
                 <List dense={true} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {
                        data.map(d => <HistoryListItem {...d} />)
                    }
                </List>
            </Stack>
          
        </>
     );
        
    
    
} 


export default History;


const HistoryListItem = ({created_at:date,action,profiles,additionalInfo}:any) => (
    <ListItem dense={true}>
          <ListItemAvatar>
            <Avatar>
              <EditIcon fontSize='small' />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
             primary={<ActionSpan action={action} by={profiles?.fullname} info={additionalInfo}/>} 
             secondary={evalSimpleDateTimeFromISOString(date)}/>
    </ListItem>
)

const ActionSpan =  ({action="",by="",info=""}) => (
    <span>
        {action} <br/> 
        {info?<span style={{color:'#d32f2f'}}>⚠️ <b>{info}</b><br/></span>:null}
        <i>{by}</i>
    </span>
)