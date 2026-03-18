import React from 'react';
import MaterialTable from 'material-table'
import { forwardRef } from 'react';

import AddBox from '@mui/icons-material/AddBox';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Edit from '@mui/icons-material/Edit';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref:React.ForwardedRef<any>) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref:React.ForwardedRef<any>) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref:React.ForwardedRef<any>) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref:React.ForwardedRef<any>) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref:React.ForwardedRef<any>) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref:React.ForwardedRef<any>) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref:React.ForwardedRef<any>) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref:React.ForwardedRef<any>) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref:React.ForwardedRef<any>) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref:React.ForwardedRef<any>) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref:React.ForwardedRef<any>) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref:React.ForwardedRef<any>) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref:React.ForwardedRef<any>) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref:React.ForwardedRef<any>) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref:React.ForwardedRef<any>) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref:React.ForwardedRef<any>) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref:React.ForwardedRef<any>) => <ViewColumn {...props} ref={ref} />)
  };



const CollapsibleTableEx = (props:any) => (
  <MaterialTable
  icons={tableIcons}
  {...props}
  />
)

export default CollapsibleTableEx