import React, { useEffect, useMemo, useState } from "react";
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    FunctionField,
    useListContext,
} from "react-admin";
import {
    Box,
    Tabs,
    Tab,
    Tooltip,
    TextField as MuiTextField,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import StatusComplete from "@mui/icons-material/PlaylistAddCheck";
import StatusDefault from "@mui/icons-material/Notes";
import StatusValidated from "@mui/icons-material/DoneAll";
import StatusInvalid from "@mui/icons-material/Close";

const DEFAULT_USER_TYPE = "Professionnel";

const Profil = ({ status }: { status: string }) => {
    return (
        <span>
            {status === "Default" && (
                <Tooltip title="Pas complet">
                    <StatusDefault />
                </Tooltip>
            )}
            {status === "Complete" && (
                <Tooltip title="Complet">
                    <StatusComplete />
                </Tooltip>
            )}
            {status === "Validated" && (
                <Tooltip title="Validé">
                    <StatusValidated style={{ color: "green" }} />
                </Tooltip>
            )}
            {status === "Problem" && (
                <Tooltip title="Problématique">
                    <StatusValidated style={{ color: "red" }} />
                </Tooltip>
            )}
            {status === "Invalid" && (
                <Tooltip title="Email non validé">
                    <StatusInvalid style={{ color: "red" }} />
                </Tooltip>
            )}
        </span>
    );
};

const Title = () => {
    return <span>Liste des utilisateurs</span>;
};

const CertifiedAvatar = ({ show }: { show: boolean }) =>
    show ? (
        <Tooltip title="Certifié">
            <span
                style={{
                    backgroundColor: "grey",
                    borderRadius: "50%",
                    padding: 3,
                }}
            >
                C
            </span>
        </Tooltip>
    ) : null;

const ResetUsersFiltersOnPlainRoute = () => {
    const { filterValues, setFilters } = useListContext();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const hasFilterInUrl = searchParams.has("filter");

        // If user opens plain /users with no explicit filter in URL,
        // reset stale remembered filters to the default state.
        if (!hasFilterInUrl) {
            const currentType = filterValues?.["profil.type"];
            const currentSearch = filterValues?.q;

            const hasStaleType =
                currentType && currentType !== DEFAULT_USER_TYPE;
            const hasStaleSearch = !!currentSearch;

            if (hasStaleType || hasStaleSearch || !currentType) {
                setFilters(
                    {
                        "profil.type": DEFAULT_USER_TYPE,
                    },
                    [],
                    true
                );
            }
        }
    }, [
        location.search,
        filterValues?.["profil.type"],
        filterValues?.q,
        setFilters,
    ]);

    return null;
};

const UserTypeTabs = () => {
    const { filterValues, setFilters } = useListContext();

    const currentType = filterValues?.["profil.type"] || DEFAULT_USER_TYPE;

    useEffect(() => {
        if (!filterValues?.["profil.type"]) {
            setFilters(
                {
                    ...filterValues,
                    "profil.type": DEFAULT_USER_TYPE,
                },
                [],
                true
            );
        }
    }, [filterValues?.["profil.type"], setFilters]);

    const handleChange = (_event: React.SyntheticEvent, value: string) => {
        setFilters(
            {
                ...filterValues,
                "profil.type": value,
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
                    textTransform: "none",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    color: theme.palette.text.secondary,
                },
                "& .MuiTab-root.Mui-selected": {
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                },
            })}
        >
            <Tab label="Professionnel" value="Professionnel" />
            <Tab label="Particulier" value="Particulier" />
            <Tab label="Transitaire" value="Transitaire" />
            <Tab label="Agent" value="Agent" />
        </Tabs>
    );
};

const UserSearchBar = () => {
    const { filterValues, setFilters } = useListContext();
    const [value, setValue] = useState(filterValues?.q || "");

    useEffect(() => {
        setValue(filterValues?.q || "");
    }, [filterValues?.q]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const normalizedValue = value.trim();
            const currentQ = filterValues?.q || "";

            if (normalizedValue === currentQ) return;

            const nextFilters: any = {
                ...filterValues,
            };

            if (normalizedValue) {
                nextFilters.q = normalizedValue;
            } else {
                delete nextFilters.q;
            }

            setFilters(nextFilters, [], true);
        }, 500);

        return () => clearTimeout(timeout);
    }, [value, filterValues, setFilters]);

    return (
        <MuiTextField
            size="small"
            placeholder="Rechercher un utilisateur..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{ minWidth: 320 }}
        />
    );
};

const UsersListContent = () => {
    return (
        <Box>
            <ResetUsersFiltersOnPlainRoute />

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
                })}
            >
                <UserTypeTabs />
                <UserSearchBar />
            </Box>

            <Datagrid rowClick="show" bulkActionButtons={false}>
                <TextField label="Prénom" source="first_name" />
                <TextField label="Nom" source="last_name" />
                <EmailField label="Email" source="email" />
                <FunctionField
                    label="Profil"
                    render={(record: any) => (
                        <span>
                            {record.profil?.type}{" "}
                            <CertifiedAvatar show={record.profil?.isCertified} />
                        </span>
                    )}
                />
                <FunctionField
                    label="Tel"
                    render={(record: any) =>
                        record?.phone
                            ? `(${record.phone.phone_code}) ${record.phone.phone_number}`
                            : ""
                    }
                />
                <FunctionField
                    label="Status"
                    render={(record: any) => (
                        <Profil status={record.validation?.status} />
                    )}
                />
            </Datagrid>
        </Box>
    );
};

const UserList = (props: any) => (
    <List
        title={<Title />}
        actions={false}
        filterDefaultValues={{ "profil.type": DEFAULT_USER_TYPE }}
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
        })}
    >
        <UsersListContent />
    </List>
);

export default UserList;