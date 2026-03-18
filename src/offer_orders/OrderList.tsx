import React, { useEffect } from "react";
import {
    List,
    Datagrid,
    TextField,
    DateField,
    ChipField,
    useListContext,
    useGetOne,
} from "react-admin";
import { Box, Tabs, Tab } from "@mui/material";
import { useLocation } from "react-router-dom";

const Title = () => {
    return <span>Liste des commandes</span>;
};

const ResetOrdersFiltersOnPlainRoute = () => {
    const { filterValues, setFilters } = useListContext();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const hasFilterInUrl = searchParams.has("filter");

        if (!hasFilterInUrl) {
            const hasStaleUserFilter = !!filterValues?.["offer.request.user"];
            const hasNonDefaultType =
                !!filterValues?.type && filterValues.type !== "public";

            if (hasStaleUserFilter || hasNonDefaultType) {
                setFilters({ type: "public" }, [], true);
            }
        }
    }, [
        location.search,
        filterValues?.["offer.request.user"],
        filterValues?.type,
        setFilters,
    ]);

    return null;
};

const TypeFilterTabs = () => {
    const { filterValues, setFilters } = useListContext();

    const selectedUserId = filterValues?.["offer.request.user"];

    const { data: selectedUser, isLoading } = useGetOne(
        "users",
        { id: selectedUserId },
        { enabled: !!selectedUserId }
    );

    const isTransitaire = selectedUser?.profil?.type === "Transitaire";
    const currentType = filterValues?.type || "public";

    useEffect(() => {
        if (!filterValues?.type) {
            setFilters(
                {
                    ...filterValues,
                    type: "public",
                },
                [],
                true
            );
            return;
        }

        if (filterValues?.type === "agent" && !selectedUserId) {
            setFilters(
                {
                    ...filterValues,
                    type: "public",
                },
                [],
                true
            );
            return;
        }

        if (
            filterValues?.type === "agent" &&
            selectedUserId &&
            !isLoading &&
            !isTransitaire
        ) {
            setFilters(
                {
                    ...filterValues,
                    type: "public",
                },
                [],
                true
            );
        }
    }, [
        filterValues?.type,
        selectedUserId,
        isLoading,
        isTransitaire,
        setFilters,
    ]);

    const handleChange = (_event: React.SyntheticEvent, value: string) => {
        setFilters(
            {
                ...filterValues,
                type: value,
            },
            [],
            true
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
            {!isLoading && isTransitaire && (
                <Tab label="Agent orders" value="agent" />
            )}
        </Tabs>
    );
};

const OrdersListContent = () => {
    const { total, isPending } = useListContext();

    return (
        <Box>
            <ResetOrdersFiltersOnPlainRoute />

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

            {!isPending && total === 0 ? (
                <Box sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
                    No orders found.
                </Box>
            ) : (
                <Datagrid rowClick="show" bulkActionButtons={false}>
                    <TextField label="Offre" source="offer" />
                    <TextField label="Commentaire" source="comment" />
                    <DateField label="Créé le" source="date_creation" />
                    <DateField label="Livraison le" source="delivery_date" />
                    <ChipField label="Statut" source="status" />
                </Datagrid>
            )}
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