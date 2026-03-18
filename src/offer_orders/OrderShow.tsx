import React, { useState } from "react";
import {
  Show,
  TabbedShowLayout,
  Tab,
  TextField,
  RichTextField,
  BooleanField,
  ShowController,
  ShowView,
  EmailField,
  FunctionField,
  Labeled,
  ReferenceField,
  UrlField,
  useRecordContext,
  DateField,
  ChipField,
  ArrayField,
  Datagrid,
  List,
  WithRecord,
  TopToolbar,
  Button,
  useDataProvider,
  useNotify,
  useRefresh,
} from "react-admin";

import { downloadUrl } from "../config";

import { RequestStatus } from "../utils/request";
import { DateDisplay } from "../utils/generic";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import MuTextField from "@mui/material/TextField";
import { makeStyles } from "@mui/material/styles";
import CollapsibleTableEx from "../shows/CollapsibleTableEx";
import Aside from "./Aside";
import {
  CardActions,
  CardContent,
  Drawer,
  Grid,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Toolbar,
} from "@mui/material";
import { FullName } from "../utils/FullName";

import MuButton from "@mui/material/Button";
import MuIconButton from "@mui/material/IconButton";
import MuDeleteIcon from "@mui/icons-material/Delete";
import MuEditIcon from "@mui/icons-material/Edit";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import HourglassEmptyRoundedIcon from "@mui/icons-material/HourglassEmptyRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";

const Title = () => {
  return <span>Visualisation d'une commande </span>;
};

const TitleValue = ({
  label,
  value,
}: {
  label: string;
  value?: React.ReactNode;
}) => (
  <Box>
    <Typography
      variant="caption"
      sx={{ color: "text.secondary", display: "block", mb: 0.3 }}
    >
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 500 }}>
      {value || "-"}
    </Typography>
  </Box>
);

const getTrackingStatusConfig = (status?: string) => {
  switch (status) {
    case "Délivré":
      return {
        chipLabel: "Délivré",
        chipBg: "#e8f5e9",
        chipColor: "#2e7d32",
        icon: <CheckCircleRoundedIcon sx={{ color: "#fff", fontSize: 18 }} />,
        dotBg: "#2e7d32",
        borderColor: "#c8e6c9",
        cardBg: "#f7fcf8",
        isDone: true,
      };
    case "En attente":
      return {
        chipLabel: "En attente",
        chipBg: "#fff3e0",
        chipColor: "#ed6c02",
        icon: (
          <HourglassEmptyRoundedIcon sx={{ color: "#fff", fontSize: 18 }} />
        ),
        dotBg: "#ed6c02",
        borderColor: "#ffe0b2",
        cardBg: "#fffaf3",
        isDone: false,
      };
    default:
      return {
        chipLabel: status || "Inconnu",
        chipBg: "#f3f4f6",
        chipColor: "#4b5563",
        icon: <DescriptionOutlinedIcon sx={{ color: "#fff", fontSize: 18 }} />,
        dotBg: "#94a3b8",
        borderColor: "#e5e7eb",
        cardBg: "#ffffff",
        isDone: false,
      };
  }
};

const TrackingStatusChip = ({ status }: { status?: string }) => {
  const config = getTrackingStatusConfig(status);

  return (
    <Chip
      label={config.chipLabel}
      size="small"
      sx={{
        backgroundColor: config.chipBg,
        color: config.chipColor,
        fontWeight: 600,
        borderRadius: "8px",
      }}
    />
  );
};

