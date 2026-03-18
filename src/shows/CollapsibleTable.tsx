import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


export type RowDataType = any
export type RenderRowDataType = (rowData:RowDataType) => React.ReactElement

export type ColumnEntryType = {
  title:string,
  render: RenderRowDataType
}
export type ColumnsType = Array<ColumnEntryType>

export type DataType = Array<RowDataType>


export const renderField = (field:string) => (rowData:RowDataType) => rowData[field]
export const renderFieldAsLink = (field:string) => (rowData:RowDataType) => <a href="#">{rowData[field]}</a>

const Row = ({rowData,columns,renderCollapse}:{rowData:RowDataType, columns:ColumnsType,renderCollapse:RenderRowDataType }) => {

  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {
          columns.map(entry => <TableCell>{entry.render(rowData)}</TableCell> )
        }
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {renderCollapse(rowData)}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

type CollapsibleTableProps = {
  columns:ColumnsType,
  data: DataType,
  renderCollapse : RenderRowDataType
}

const CollapsibleTable = ({columns,data,renderCollapse}:CollapsibleTableProps)=> {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
           <TableCell />
           {
            columns.map(entry => <TableCell>{entry.title}</TableCell> )
           }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map(rowData => <Row rowData={rowData} columns={columns} renderCollapse={renderCollapse} />  )
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default CollapsibleTable;
  
