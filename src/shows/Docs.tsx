
import {ImageField,FileField} from 'react-admin'
import {HOST} from '../config'
import { makeStyles } from '@mui/material/styles';
import {TextField} from 'react-admin'

const useStyles = makeStyles({
    link: {
        textDecoration: 'none',
    },
    icon: {
        width: '0.5em',
        paddingLeft: 2,
    },
});


const LabelLink = ({title,url}:{title:string,url:string}) => {
    const classes = useStyles();
    return (
        <a href={url} className={classes.link} target="_blank">
            {title}
            {/*<LaunchIcon className={classes.icon} />*/}
        </a>
    );
}

const Ninea = ({value,url}:{value:string,url:string}) => {
    return (
        <div style={{marginTop:10,marginBottom:5}}>
           <span> Ninea : {value} </span>
              <LabelLink title="(doc)" url={url} />
        </div>
    );
}

const TestC = ({record }:{record:any}) => {

    return (
        <>
         <TextField label="Test" record={record} source="phone" />
        </>


    )

}

const docUrl = (record:any,attr:any) => `${HOST}/${record.email}/${record[attr]}`

const Docs = ({ record = {} }:{record:any}) => {
  
    const photo_profil_url = docUrl(record,"photo")
    const photo_id_url = docUrl(record,"document")

    let data = {
        ...record,
        photo_profil_url,
        photo_id_url
    }

    if(record.company_info) {

        //console.log("record : ",record)
        const ninea_doc_url = `${HOST}/${record.email}/${record.company_info.document_ninea}`
        data.ninea_doc_url = ninea_doc_url
       // console.log("ninea_doc_url ",data.ninea_doc_url)
    }
    

    return (
       <div>
            <LabelLink title="Photo Profil" url={photo_profil_url}/>
            <ImageField record={data} source="photo_profil_url"  />
            <FileField record={data} source="photo_id_url" title="Carte d'identité" />
            {
                data.ninea_doc_url && 
                <Ninea value = {data.company_info.ninea} url={data.ninea_doc_url}/>
            }
       </div>
    );
}


export default Docs;