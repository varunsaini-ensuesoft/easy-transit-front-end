import React, { useEffect } from "react";
import {
    List,
    Datagrid,
    TextField,
    DateField,
    ChipField,
    ExportButton,
    useListContext,
} from "react-admin";
import {
    Box,
    IconButton,
    Tooltip,
    Tabs,
    Tab,
} from "@mui/material";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

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
            sx={{
                minHeight: 48,
                "& .MuiTabs-indicator": {
                    height: 2,
                    backgroundColor: "#1976d2",
                },
                "& .MuiTab-root": {
                    minHeight: 48,
                    px: 2,
                    textTransform: "uppercase",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: "#4b5563",
                },
                "& .MuiTab-root.Mui-selected": {
                    color: "#1976d2",
                    fontWeight: 600,
                },
            }}
        >
            <Tab label="Public orders" value="public" />
            <Tab label="Private orders" value="private" />
            {isUserScoped && <Tab label="Agent orders" value="agent" />}
        </Tabs>
    );
};

// const ClearFiltersButton = () => {
//     const { filterValues, setFilters } = useListContext();

//     const hasExtraFilters = Object.keys(filterValues || {}).some(
//         (key) => key !== "type"
//     );

//     if (!hasExtraFilters) return null;

//     const handleClear = () => {
//         setFilters({ type: "public" }, []);
//     };

//     return (
//         <Tooltip title="Remove all filters">
//             <IconButton
//                 onClick={handleClear}
//                 size="small"
//                 sx={{
//                     color: "#6b7280",
//                     border: "1px solid #d1d5db",
//                     borderRadius: 2,
//                     width: 34,
//                     height: 34,
//                     "&:hover": {
//                         backgroundColor: "#f3f4f6",
//                     },
//                 }}
//             >
//                 <FilterAltOffIcon fontSize="small" />
//             </IconButton>
//         </Tooltip>
//     );
// };

const OrdersListContent = () => {
    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #e5e7eb",
                    backgroundColor: "#fff",
                    mb: 2,
                }}
            >
                <TypeFilterTabs />

                {/* <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        pr: 1,
                    }}
                >
                    <ClearFiltersButton />
                    <ExportButton />
                </Box> */}
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
        sx={{
            "& .RaList-main": {
                backgroundColor: "#fff",
            },
            "& .RaDatagrid-root": {
                border: "1px solid #e5e7eb",
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: "#fff",
            },
            "& .RaDatagrid-headerCell": {
                backgroundColor: "#fff",
                fontWeight: 700,
                borderBottom: "1px solid #e5e7eb",
            },
        }}
    >
        <OrdersListContent />
    </List>
);

export default OrderList;