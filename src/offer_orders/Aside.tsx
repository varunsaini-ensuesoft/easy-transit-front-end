import {
    useRecordContext,
    Link,
    useCreatePath,
} from 'react-admin';
import {
    Typography,
    Card,
    CardContent,
    Box,
    Grid,
    Stack,
    Chip,
    Divider,
    LinearProgress,
    Stepper,
    Step,
    StepLabel,
    StepContent,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

import { RELATED_OBJECTS } from '../custom/mainConstants';
import Requests from '../requests/index';
import Users from '../users/index';

const TitleValue = ({ label, value }: { label: string; value?: React.ReactNode }) => (
    <Box>
        <Typography
            variant="caption"
            sx={{ color: 'text.secondary', display: 'block', mb: 0.3 }}
        >
            {label}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {value || '-'}
        </Typography>
    </Box>
);

const getTrackingStatusConfig = (theme: any, status?: string) => {
    switch (status) {
        case 'Délivré':
            return {
                chipLabel: 'Délivré',
                chipBg: alpha(theme.palette.success.main, 0.12),
                chipColor: theme.palette.success.dark,
                icon: <CheckCircleRoundedIcon sx={{ color: theme.palette.success.main }} />,
                isDone: true,
            };
        case 'En attente':
            return {
                chipLabel: 'En attente',
                chipBg: alpha(theme.palette.warning.main, 0.12),
                chipColor: theme.palette.warning.dark,
                icon: <HourglassEmptyRoundedIcon sx={{ color: theme.palette.warning.main }} />,
                isDone: false,
            };
        default:
            return {
                chipLabel: status || 'Inconnu',
                chipBg: alpha(theme.palette.text.secondary, 0.12),
                chipColor: theme.palette.text.secondary,
                icon: <DescriptionOutlinedIcon sx={{ color: theme.palette.text.secondary }} />,
                isDone: false,
            };
    }
};

const TrackingStatusChip = ({ status }: { status?: string }) => {
    const theme = useTheme();
    const config = getTrackingStatusConfig(theme, status);

    return (
        <Chip
            label={config.chipLabel}
            size="small"
            sx={{
                backgroundColor: config.chipBg,
                color: config.chipColor,
                fontWeight: 600,
                borderRadius: '8px',
            }}
        />
    );
};

const TrackingDetails = () => {
    const theme = useTheme();
    const record = useRecordContext();
    if (!record) return null;

    const trackingSteps = record.gupe || [];
    if (!trackingSteps.length) return null;

    const deliveredCount = trackingSteps.filter(
        (item: any) => item?.statut === 'Délivré'
    ).length;

    const totalCount = trackingSteps.length;
    const progress = totalCount ? Math.round((deliveredCount / totalCount) * 100) : 0;
    const connaissement = trackingSteps[0]?.connaissement;

    return (
        <Box ml={2} mb={1}>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: 'calc(100vh - 240px)',
                    borderRadius: 2,
                }}
            >
                <CardContent
                    sx={(theme) => ({
                        pb: 2,
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        flexShrink: 0,
                    })}
                >
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <LocalShippingOutlinedIcon color="action" />
                        <Typography variant="subtitle2">
                            Suivi de l&apos;acheminement
                        </Typography>
                    </Box>

                    <Box
                        sx={(theme) => ({
                            p: 1.5,
                            borderRadius: 2,
                            backgroundColor: alpha(theme.palette.primary.main, 0.04),
                            border: `1px solid ${theme.palette.divider}`,
                        })}
                    >
                        <Stack spacing={1.5}>
                            <TitleValue
                                label="Connaissement"
                                value={connaissement || '-'}
                            />

                            <Box>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    mb={0.5}
                                >
                                    <Typography variant="caption" color="text.secondary">
                                        Progression
                                    </Typography>
                                    <Typography variant="caption" sx={{ fontWeight: 700 }}>
                                        {deliveredCount}/{totalCount}
                                    </Typography>
                                </Box>

                                <LinearProgress
                                    variant="determinate"
                                    value={progress}
                                    sx={(theme) => ({
                                        height: 8,
                                        borderRadius: 999,
                                        backgroundColor: alpha(theme.palette.primary.main, 0.12),
                                        '& .MuiLinearProgress-bar': {
                                            backgroundColor: theme.palette.primary.main,
                                        },
                                    })}
                                />
                            </Box>
                        </Stack>
                    </Box>
                </CardContent>

                <Box
                    sx={(theme) => ({
                        overflowY: 'auto',
                        px: 2,
                        py: 1,
                        pr: 1,
                        flex: 1,
                        minHeight: 0,
                        scrollbarWidth: 'thin',
                        '&::-webkit-scrollbar': {
                            width: 8,
                        },
                        '&::-webkit-scrollbar-track': {
                            background: alpha(theme.palette.text.secondary, 0.08),
                            borderRadius: 999,
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: alpha(theme.palette.text.secondary, 0.24),
                            borderRadius: 999,
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: alpha(theme.palette.text.secondary, 0.4),
                        },
                    })}
                >
                    <Stepper orientation="vertical" nonLinear>
                        {trackingSteps.map((step: any, index: number) => {
                            const config = getTrackingStatusConfig(theme, step?.statut);

                            return (
                                <Step
                                    key={step?._id || index}
                                    active
                                    completed={config.isDone}
                                >
                                    <StepLabel
                                        icon={config.icon}
                                        optional={
                                            <Box mt={0.5}>
                                                <TrackingStatusChip status={step?.statut} />
                                            </Box>
                                        }
                                    >
                                        <Typography
                                            variant="body2"
                                            sx={{ fontWeight: 700, lineHeight: 1.4 }}
                                        >
                                            {step?.libelle || '-'}
                                        </Typography>
                                    </StepLabel>

                                    <StepContent>
                                        <Stack spacing={1}>
                                            <TitleValue
                                                label="Acteur"
                                                value={step?.acteur || '-'}
                                            />
                                            <TitleValue
                                                label="Connaissement"
                                                value={step?.connaissement || '-'}
                                            />
                                        </Stack>
                                    </StepContent>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Box>
            </Card>
        </Box>
    );
};

const Aside = () => {
    const record = useRecordContext();

    return (
        <Box
            width={400}
            display={{ xs: 'none', lg: 'block' }}
            sx={{
                position: 'sticky',
                top: 80,
                alignSelf: 'flex-start',
                maxHeight: 'calc(100vh - 96px)',
                overflow: 'hidden',
                
            }}
        >
            {record && <RelatedObjects />}
            {record && <TrackingDetails />}
        </Box>
    );
};

const RelatedObjects = () => {
    const record = useRecordContext();
    if (!record) return null;

    const createPath = useCreatePath();
    const requestId = record.offer?.request?._id;
    const clientId = record.offer?.request?.user?._id;
    const forwarderId = record.offer?.forwarder?._id;

    return (
        <Box ml={2} mb={1}>
            <Card>
                <CardContent>
                    <Typography variant="subtitle2" gutterBottom>
                        {RELATED_OBJECTS}
                    </Typography>

                    <Grid container rowSpacing={1} columnSpacing={1}>
                        <Grid item xs={12} display="flex" gap={1}>
                            <>
                                <Requests.icon fontSize="small" color="disabled" />
                                <Link
                                    variant="body2"
                                    flexGrow={1}
                                    to={createPath({
                                        resource: 'requests',
                                        type: 'show',
                                        id: requestId,
                                    })}
                                >
                                    Annonce
                                </Link>
                            </>
                        </Grid>

                        <Grid item xs={12} display="flex" gap={1}>
                            <>
                                <Users.icon fontSize="small" color="disabled" />
                                <Link
                                    variant="body2"
                                    flexGrow={1}
                                    to={createPath({
                                        resource: 'users',
                                        type: 'show',
                                        id: clientId,
                                    })}
                                >
                                    Client
                                </Link>
                            </>
                        </Grid>

                        <Grid item xs={12} display="flex" gap={1}>
                            <>
                                <Users.icon fontSize="small" color="disabled" />
                                <Link
                                    variant="body2"
                                    flexGrow={1}
                                    to={createPath({
                                        resource: 'users',
                                        type: 'show',
                                        id: forwarderId,
                                    })}
                                >
                                    Transitaire
                                </Link>
                            </>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Aside;