const TrackingDetailsInline = () => {
  const record = useRecordContext();
  if (!record) return null;

  const trackingSteps = record.gupe || [];
if (!trackingSteps.length) {
    return (
        <Box
            mt={2}
            sx={{
                p: 3,
                border: '1px dashed #e5e7eb',
                borderRadius: 2,
                textAlign: 'center',
                backgroundColor: '#f9fafb',
            }}
        >
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                No Accepted Offer Yet
            </Typography>

            <Typography variant="caption" color="text.secondary">
                Tracking will appear once an offer is accepted.
            </Typography>
        </Box>
    );
}
  const deliveredCount = trackingSteps.filter(
    (item: any) => item?.statut === "Délivré"
  ).length;

  const totalCount = trackingSteps.length;
  const progress = totalCount
    ? Math.round((deliveredCount / totalCount) * 100)
    : 0;
  const connaissement = trackingSteps[0]?.connaissement;

  return (
    <Box
      mt={2}
      sx={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        overflowX: "hidden",
      }}
    >
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <LocalShippingOutlinedIcon color="action" />
        <Typography variant="h6">Suivi de l&apos;acheminement</Typography>
      </Box>

      {/* same parent box for everything */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          border: "1px solid #e5e7eb",
          borderRadius: 2,
          backgroundColor: "#fff",
          p: 2,
        }}
      >
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: "#f8fafc",
            border: "1px solid #e5e7eb",
            mb: 2,
            width: "100%",
            maxWidth: "100%",
            minWidth: 0,
          }}
        >
          <Stack spacing={1.5}>
            <TitleValue label="Connaissement" value={connaissement || "-"} />

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
                sx={{
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: "#e5e7eb",
                }}
              />
            </Box>
          </Stack>
        </Box>

        {/* scroll happens here */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            minWidth: 0,
            maxHeight: 420,
            overflowY: "auto",
            overflowX: "hidden",
            pr: 1,
            mb: 2,
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              width: 8,
            },
            "&::-webkit-scrollbar-track": {
              background: "#f3f4f6",
              borderRadius: 999,
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#cbd5e1",
              borderRadius: 999,
            },
          }}
        >
          <Stepper orientation="vertical" nonLinear>
            {trackingSteps.map((step: any, index: number) => {
              const config = getTrackingStatusConfig(step?.statut);

              return (
                <Step key={step?._id || index} active completed={config.isDone}>
                  <StepLabel
                    icon={
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          backgroundColor: config.dotBg,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {config.icon}
                      </Box>
                    }
                    optional={
                      <Box mt={0.5}>
                        <TrackingStatusChip status={step?.statut} />
                      </Box>
                    }
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                     
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 700, lineHeight: 1.4 }}
                      >
                        {step?.libelle || "-"}
                      </Typography>
                    </Box>
                  </StepLabel>

                  <StepContent>
                    <Stack spacing={1}>
                      <TitleValue label="Acteur" value={step?.acteur || "-"} />
                      <TitleValue
                        label="Connaissement"
                        value={step?.connaissement || "-"}
                      />
                    </Stack>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      </Box>
    </Box>
  );
};

