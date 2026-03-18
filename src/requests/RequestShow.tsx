import React from "react";
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
  ReferenceManyField,
  Datagrid,
  DateField,
  ChipField,
  List,
} from "react-admin";

import { downloadRequestFiles, downloadUrl } from "../config";

import { RequestStatus } from "../utils/request";
import { DateDisplay } from "../utils/generic";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import MuTextField from "@mui/material/TextField";
import { makeStyles } from "@mui/material/styles";
import CollapsibleTableEx from "../shows/CollapsibleTableEx";
import Aside from "./Aside";
import CollapsibleTable, {
  renderField,
  renderFieldAsLink,
} from "../shows/CollapsibleTable";
import { FullName } from "../utils/FullName";
import { Stack } from "@mui/material";

const Title = () => {
  return <span>Visualisation d'une annonce </span>;
};

const ProductDetails = ({ product }: { product: any }) => {
  const details = {
    ...product.vehicle,
    ...product.other,
  };

  const translations = {
    brand: "Marque",
    year: "Année",
    type_car: "Type",
    fuel: "Carburant",
    gear_box: "Boite",
    car_frame: "Frame",
    grey_card: "Carte grise",
    name: "Nom",
    quantity: "Quantité",
    unit: "Unité",
    others_info: "Autres infos",
  } as { [key: string]: string };

  return (
    <Box margin={1}>
      <Typography variant="h6" gutterBottom component="div">
        Details
      </Typography>
      <form noValidate autoComplete="off">
        <div>
          {Object.keys(details).map((k) => (
            <MuTextField
              key={k}
              label={translations[k]}
              defaultValue={details[k]}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
            />
          ))}
        </div>
      </form>
    </Box>
  );
};

const RequestShow = () => {
  return (
    <Show title={<Title />} aside={<Aside />}>
      <TabbedShowLayout>
        <Tab label="Résumé">
          <GeneralInfoShow />
          <CargoInfoShow />
        </Tab>
        <Tab label="Produits" path="products">
          <ProductsShow />
        </Tab>
        <Tab label="Offres" path="offers">
          <OffersForRequest />
        </Tab>
        <Tab label="Docs" path="docs">
          <DocsShow />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

export const DocsShow = () => (
  <Labeled>
    <FunctionField
      label="Bill of lading"
      render={({ id, bill_of_lading, user_detail }) =>
        bill_of_lading &&
        user_detail && (
          <a
            className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary"
            href={downloadRequestFiles(
              user_detail[0]?.email,
              bill_of_lading,
              id
            )}
          >
            {bill_of_lading}
          </a>
        )
      }
    />
  </Labeled>
);

export const GeneralInfoShow = () => (
  <Stack spacing={2}>
    <h3>Informations Générales</h3>
    <Labeled>
      <TextField label="Id" source="id" />
    </Labeled>
    <Labeled>
      <TextField label="Description" source="description" />
    </Labeled>
    <Labeled>
      <DateField label="Date de publication" source="publication_date" />
    </Labeled>
    <Labeled label="Statut">
      <FunctionField
        render={(record: any) => {
          const status = record?.status;

          const statusStyles: { [key: string]: { bg: string; color: string } } =
            {
              Publiée: {
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
              Expirée: {
                bg: "#f5f5f5",
                color: "#616161",
              },
              Invalidée: {
                bg: "#fdecea",
                color: "#d32f2f",
              },
              Supprimée: {
                bg: "#eeeeee",
                color: "#424242",
              },
              Terminée: {
                bg: "#e8f5e9",
                color: "#2e7d32",
              },
            };

          const style = statusStyles[status] || {
            bg: "#e0e0e0",
            color: "#424242",
          };

          return (
            <Box
              sx={{
                width: "100%",
                backgroundColor: style.bg,
                color: style.color,
                textAlign: "center",
                py: 1,
                borderRadius: "999px",
                fontWeight: 500,
              }}
            >
              {status}
            </Box>
          );
        }}
      />
    </Labeled>

    <Labeled>
      <ReferenceField
        label="Client"
        link="show"
        source="user"
        reference="users"
      >
        <FunctionField
          label="Client"
          render={(record) => <FullName record={record} />}
        />
      </ReferenceField>
    </Labeled>
  </Stack>
);

export const CargoInfoShow = () => (
  <Stack spacing={2}>
    <h3>Informations sur la cargaison</h3>
    <Labeled>
      <TextField label="Route" source="route" />
    </Labeled>
    <Labeled>
      <TextField label="Origine" source="place_departure" />
    </Labeled>
    <Labeled>
      <TextField label="Destination" source="place_arrival" />
    </Labeled>
    <Labeled>
      <DateField label="Date d'arrivée (estimée)" source="expected_arrival" />
    </Labeled>
    <Labeled>
      <FunctionField
        label="Bill of lading"
        render={({ bill_of_lading, user_detail }) =>
          bill_of_lading &&
          user_detail && (
            <a
              className="MuiTypography-root MuiLink-root MuiLink-underlineHover MuiTypography-colorPrimary"
              href={downloadUrl(user_detail[0]?.email, bill_of_lading)}
            >
              {bill_of_lading}
            </a>
          )
        }
      />
    </Labeled>
  </Stack>
);

export const ProductsShow = () => {
  const record = useRecordContext();
  if (!record || !record.products) return false;

  return (
    <CollapsibleTable
      columns={[
        { title: "Section", render: renderField("section") },
        { title: "Groupe", render: renderField("usage_group") },
        { title: "Catégorie", render: renderField("category") },
      ]}
      data={record.products}
      renderCollapse={(rowData: any) => <ProductDetails product={rowData} />}
      // title="Liste des produits"
    />
  );
};

export const OffersShow = () => {
  const record = useRecordContext();
  if (!record || !record.offers || !record.offers.length) return false;

  return (
    <>
      <CollapsibleTable
        columns={[
          {
            title: "Transitaire",
            render: (rowData: any) => (
              <a
                href={`#/users/${rowData?.forwarder?._id}/show`}
                style={{ color: "#3f51b5", textDecoration: "none" }}
              >
                {`${rowData?.forwarder?.first_name} ${rowData?.forwarder?.last_name}`}
              </a>
            ),
          },
          { title: "Montant", render: renderField("amount") },
          { title: "Statut", render: renderField("status") },
          {
            title: "Date de publication",
            render: (rowData: any) => (
              <DateDisplay dateString={rowData.publication_date} />
            ),
          },
        ]}
        data={record?.offers}
        renderCollapse={(rowData: any) => <div />}
      />
    </>
  );
};

export const OffersShowBis = () => (
  <ReferenceManyField
    reference="request_offers"
    target="request"
    label="Les offres"
  >
    <Datagrid>
      <TextField source="amount" />
      <TextField source="status" />
    </Datagrid>
  </ReferenceManyField>
);

export const OffersForRequest = () => {
  const record = useRecordContext();

  if (!record) return null;

  return (
    <List resource="offers">
      <Datagrid>
        <Datagrid>
          <TextField source="amount" />
          <TextField source="status" />
        </Datagrid>
      </Datagrid>
    </List>
  );
};

export default RequestShow;
