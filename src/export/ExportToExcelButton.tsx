
import MuButton from '@mui/material/Button'

import MuTooltip from '@mui/material/Tooltip';
import DownloadIcon from '@mui/icons-material/Download';

import { saveAs } from 'file-saver';
import  * as XLSX from 'xlsx';
import { applyFilters } from '../supabase/supabaseProvider';
import { useListContext, useNotify } from 'react-admin';


const exportToExcel = (data:any,fileName="export") => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob, `${fileName}.xlsx`);
    
};


type ExportToExcelButtonProps = {
    tooltip?:string,
    title?:string,
    fileName?:string,
    selectQuery:any,
    mapObjToExcelRow:(d:any)=>any
}

const ExportToExcelButton = ({tooltip="Export Excel",title="Export",fileName="Export",
    selectQuery,mapObjToExcelRow=(d:any)=>d
}:ExportToExcelButtonProps) =>{

    const listContext = useListContext();
    const notify = useNotify();
    if(!listContext) return null;

    const {filterValues,sort} = listContext;

    
    const handleExport = async () => {
          
        let queryBuilder = selectQuery;
       
        // Applying filters 
        queryBuilder = applyFilters(queryBuilder,filterValues);

        queryBuilder = queryBuilder
                        .order(sort.field, { ascending: (sort.order==="ASC") })
        
       const {data,error} = await queryBuilder


       if(error) {
        notify("Error when exporting to Excel : "+error.message, { type: 'error' });
         return;
       }
       const dataToExport = data.map(mapObjToExcelRow);
       console.log("export data : ",dataToExport)

       exportToExcel(dataToExport,fileName);
  }

 return (
    <MuTooltip title={tooltip}>
        <MuButton sx={{padding:"2px 2px"}}
                color="primary"
                startIcon={  <DownloadIcon/>}
                onClick={handleExport}>
                {title}
        </MuButton>
    </MuTooltip>
)

}




export default ExportToExcelButton ;