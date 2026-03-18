import React from 'react';
import { List, Datagrid, TextField,
    ReferenceField, EmailField,BooleanField,FunctionField,  
    DateField,
    ChipField} from 'react-admin';
import Tooltip from '@mui/material/Tooltip';
import { DateDisplay } from '../utils/generic';


const Title = () => {
    return <span>Liste des annonces </span>;
};

import { Chip } from "@mui/material";

export const RequestStatusChip = ({ status }: { status: string }) => {
    const config: any = {
        "Publiée": {
            bg: "#e3f2fd",
            color: "#1976d2",
        },
        "En attente": {
            bg: "#fff3e0",
            color: "#f57c00",
        },
        "En cours": {
            bg: "#ede7f6",
            color: "#7b1fa2",
        },
        "Expirée": {
            bg: "#f5f5f5",
            color: "#616161",
        },
        "Invalidée": {
            bg: "#fdecea",
            color: "#d32f2f",
        },
        "Supprimée": {
            bg: "#eeeeee",
            color: "#424242",
        },
        "Terminée": {
            bg: "#e8f5e9",
            color: "#2e7d32",
        },
    };

    const style = config[status] || {
        bg: "#e0e0e0",
        color: "#424242",
    };

    return (
        <Chip
            label={status}
            size="small"
            sx={{
                backgroundColor: style.bg,
                color: style.color,
                fontWeight: 500,
                borderRadius: "8px",
            }}
        />
    );
};
const RequestList = (props: any) => (
  <List title={<Title />} {...props}>
    <Datagrid rowClick="show">
      k
      <TextField label="ID" source="id" />
      <ReferenceField
        label="Client"
        link="show"
        source="user"
        reference="users"
      >
        <FunctionField
          label="Client"
          render={(record) => `${record.first_name} ${record.last_name}`}
        />
      </ReferenceField>
      <TextField label="Description" source="description" />
      <TextField label="Route" source="route" />
<FunctionField
    label="Type"
    render={(record: any) => {
        const type = record?.type;

        const styles: any = {
            public: {
                label: "Public",
                bg: "#e3f2fd",
                color: "#1976d2",
            },
            private: {
                label: "Direct",
                bg: "#ede7f6",
                color: "#7b1fa2",
            },
        };

        const style = styles[type] || {
            label: type,
            bg: "#e0e0e0",
            color: "#424242",
        };

        return (
            <Chip
                label={style.label}
                size="small"
                sx={{
                    backgroundColor: style.bg,
                    color: style.color,
                    fontWeight: 600,
                    borderRadius: "8px",
                }}
            />
        );
    }}
/>      <DateField label="Publiée le" source="publication_date" />
      <FunctionField
        label="Statut"
        render={(record) => <RequestStatusChip status={record.status} />}
      />
    </Datagrid>
  </List>
);

export default RequestList;