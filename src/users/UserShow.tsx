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
  ImageField,
  WithRecord,
  DateField,
} from "react-admin";

import CertifiedField from "../renderers/field/CertifiedField";
import { downloadUserFiles } from "../config";
import Avatar from "@mui/material/Avatar";
import Aside from "./Aside";
import { Stack } from "@mui/material";
import FilePreview from "../custom/FilePreview";

const Title = () => {
  return <span>Visualisation d'un utilisateur </span>;
};

const Address = ({ address }: { address: any }) => {
  if (!address) return <div></div>;

  const { street, city, country, postal_code } = address;

  return (
    <div>
      <i>Rue :</i> {street} <b> - </b> <i>Code Postal :</i> {postal_code}{" "}
      <b> - </b>
      <i>Ville : </i>
      {city} <b> - </b> <i> Pays : </i>
      {country}
    </div>
  );
};

const ValidationStatus = ({ status }: { status: string }) => {
  return (
    <span>
      {status == "Default" && "Pas Complet"}
      {status == "Complete" && "Complet"}
      {status == "Validated" && "Validé"}
      {status == "Problem" && "Problématique"}
    </span>
  );
};

const Label = ({ children, label }: { children: any; label: string }) => (
  <div>
    <Labeled label={label}>{children}</Labeled>
  </div>
);

/*
const Company = ({record}:{record:any}) => {
    if(!record || !record.company_info) return (<div>Néant</div>)
    else {
       
        const {name,logo,ninea,description,email,phone,document_ninea,date_creation,
              position,approuval_number,registration_number,business_sector,address,
              document_register_number} = record?.company_info

        return (
        <div>
             
            <Labeled label="Nom (entreprise)"><span>{name}</span></Labeled>
            <Avatar variant="square" src={downloadUserFiles(record.email,logo)}/>
            <Labeled label={"Description (entreprise)"}><span>{description}</span></Labeled>
            <Label label={"Email (entreprise)"}><a href={`mailto:${email}`}> {email} </a></Label>
            
        </div>
        )
    }
}
*/

const Company = ({ record }: { record: any }) => {
  if (!record || !record.company_info) return <div>Néant</div>;

  const base = "company_info.";

  const { logo, phone, document_ninea, address, document_register_number } =
    record?.company_info;

  const avatar_download_url = downloadUserFiles(record.email, logo);
  const ninea_download_url = downloadUserFiles(record.email, document_ninea);
  const tel_entreprise = phone
    ? `(${phone.phone_code}) ${phone?.phone_number}`
    : "";
  const registration_download_url = downloadUserFiles(
    record?.email,
    document_register_number
  );

  return (
    <Stack spacing={2}>
      <Labeled label="Nom (entreprise)">
        <TextField source={base + "name"} />
      </Labeled>

      <Labeled label="Logo">
        <FilePreview
          url={avatar_download_url}
          fileName={logo}
          isImage={true}
        //   height={120}
        />
      </Labeled>

      <Labeled label={"Description (entreprise)"}>
        <TextField source={base + "description"} />
      </Labeled>

      <Labeled label={"Email (entreprise)"}>
        <TextField source={base + "email"} />
      </Labeled>

      <Labeled label={"Tel (entreprise)"}>
        <FunctionField
          source={base + "phone?.phone_number"}
          render={() => <span>{tel_entreprise}</span>}
        />
      </Labeled>

      <Labeled label={"Ninea (entreprise)"}>
        <TextField source={base + "ninea"} />
      </Labeled>

      <Labeled label={"Document Ninea"}>
        <FilePreview
          url={ninea_download_url}
          fileName={document_ninea}
          isImage={true}
        />
      </Labeled>

      <Labeled label={"Position (entreprise)"}>
        <TextField source={base + "position"} />
      </Labeled>

      <Labeled label={"Numéro Homologation"}>
        <TextField source={base + "approuval_number"} />
      </Labeled>

      <Labeled label={"Numéro Registre"}>
        <FilePreview
          url={registration_download_url}
          fileName={document_register_number}
          isImage={true}
        />
      </Labeled>

      <Labeled label={"Secteur d'activité"}>
        <TextField source={base + "business_sector"} />
      </Labeled>

      <Labeled label={"Addresse"}>
        <Address address={address} />
      </Labeled>
    </Stack>
  );
};

const IDCard = ({ record }: { record: any }) => {
  if (!record || !record.idCard) return <div></div>;

  const { document_back, document_front } = record?.idCard;
  const base = "idCard.";

  const recto_download_url = downloadUserFiles(record.email, document_front);
  const verso_download_url = downloadUserFiles(record.email, document_back);

  return (
    <Stack spacing={2}>
      <Labeled label={"Type"}>
        <TextField source={base + "type_document"} />
      </Labeled>

      <Labeled label={"Numéro"}>
        <TextField source={base + "num_document"} />
      </Labeled>

      <Labeled label={"Pays"}>
        <TextField source={base + "country"} />
      </Labeled>

      <Labeled label={"Date Exp."}>
        <DateField source={base + "validity_date"} />
      </Labeled>

      <Labeled label={"Recto"}>
        <FilePreview
          url={recto_download_url}
          fileName={document_front}
          isImage={true}
        //   height={200}
        />
      </Labeled>

      <Labeled label={"Verso"}>
        <FilePreview
          url={verso_download_url}
          fileName={document_back}
          isImage={true}
        //   height={200}
        />
      </Labeled>
    </Stack>
  );
};

const UserShow = () => {
  return (
    <Show title={<Title />} aside={<Aside />}>
      <TabbedShowLayout>
        <Tab label="Résumé">
          <h3>Informations Générales</h3>
          <TextField label="Id" source="id" />
          <TextField label="Prénom" source="first_name" />
          <TextField label="Nom" source="last_name" />
          <TextField label="Sexe" source="gender" />
          <FunctionField
            label="Tel"
            render={(record) =>
              record && record.phone
                ? `(${record.phone.phone_code}) ${record.phone.phone_number}`
                : ""
            }
          />

          <FunctionField
            label="Adresse"
            render={(record) => <Address address={record.address} />}
          />

          <h3>{"Compte & Profil"}</h3>
          <FunctionField
            label="Photo"
            render={(record) => (
              <Avatar
                variant="rounded"
                sx={{
                  width: 120,
                  height: 120,
                }}
                src={downloadUserFiles(record.email, record.photo)}
              />
            )}
          />
          <EmailField label="Email" source="email" />
          <BooleanField label="Email valide ?" source="valid_email" />
          <TextField label="Description" source="description" />
          <TextField label="Profil" source="profil.type" />
          <CertifiedField />
          <FunctionField
            label="Statut"
            render={(record) => (
              <ValidationStatus status={record.validation.status} />
            )}
          />

          <WithRecord
            render={(record) => (
              <>
                {record && record.profil && record.sponsor && (
                  <TextField label="Sponsor" source="profil.sponsor" />
                )}
                {record && record.profil && record.easyTransit_number && (
                  <TextField
                    label="Numéro EasyTransit"
                    source="profil.easyTransit_number"
                  />
                )}
              </>
            )}
          />

          <h3>{"Informations Professionnelles"}</h3>
          <WithRecord render={(record) => <Company record={record} />} />

          <h3>{"Carte d'identité"}</h3>
          <FunctionField
            label={false}
            render={(record) => <IDCard record={record} />}
          />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

export default UserShow;
