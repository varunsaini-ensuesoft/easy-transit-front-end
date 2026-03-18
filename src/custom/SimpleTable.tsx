
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';


type SimpleTableProps = {
    columns:Array<{title:string,key:string,render?:any,format?:(el:any)=>string}>,
    data : any
}


const SimpleTable = ({columns,data}:SimpleTableProps) => {

  

    const renderItemCellDefault = (item:any,key:string,row:number,column:number,format?:(el:any)=>string) => {
        const toText = format?format:(el:any)=>el;

        return <TableCell key={column}>{toText(item[key])}</TableCell>;
    } 

    return (
        <Table>
            <TableHead>
                <TableRow>
                    {
                    columns.map(({title},i) =>  <TableCell key={i}>{title}</TableCell>)
                    }
                    
                </TableRow>
            </TableHead>
                <TableBody>
                        {
                            data.map((item:any,i:number)=> 
                            <TableRow key={i}>
                                {
                                    columns.map(
                                        ({key,render,format},j) => render?render(item,key,i,j,format):renderItemCellDefault(item,key,i,j,format)
                                    )
                                }  
                            </TableRow>
                            )
                        }
                </TableBody>
        </Table>
    )
}

export default SimpleTable;