const OrderShow = () => {
  return (
    <Show
      title={<Title />}
      aside={<Aside />}
      sx={{
        "& .RaShow-main": {
          minWidth: 0,
          width: "100%",
          overflowX: "hidden",
        },
        "& .MuiTabPanel-root": {
          minWidth: 0,
          width: "100%",
          maxWidth: "100%",
          overflowX: "hidden",
        },
      }}
    >
      <TabbedShowLayout>
        <Tab label="Résumé">
          <GeneralInfoShow />
          <OfferShow />
        </Tab>
        <Tab label="Suivi">
          <MonitoringShow />
        </Tab>
        <Tab label="Paiements du Client">
          <CustomerPaymentsShow />
        </Tab>
        <Tab label="Paiements au Transitaire">
          <ForwarderPaymentsShow />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

const PaymentsActions = ({
  onAddPaymentClicked,
}: {
  onAddPaymentClicked: any;
}) => (
  <TopToolbar>
    <MuButton onClick={onAddPaymentClicked}>ADD PAYMENT</MuButton>
  </TopToolbar>
);

const ForwarderPaymentsShow = () => {
  const record = useRecordContext();
  console.log("ForwarderPaymentsShow Order Record : ", record);
  const forwarderId = record?.offer?.forwarder._id;
  console.log("ForwarderPaymentsShow Forwarder ID  : ", forwarderId);

  const [open, setOpen] = useState(false);
  const [edition, setEdition] = useState("none");
  const [editedRecord, setEditedRecord] = useState(null as any);
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();

  const onEditClicked = (record: any) => {
    setEdition("edit");
    setEditedRecord(record);
    setOpen(true);
  };

  const onAddClicked = () => {
    setEdition("create");
    setEditedRecord({
      order: record?.id,
      forwarder: forwarderId,
      type: "",
      montant: 0,
      info: "",
    });
    setOpen(true);
  };

  const onCancelClicked = () => {
    setOpen(false);
    setEdition("none");
    setEditedRecord(null);
  };

  const onSave = async (record: any, newRecord: any) => {
    if (edition == "edit") editPayment(newRecord);
    else if (edition == "create") createPayment(newRecord);
  };

  const createPayment = async (newRecord: any) => {
    const { data } = await dataProvider.create("forwarderpayments", {
      data: newRecord,
    });

    if (data) {
      refresh();
      notify("Création avec succès", { type: "success" });
      setOpen(false);
    } else {
      notify("Error lors de la création", { type: "error" });
    }
  };

  const editPayment = async (newRecord: any) => {
    const { data } = await dataProvider.update("forwarderpayments", {
      id: record?.id,
      data: newRecord,
      previousData: record,
    });

    if (data) {
      refresh();
      notify("Modifié avec succès", { type: "success" });
      setOpen(false);
    } else {
      notify("Error lors de la modification", { type: "error" });
    }
  };

  const editPaymentDrawerProps = {
    open,
    editedRecord,
    onCancelClicked,
    renderForm: () => (
      <EditPaymentForm
        record={editedRecord}
        onCancel={onCancelClicked}
        onSave={onSave}
      />
    ),
  };

  return (
    <List
      perPage={50}
      resource="forwarderpayments"
      filter={{ forwarder: forwarderId }}
      actions={<PaymentsActions onAddPaymentClicked={onAddClicked} />}
      empty={false}
    >
      <Datagrid bulkActionButtons={false} title="">
        <TextField source="id" label="ID" />
        <ReferenceField
          label="Transitaire"
          source="forwarder"
          reference="users"
        >
          <WithRecord
            render={(record) => (
              <span>{record?.first_name + " " + record?.last_name}</span>
            )}
          />
        </ReferenceField>

        <TextField source="montant" label="Montant" />
        <TextField source="type" label="Type" />
        <TextField source="info" label="Info" />
        <DateField source="date_update" label="Date" />

        <WithRecord
          render={(record) => (
            <span>
              <MuIconButton onClick={() => onEditClicked(record)}>
                <MuEditIcon />
              </MuIconButton>
              {/*      <MuIconButton  onClick={e=>console.log("Delete Clicked")}>
                            <MuDeleteIcon />
                        </MuIconButton> */}
            </span>
          )}
        />
      </Datagrid>
      <PaymentDrawer {...editPaymentDrawerProps} />
    </List>
  );
};

const CustomerPaymentsShow = () => {
  const record = useRecordContext();
  console.log("CustomerPaymentsShow Order Record : ", record);
  const userId = record?.offer?.request?.user?._id;
  console.log("CustomerPaymentsShow User ID  : ", userId);

  const [open, setOpen] = useState(false);
  const [edition, setEdition] = useState("none");
  const [editedRecord, setEditedRecord] = useState(null as any);
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();

  const onEditClicked = (record: any) => {
    setEdition("edit");
    setEditedRecord(record);
    setOpen(true);
  };

  const onAddClicked = () => {
    setEdition("create");
    setEditedRecord({
      order: record?.id,
      user: userId,
      type: "",
      montant: 0,
      info: "",
    });
    setOpen(true);
  };

  const onCancelClicked = () => {
    setOpen(false);
    setEdition("none");
    setEditedRecord(null);
  };

  const onSave = async (record: any, newRecord: any) => {
    if (edition == "edit") editPayment(newRecord);
    else if (edition == "create") createPayment(newRecord);
  };

  const createPayment = async (newRecord: any) => {
    const { data } = await dataProvider.create("customerpayments", {
      data: newRecord,
    });

    if (data) {
      refresh();
      notify("Création avec succès", { type: "success" });
      setOpen(false);
    } else {
      notify("Error lors de la création", { type: "error" });
    }
  };

  const editPayment = async (newRecord: any) => {
    const { data } = await dataProvider.update("customerpayments", {
      id: record?.id,
      data: newRecord,
      previousData: record,
    });

    if (data) {
      refresh();
      notify("Modifié avec succès", { type: "success" });
      setOpen(false);
    } else {
      notify("Error lors de la modification", { type: "error" });
    }
  };

  const editPaymentDrawerProps = {
    open,
    editedRecord,
    onCancelClicked,
    renderForm: () => (
      <EditPaymentForm
        record={editedRecord}
        onCancel={onCancelClicked}
        onSave={onSave}
      />
    ),
  };

  return (
    <List
      perPage={50}
      resource="customerpayments"
      filter={{ user: userId }}
      actions={<PaymentsActions onAddPaymentClicked={onAddClicked} />}
      empty={false}
    >
      <Datagrid bulkActionButtons={false} title="">
        <TextField source="id" label="ID" />
        <ReferenceField label="Client" source="user" reference="users">
          <WithRecord
            render={(record) => (
              <span>{record?.first_name + " " + record?.last_name}</span>
            )}
          />
        </ReferenceField>

        <TextField source="montant" label="Montant" />
        <TextField source="type" label="Type" />
        <TextField source="info" label="Info" />
        <DateField source="date_update" label="Date" />

        <WithRecord
          render={(record) => (
            <span>
              <MuIconButton onClick={() => onEditClicked(record)}>
                <MuEditIcon />
              </MuIconButton>
              {/*      <MuIconButton  onClick={e=>console.log("Delete Clicked")}>
                            <MuDeleteIcon />
                        </MuIconButton> */}
            </span>
          )}
        />
      </Datagrid>
      <PaymentDrawer {...editPaymentDrawerProps} />
    </List>
  );
};

type EditDrawerProps = {
  open?: boolean;
  renderForm?: any;
  editedRecord?: any;
};

const PaymentDrawer = ({
  open = false,
  renderForm = () => null,
}: EditDrawerProps) => {
  return (
    <Drawer anchor="right" open={open}>
      <Box sx={{ width: 350 }} role="presentation">
        <Toolbar sx={{ backgroundColor: "#2196f3" }}>
          <Typography sx={{ color: "white" }} variant="subtitle2" noWrap>
            {"Creation/Modification > "}
          </Typography>
        </Toolbar>

        {renderForm()}
      </Box>
    </Drawer>
  );
};

const FormSaveCancel = ({
  onSave,
  onCancel,
}: {
  onSave: any;
  onCancel: any;
}) => (
  <>
    <Button label="ENREGISTRER" onClick={onSave}></Button>
    <Button color="error" label="ANNULER" onClick={onCancel}></Button>
  </>
);

const EditPaymentForm = ({
  record,
  onSave = () => {},
  onCancel = () => {},
}: {
  record: any;
  onSave?: any;
  onCancel?: any;
}) => {
  const [newValue, setNewValue] = useState(record);
  console.log("newValue = ", newValue);
  return (
    <>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MuTextField
              label={"Type"}
              variant="filled"
              value={newValue?.type}
              onChange={(e) =>
                setNewValue({ ...newValue, type: e.target.value })
              }
              multiline
            />

            <MuTextField
              label={"Montant"}
              variant="filled"
              value={newValue?.montant}
              onChange={(e) =>
                setNewValue({ ...newValue, montant: e.target.value })
              }
              multiline
            />

            <MuTextField
              label={"Infos"}
              variant="filled"
              value={newValue?.info}
              onChange={(e) =>
                setNewValue({ ...newValue, info: e.target.value })
              }
              multiline
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <FormSaveCancel
          onCancel={onCancel}
          onSave={() => onSave(record, newValue)}
        />
      </CardActions>
    </>
  );
};

/* const PaymentsShow = () => (
    <ArrayField label="Liste des paiements" source="payments">
        <Datagrid bulkActionButtons={false}>
            <DateField  source="date"  label="Date"/>
            <TextField source="amount" label="Montant"/>
            <TextField source="description" label="Description"/>
        </Datagrid>
    </ArrayField>
)
 */
export const OfferShow = () => (
  <Stack spacing={2}>
    <h3>Details de l'offre</h3>
    <Labeled>
      <FunctionField
        label="Transitaire"
        render={({ offer }) => <FullName record={offer?.forwarder} />}
      />
    </Labeled>

    <Labeled>
      <TextField label="Prix" source="offer.amount" />
    </Labeled>

    <Labeled>
      <TextField label="Prix dédouanement" source="offer.price_clearance" />
    </Labeled>

    <Labeled>
      <TextField
        label="Commission transitaire"
        source="offer.price_forwarder"
      />
    </Labeled>

    <h3>Frais EasyTransit</h3>
    <Labeled>
      <TextField label="Frais client" source="offer.client_application_fees" />
    </Labeled>

    <Labeled>
      <TextField
        label="Frais transitaire"
        source="offer.forwarder_application_fees"
      />
    </Labeled>
  </Stack>
);

export const GeneralInfoShow = () => (
  <Stack spacing={2}>
    <h3>Infos Cargaison</h3>
    <Labeled>
      <FunctionField
        label="Client"
        render={({ offer }) => <FullName record={offer?.request?.user} />}
      />
    </Labeled>

    <Labeled>
      <TextField label="Route" source="offer.request.route" />
    </Labeled>

    <Labeled>
      <TextField label="Origine" source="offer.request.place_departure" />
    </Labeled>

    <Labeled>
      <TextField label="Destination" source="offer.request.place_arrival" />
    </Labeled>

    <Labeled>
      <DateField
        label="Date d'arrivée (estimée)"
        source="offer.request.expected_arrival"
      />
    </Labeled>

    <h3>Infos Commande</h3>
    <Labeled>
      <TextField label="Commentaire" source="comment" />
    </Labeled>

    <Labeled>
      <DateField label="Créé le" source="date_creation" />
    </Labeled>

    <Labeled>
      <DateField label="Livraison prévue le" source="delivery_date" />
    </Labeled>

    <Labeled>
      <ChipField label="Statut" source="status" />
    </Labeled>
  </Stack>
);

export const MonitoringShow = () => (
  <Box sx={{ width: "100%", maxWidth: "100%", minWidth: 0 }}>
    <Stack spacing={2} sx={{ minWidth: 0 }}>
      <h3>Avance / Retard</h3>
      <Labeled>
        <TextField
          label="Nombre de jours de retard"
          source="penalities.delay"
        />
      </Labeled>

      <h3>Pénalités</h3>
      <Labeled>
        <TextField
          label="Montant de pénalités calculé"
          source="penalities.amount"
        />
      </Labeled>

      <TrackingDetailsInline />
    </Stack>
  </Box>
);

export default OrderShow;
