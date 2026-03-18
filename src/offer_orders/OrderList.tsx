import React, { useEffect } from "react";
import {
    List,
    Datagrid,
    TextField,
    DateField,
    ChipField,
    useListContext,
} from "react-admin";
import { Box, Tabs, Tab } from "@mui/material";

const Title = () => {
    return <span>Liste des commandes</span>;
};

const TypeFilterTabs = () => {
    const { filterValues, setFilters } = useListContext();

    const isUserScoped = !!filterValues?.["offer.request.user"];
    const currentType = filterValues?.type || "public";

    useEffect(() => {
        if (!filterValues?.type) {
            setFilters(
                {
                    ...filterValues,
                    type: "public",
                },
                []
            );
        }
    }, [filterValues, setFilters]);

    const handleChange = (_event: React.SyntheticEvent, value: string) => {
        setFilters(
            {
                ...filterValues,
                type: value,
            },
            []
        );
    };

    return (
        <Tabs
            value={currentType}
            onChange={handleChange}
            sx={(theme) => ({
                minHeight: 48,
                "& .MuiTabs-indicator": {
                    height: 2,
                    backgroundColor: theme.palette.primary.main,
                },
                "& .MuiTab-root": {
                    minHeight: 48,
                    px: 2,
                    textTransform: "uppercase",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: theme.palette.text.secondary,
                },
                "& .MuiTab-root.Mui-selected": {
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                },
            })}
        >
            <Tab label="Public orders" value="public" />
            <Tab label="Private orders" value="private" />
            {isUserScoped && <Tab label="Agent orders" value="agent" />}
        </Tabs>
    );
};

const OrdersListContent = () => {
    return (
        <Box>
            <Box
                sx={(theme) => ({
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper,
                    mb: 2,
                })}
            >
                <TypeFilterTabs />
            </Box>

            <Datagrid rowClick="show" bulkActionButtons={false}>
                <TextField label="Offre" source="offer" />
                <TextField label="Commentaire" source="comment" />
                <DateField label="Créé le" source="date_creation" />
                <DateField label="Livraison le" source="delivery_date" />
                <ChipField label="Statut" source="status" />
            </Datagrid>
        </Box>
    );
};

const OrderList = (props: any) => (
    <List
        title={<Title />}
        actions={false}
        filterDefaultValues={{ type: "public" }}
        {...props}
        sx={(theme) => ({
            "& .RaList-main": {
                backgroundColor: theme.palette.background.paper,
            },
            "& .RaDatagrid-root": {
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: theme.palette.background.paper,
            },
            "& .RaDatagrid-headerCell": {
                backgroundColor: theme.palette.background.default,
                fontWeight: 700,
                borderBottom: `1px solid ${theme.palette.divider}`,
            },
            "& .RaDatagrid-row, & .RaDatagrid-rowCell": {
                backgroundColor: "transparent",
            },
        })}
    >
        <OrdersListContent />
    </List>
);

export default OrderList;