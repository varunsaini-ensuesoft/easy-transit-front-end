
import {
    useRecordContext,
    useNotify,
} from 'react-admin';
import {Box,Stack, Typography } from '@mui/material';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    
} from '@mui/material';


import { ChangeEvent, useEffect, useState } from 'react';
import MuButton from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import RefreshIcon from '@mui/icons-material/Refresh';
import MuIconButton from '@mui/material/IconButton'
import MuTooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { supabase } from '../supabase/mySupabaseClient';
import { evalSimpleDateTimeFromISOString } from '../pdf/utils';


type folderNameFuncType = (record:any) => string


export const downloadBlob = (blob:any, name = 'downloaded.pdf') => {

    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = name;
    document.body.appendChild(link);
    link.dispatchEvent(
      new MouseEvent('click', { 
        bubbles: true, 
        cancelable: true, 
        view: window 
      })
    );
    document.body.removeChild(link);
  }



const Docs =  ({showTitle=false,bucket,folderNameFunc}:
               {showTitle?:boolean,bucket:string,folderNameFunc:folderNameFuncType}) => {

    const record = useRecordContext();
    const [filename, setFilename] = useState("");

    if(!record) return null;

    const notify = useNotify();

    const [docs,setDocs] = useState([] as Array<any>);

    const folder =  folderNameFunc(record);

    
    const fetchDocsDefault = async () =>{
       const {data:files,error:files_error} = await supabase.storage.from(bucket).list(folder, {sortBy: { column: 'created_at', order: 'desc' },})
       if(files_error) return {error:files_error};

       const fileIds = files.map(f=>f.id);
       const {data:owners,error:owners_error} = await supabase.from("file_owners").select().in('file_id',fileIds)
       if(owners_error) return {error:owners_error};
       
      // console.log("owners : ",owners)
       const data =  files.map(f => {
        let created_by = ''
        const owner = owners.find(({file_id}) => file_id == f.id)
        if(owner) created_by = owner.firstname + ' '+owner.lastname

        return {...f,created_by}

       })
    
       return {data}
    } 


    const fetchData = async () => {
         
        const { data, error } = await fetchDocsDefault();

        console.log("Docs : ",data,error)
        if(error) console.error(error.message)
        else setDocs(data.filter(d => d.name!=".emptyFolderPlaceholder"));
    }

    useEffect(() => {
      
        // call the function
        fetchData()
  
      }, [])

    
    
     const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) {
            return;
            }
            const file = e.target.files[0];
            const { name } = file;
            setFilename(name);

            const { data, error } = await supabase
              .storage
              .from(bucket)
              .upload(folder+"/"+name,file)
  
              console.log("handleFileUpload : ",data, error);
  
              if(error) {
                notify("Erreur lors de l'upload du fichier' : "+error.message, { type: 'error' });
              }
              else{
                notify("Le fichier a été uploadé avec succès ", { type: 'success' });
                fetchData();
              }


              setFilename("");
              
  };

 
  

   const downloadFile = async ({name}:any) => {
       const path = folder+'/'+name;
       const { data, error } = await supabase.storage.from(bucket).download(path)
       if(error){
           notify("Error lors du téléchargement du fichier : "+error.message, { type: 'error' });
       }
       else{
           downloadBlob(data,name);
       }
  
   }

   const deleteFile = async({name}:any) => {
    const path = folder+'/'+name;
    const {error} = await supabase.storage.from(bucket).remove([path])
        if(error){
            notify("Erreur lors de la suppression du fichier: "+error.message, { type: 'error' });
        }
        else{
            notify("Le fichier a été supprimé avec succès ",{ type: 'success' });
            fetchData();
        }
   }

    const renderAsText = (item:any,key:string,j:number) => (
        <TableCell key={j}>
              <span>{item[key]}</span>  
        </TableCell>
    );


    const renderCreationDate = (item:any,key:string,j:number) => <TableCell key={j}>{evalSimpleDateTimeFromISOString(item[key])}</TableCell>;
 
     const columns = [
        {key: "name", title:"Nom du fichier",render:renderAsText},
        {key: "created_at",title:"Date de création",render:renderCreationDate},
        {key: "created_by",title:"Créateur",render:renderAsText},
    ]

     return (
        <>
            <Typography variant="subtitle2" gutterBottom>
            {showTitle && "Documents"}
            </Typography>
            
            
            <Stack direction={"row"} >
                <MuButton
                        component="label"
                        color="primary"
                        startIcon={<CloudUploadIcon />}>
                        Upload
                        <input type="file"  hidden onChange={handleFileUpload} />
                </MuButton>
                <MuTooltip title="Actualiser la liste">
                    <MuIconButton onClick={fetchData} >
                        <RefreshIcon/>
                    </MuIconButton>
                </MuTooltip>
               
                <span>{filename}</span>
            </Stack>
          
          
            <Box display={{ xs: 'block', sm: 'flex' }}>
            <Table>
                    <TableHead>
                        <TableRow>
                            {
                            columns.map(({title},i) =>  <TableCell key={i}>{title}</TableCell>)
                            }
                            <TableCell>{"Actions"}</TableCell>
                        </TableRow>
                        
                    </TableHead>
                    <TableBody>
                        {
                            docs.map((item:any,i:number)=> 
                            <TableRow key={i}>
                                {
                                    columns.map(({key,render},j) =>  render(item,key,j))
                                }  
                                 <TableCell>
                                        <MuTooltip title="Télécharger">
                                            <MuIconButton onClick={()=>downloadFile(item)}>
                                                <DownloadIcon/>
                                            </MuIconButton>
                                        </MuTooltip>
                                        <MuTooltip title="Supprimer">
                                            <MuIconButton onClick={()=>deleteFile(item)}>
                                                <DeleteIcon/>
                                            </MuIconButton>
                                        </MuTooltip>  
                                </TableCell>
                            </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </Box>
            <Box mt="1em" />
        </>
     );
        
    
    
} 


export default Docs;