import React, { useEffect, useState } from "react";
import {
    List,
    Datagrid,
    TextField,
    DateField,
    ChipField,
    useListContext,
    useGetOne,
    FunctionField,
} from "react-admin";
import {
    Box,
    Tabs,
    Tab,
    TextField as MuiTextField,
    InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
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
            const hasSearch = !!filterValues?.q;

            if (hasStaleUserFilter || hasNonDefaultType || hasSearch) {
                setFilters({ type: "public" }, [], true);
            }
        }
    }, [
        location.search,
        filterValues?.["offer.request.user"],
        filterValues?.type,
        filterValues?.q,
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

const OrdersSearchInput = () => {
    const { filterValues, setFilters } = useListContext();
    const [search, setSearch] = useState(filterValues?.q || "");

    useEffect(() => {
        setSearch(filterValues?.q || "");
    }, [filterValues?.q]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const trimmedValue = search.trim();

            const nextFilters: any = {
                ...filterValues,
            };

            if (trimmedValue) {
                nextFilters.q = trimmedValue;
            } else {
                delete nextFilters.q;
            }

            if (!nextFilters.type) {
                nextFilters.type = "public";
            }

            if (nextFilters.q !== filterValues?.q) {
                setFilters(nextFilters, [], true);
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <MuiTextField
            size="small"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
                minWidth: 280,
                maxWidth: 360,
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                    </InputAdornment>
                ),
            }}
        />
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
                    gap: 2,
                    flexWrap: "wrap",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper,
                    mb: 2,
                    pb: 1,
                })}
            >
                <TypeFilterTabs />
                <OrdersSearchInput />
            </Box>

            {!isPending && total === 0 ? (
                <Box sx={{ p: 2, textAlign: "center", color: "text.secondary" }}>
                    No orders found.
                </Box>
            ) : (
                <Datagrid rowClick="show" bulkActionButtons={false}>
                    <FunctionField
                        label="Offre"
                        render={(record: any) => record?.offer?._id || "-"}
                    />

                    <TextField label="Commentaire" source="comment" />
                    <DateField label="Créé le" source="date_creation" />
                    <DateField label="Livraison le" source="delivery_date" />
                    <ChipField label="Statut" source="status" />

                    <FunctionField
                        label="Client"
                        render={(record: any) => {
                            const user = record?.offer?.request?.user;
                            return user ? `${user.first_name} ${user.last_name}` : "-";
                        }}
                    />

                    <FunctionField
                        label="Forwarder"
                        render={(record: any) => {
                            const forwarder = record?.offer?.forwarder;
                            return forwarder ? `${forwarder.first_name} ${forwarder.last_name}` : "-";
                        }}
                    />
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