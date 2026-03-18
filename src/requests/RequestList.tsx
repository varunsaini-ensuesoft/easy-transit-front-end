import React, { useEffect, useMemo, useState } from "react";
import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    FunctionField,
    DateField,
    useListContext,
    ListContextProvider,
    Pagination,
    useDataProvider,
    useList,
} from "react-admin";
import { Box, Chip, CircularProgress, Tab, Tabs, Typography } from "@mui/material";

const Title = () => {
    return <span>Liste des annonces </span>;
};

export const RequestStatusChip = ({ status }: { status: string }) => {
    const config: Record<string, { bg: string; color: string }> = {
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

const RequestTypeChip = ({ type }: { type?: string }) => {
    const styles: Record<string, { label: string; bg: string; color: string }> = {
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

    const style = styles[type || ""] || {
        label: type || "-",
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
};

const RequestTypeTabs = ({
    value,
    onChange,
}: {
    value: string;
    onChange: (_event: React.SyntheticEvent, value: string) => void;
}) => {
    return (
        <Tabs
            value={value}
            onChange={onChange}
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
            <Tab label="Public requests" value="public" />
            <Tab label="Direct requests" value="private" />
        </Tabs>
    );
};

const RequestListContent = () => {
    const listContext = useListContext();
    const dataProvider = useDataProvider();

    const [selectedType, setSelectedType] = useState("public");
    const [allRequests, setAllRequests] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const resource = listContext.resource;
    const filterValues = listContext.filterValues || {};
    const sort = listContext.sort || { field: "id", order: "DESC" as const };
    const serializedFilterValues = JSON.stringify(filterValues);

    useEffect(() => {
        let isActive = true;

        const fetchAllRequests = async () => {
            setIsLoading(true);

            try {
                const firstPage = await dataProvider.getList(resource, {
                    pagination: { page: 1, perPage: 1 },
                    sort,
                    filter: filterValues,
                });

                const total = "total" in firstPage ? firstPage.total || 0 : 0;

                if (!total) {
                    if (isActive) {
                        setAllRequests([]);
                    }
                    return;
                }

                const fullList = await dataProvider.getList(resource, {
                    pagination: { page: 1, perPage: total },
                    sort,
                    filter: filterValues,
                });

                if (isActive) {
                    setAllRequests(Array.isArray(fullList.data) ? fullList.data : []);
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        };

        fetchAllRequests();

        return () => {
            isActive = false;
        };
    }, [
        dataProvider,
        resource,
        serializedFilterValues,
        sort.field,
        sort.order,
    ]);

    const filteredData = useMemo(
        () => allRequests.filter((record) => record?.type === selectedType),
        [allRequests, selectedType]
    );

    const showLoading = isLoading || listContext.isLoading;
    const localListContext = useList({
        data: filteredData,
        isLoading: showLoading,
        isPending: showLoading,
        page: 1,
        perPage: 10,
        sort,
        resource,
    });
    const { page, perPage, setPage } = localListContext;

    useEffect(() => {
        setPage(1);
    }, [selectedType, setPage]);

    useEffect(() => {
        const maxPage = Math.max(1, Math.ceil(filteredData.length / perPage));

        if (page > maxPage) {
            setPage(maxPage);
        }
    }, [filteredData.length, page, perPage, setPage]);

    return (
        <Box>
            <Box
                sx={(theme) => ({
                    display: "flex",
                    alignItems: "center",
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    backgroundColor: theme.palette.background.paper,
                    mb: 2,
                })}
            >
                <RequestTypeTabs
                    value={selectedType}
                    onChange={(_event, value) => setSelectedType(value)}
                />
            </Box>

            {showLoading ? (
                <Box
                    sx={(theme) => ({
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1.5,
                        minHeight: 220,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 2,
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.secondary,
                    })}
                >
                    <CircularProgress size={24} />
                    <Typography variant="body2">Loading requests...</Typography>
                </Box>
            ) : (
            <ListContextProvider value={localListContext}>
                <Datagrid rowClick="show" bulkActionButtons={false}>
                    <TextField label="ID" source="id" />
                    <ReferenceField
                        label="Client"
                        link="show"
                        source="user"
                        reference="users"
                    >
                        <FunctionField
                            label="Client"
                            render={(record) =>
                                `${record.first_name} ${record.last_name}`
                            }
                        />
                    </ReferenceField>
                    <TextField label="Description" source="description" />
                    <TextField label="Route" source="route" />
                    <FunctionField
                        label="Type"
                        render={(record: any) => (
                            <RequestTypeChip type={record?.type} />
                        )}
                    />
                    <DateField label="Publiée" source="publication_date" />
                    <FunctionField
                        label="Statut"
                        render={(record) => (
                            <RequestStatusChip status={record.status} />
                        )}
                    />
                </Datagrid>
                <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
            </ListContextProvider>
            )}
        </Box>
    );
};

const RequestList = (props: any) => (
    <List
        title={<Title />}
        pagination={false}
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
        <RequestListContent />
    </List>
);

export default RequestList;
