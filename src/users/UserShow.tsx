import React, { useMemo, useState } from "react";
import { Show, TabbedShowLayout, Tab, WithRecord } from "react-admin";
import Aside from "./Aside";
import Avatar from "@mui/material/Avatar";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CloseIcon from "@mui/icons-material/Close";
import FilePreview from "../custom/FilePreview";
import CertifiedField from "../renderers/field/CertifiedField";
import { downloadUserFiles } from "../config";

type DocumentItem = {
  id: string;
  section: string;
  title: string;
  fileName: string;
  url: string;
};

type DocumentPreviewItem = DocumentItem & {
  kind: "image" | "pdf" | "file";
};

const TEMPORARY_PDFS: DocumentItem[] = [
  {
    id: "temporary-sample-pdf",
    section: "Temporary PDFs",
    title: "Sample PDF",
    fileName: "sample.pdf",
    url: "/sample.pdf",
  },
];

const Title = () => {
  return <span>Visualisation d'un utilisateur </span>;
};

const Address = ({ address }: { address: any }) => {
  if (!address) return <span>-</span>;

  const { street, city, country, postal_code } = address;

  return (
    <span>
      {street || "-"} {postal_code ? `- ${postal_code}` : ""}{" "}
      {city ? `- ${city}` : ""} {country ? `- ${country}` : ""}
    </span>
  );
};

const ValidationStatus = ({ status }: { status?: string }) => {
  return (
    <span>
      {status == "Default" && "Pas Complet"}
      {status == "Complete" && "Complet"}
      {status == "Validated" && "Valid\u00e9"}
      {status == "Problem" && "Probl\u00e9matique"}
    </span>
  );
};

const SummaryField = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <Box>
    <Typography
      variant="caption"
      sx={{ display: "block", color: "text.secondary", mb: 0.5 }}
    >
      {label}
    </Typography>
    <Typography variant="body2">{value || "-"}</Typography>
  </Box>
);

const SummarySection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Card
    variant="outlined"
    sx={(theme) => ({
      height: "100%",
      minWidth: 0,
      overflow: "hidden",
      boxSizing: "border-box",
      borderRadius: 3,
      boxShadow: theme.shadows[1],
      borderColor: theme.palette.divider,
    })}
  >
    <CardContent sx={{ width: "100%", minWidth: 0, boxSizing: "border-box" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Grid container spacing={2} sx={{ width: "100%", m: 0 }}>
        {children}
      </Grid>
    </CardContent>
  </Card>
);

const FileTile = ({
  label,
  url,
  fileName,
  isImage = true,
  width,
  imageHeight,
}: {
  label: string;
  url?: string;
  fileName?: string;
  isImage?: boolean;
  width?: number | string;
  imageHeight?: number | string;
}) => (
  <Box>
    <Typography
      variant="caption"
      sx={{ display: "block", color: "text.secondary", mb: 0.5 }}
    >
      {label}
    </Typography>
    <FilePreview
      url={url}
      fileName={fileName}
      isImage={isImage}
      width={width}
      imageHeight={imageHeight}
    />
  </Box>
);

const getFileKind = (fileName?: string): "image" | "pdf" | "file" => {
  const normalized = (fileName || "").toLowerCase();

  if (
    normalized.endsWith(".png") ||
    normalized.endsWith(".jpg") ||
    normalized.endsWith(".jpeg") ||
    normalized.endsWith(".gif") ||
    normalized.endsWith(".webp")
  ) {
    return "image";
  }

  if (normalized.endsWith(".pdf")) {
    return "pdf";
  }

  return "file";
};

const buildUserDocumentSections = (record: any): DocumentItem[] => {
  if (!record?.email) {
    return TEMPORARY_PDFS;
  }

  const items: DocumentItem[] = [];

  if (record.photo) {
    items.push({
      id: "profile-photo",
      section: "Compte & Profil",
      title: "Photo",
      fileName: record.photo,
      url: downloadUserFiles(record.email, record.photo),
    });
  }

  if (record?.company_info?.logo) {
    items.push({
      id: "company-logo",
      section: "Informations Professionnelles",
      title: "Logo",
      fileName: record.company_info.logo,
      url: downloadUserFiles(record.email, record.company_info.logo),
    });
  }

  if (record?.company_info?.document_ninea) {
    items.push({
      id: "company-ninea",
      section: "Informations Professionnelles",
      title: "Document Ninea",
      fileName: record.company_info.document_ninea,
      url: downloadUserFiles(record.email, record.company_info.document_ninea),
    });
  }

  if (record?.company_info?.document_register_number) {
    items.push({
      id: "company-register-number",
      section: "Informations Professionnelles",
      title: "Num\u00e9ro Registre",
      fileName: record.company_info.document_register_number,
      url: downloadUserFiles(
        record.email,
        record.company_info.document_register_number
      ),
    });
  }

  if (record?.idCard?.document_front) {
    items.push({
      id: "id-card-front",
      section: "Carte d'identit\u00e9",
      title: "Recto",
      fileName: record.idCard.document_front,
      url: downloadUserFiles(record.email, record.idCard.document_front),
    });
  }

  if (record?.idCard?.document_back) {
    items.push({
      id: "id-card-back",
      section: "Carte d'identit\u00e9",
      title: "Verso",
      fileName: record.idCard.document_back,
      url: downloadUserFiles(record.email, record.idCard.document_back),
    });
  }

  return [...items, ...TEMPORARY_PDFS];
};

const DocumentPreviewDialog = ({
  selectedDocument,
  onClose,
}: {
  selectedDocument: DocumentPreviewItem | null;
  onClose: () => void;
}) => {
  if (!selectedDocument) {
    return null;
  }

  return (
    <Dialog open={!!selectedDocument} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ pr: 7 }}>
        {selectedDocument.title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {selectedDocument.kind === "image" ? (
          <Box
            component="img"
            src={selectedDocument.url}
            alt={selectedDocument.title}
            sx={{
              width: "100%",
              maxHeight: "70vh",
              objectFit: "contain",
              borderRadius: 2,
              backgroundColor: "background.default",
            }}
          />
        ) : selectedDocument.kind === "pdf" ? (
          <Box
            component="iframe"
            src={selectedDocument.url}
            title={selectedDocument.title}
            sx={{
              width: "100%",
              minHeight: "70vh",
              border: 0,
              borderRadius: 2,
            }}
          />
        ) : (
          <Stack spacing={2} alignItems="center" py={6}>
            <InsertDriveFileIcon sx={{ fontSize: 64, color: "text.secondary" }} />
            <Typography variant="body1" color="text.secondary">
              Preview is not available for this file type.
            </Typography>
            <Button
              variant="outlined"
              component="a"
              href={selectedDocument.url}
              target="_blank"
              rel="noreferrer"
            >
              Open file
            </Button>
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

const ResumeContent = ({ record }: { record: any }) => {
  const company = record?.company_info || {};
  const idCard = record?.idCard || {};
  const phone = record?.phone
    ? `(${record.phone.phone_code}) ${record.phone.phone_number}`
    : "-";
  const companyPhone = company?.phone
    ? `(${company.phone.phone_code}) ${company.phone.phone_number}`
    : "-";

  return (
    <Box
      py={1}
      sx={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        overflowX: "hidden",
        overflowY: "auto",
        scrollbarGutter: "stable",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          alignItems: "stretch",
        }}
      >
        <Box
          sx={{
            minWidth: 0,
            width: { xs: "100%", md: "calc(50% - 12px)" },
            flex: { xs: "1 1 100%", md: "0 0 calc(50% - 12px)" },
          }}
        >
          <SummarySection title="Informations Générales">
            <Grid item xs={12} sm={6}>
              <SummaryField label="Id" value={record?.id} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SummaryField label="Prénom" value={record?.first_name} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SummaryField label="Nom" value={record?.last_name} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SummaryField label="Sexe" value={record?.gender} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SummaryField label="Tel" value={phone} />
            </Grid>
            <Grid item xs={12}>
              <SummaryField
                label="Adresse"
                value={<Address address={record?.address} />}
              />
            </Grid>
          </SummarySection>
        </Box>

        <Box
          sx={{
            minWidth: 0,
            width: { xs: "100%", md: "calc(50% - 12px)" },
            flex: { xs: "1 1 100%", md: "0 0 calc(50% - 12px)" },
          }}
        >
          <SummarySection title="Compte & Profil">
            <Grid item xs={12} sm={6}>
              <Typography
                variant="caption"
                sx={{ display: "block", color: "text.secondary", mb: 0.5 }}
              >
                Photo
              </Typography>
              <Avatar
                variant="rounded"
                sx={{ width: 96, height: 96 }}
                src={downloadUserFiles(record?.email, record?.photo)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SummaryField label="Email" value={record?.email} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SummaryField
                label="Email valide ?"
                value={record?.valid_email ? "Oui" : "Non"}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SummaryField label="Profil" value={record?.profil?.type} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SummaryField
                label="Statut"
                value={<ValidationStatus status={record?.validation?.status} />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="caption"
                sx={{ display: "block", color: "text.secondary", mb: 0.5 }}
              >
                Certification
              </Typography>
              <CertifiedField record={record} />
            </Grid>
            <Grid item xs={12}>
              <SummaryField label="Description" value={record?.description} />
            </Grid>
            {record?.profil?.sponsor && (
              <Grid item xs={12} sm={6}>
                <SummaryField label="Sponsor" value={record?.profil?.sponsor} />
              </Grid>
            )}
            {record?.profil?.easyTransit_number && (
              <Grid item xs={12} sm={6}>
                <SummaryField
                  label="Nom EasyTransit"
                  value={record?.profil?.easyTransit_number}
                />
              </Grid>
            )}
          </SummarySection>
        </Box>

        <Box
          sx={{
            minWidth: 0,
            width: { xs: "100%", md: "calc(50% - 12px)" },
            flex: { xs: "1 1 100%", md: "0 0 calc(50% - 12px)" },
          }}
        >
          <SummarySection title="Informations Professionnelles">
            <Grid item xs={12} sm={6}>
              <SummaryField label="Nom (entreprise)" value={company?.name} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SummaryField label="Email (entreprise)" value={company?.email} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SummaryField label="Tel (entreprise)" value={companyPhone} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SummaryField label="Ninea (entreprise)" value={company?.ninea} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SummaryField
                label="Position (entreprise)"
                value={company?.position}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SummaryField
                label="Nom Homologation"
                value={company?.approuval_number}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SummaryField
                label="Secteur d'activité"
                value={company?.business_sector}
              />
            </Grid>
            <Grid item xs={12}>
              <SummaryField
                label="Adresse"
                value={<Address address={company?.address} />}
              />
            </Grid>
            <Grid item xs={12}>
              <SummaryField
                label="Description (entreprise)"
                value={company?.description}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FileTile
                label="Logo"
                url={downloadUserFiles(record?.email, company?.logo)}
                fileName={company?.logo}
                isImage={true}
                width={180}
                imageHeight={110}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FileTile
                label="Document Ninea"
                url={downloadUserFiles(record?.email, company?.document_ninea)}
                fileName={company?.document_ninea}
                isImage={true}
                width={180}
                imageHeight={110}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FileTile
                label="Nom Registre"
                url={downloadUserFiles(
                  record?.email,
                  company?.document_register_number
                )}
                fileName={company?.document_register_number}
                isImage={true}
                width={180}
                imageHeight={110}
              />
            </Grid>
          </SummarySection>
        </Box>

        <Box
          sx={{
            minWidth: 0,
            width: { xs: "100%", md: "calc(50% - 12px)" },
            flex: { xs: "1 1 100%", md: "0 0 calc(50% - 12px)" },
          }}
        >
          <SummarySection title="Carte d'identité">
            <Grid item xs={12} sm={6}>
              <SummaryField label="Type" value={idCard?.type_document} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SummaryField label="Nom" value={idCard?.num_document} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SummaryField label="Pays" value={idCard?.country} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SummaryField label="Date Exp." value={idCard?.validity_date} />
            </Grid>
            <Grid item xs={12} md={6}>
              <FileTile
                label="Recto"
                url={downloadUserFiles(record?.email, idCard?.document_front)}
                fileName={idCard?.document_front}
                isImage={true}
                width={180}
                imageHeight={110}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FileTile
                label="Verso"
                url={downloadUserFiles(record?.email, idCard?.document_back)}
                fileName={idCard?.document_back}
                isImage={true}
                width={180}
                imageHeight={110}
              />
            </Grid>
          </SummarySection>
        </Box>
      </Box>
    </Box>
  );
};

const DocumentsTabContent = ({ record }: { record: any }) => {
  const [selectedDocument, setSelectedDocument] =
    useState<DocumentPreviewItem | null>(null);

  const documents = useMemo(() => buildUserDocumentSections(record), [record]);

  const groupedDocuments = useMemo(() => {
    return documents.reduce((acc: Record<string, DocumentItem[]>, item) => {
      if (!acc[item.section]) {
        acc[item.section] = [];
      }

      acc[item.section].push(item);
      return acc;
    }, {});
  }, [documents]);

  const openPreview = (document: DocumentItem) => {
    setSelectedDocument({
      ...document,
      kind: getFileKind(document.fileName),
    });
  };

  const renderIcon = (document: DocumentItem) => {
    const kind = getFileKind(document.fileName);

    if (kind === "image") {
      return <ImageIcon color="primary" sx={{ fontSize: 32 }} />;
    }

    if (kind === "pdf") {
      return <PictureAsPdfIcon color="error" sx={{ fontSize: 32 }} />;
    }

    return <InsertDriveFileIcon color="action" sx={{ fontSize: 32 }} />;
  };

  return (
    <Box
      py={1}
      sx={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        overflowX: "hidden",
        overflowY: "auto",
        scrollbarGutter: "stable",
      }}
    >
      <Stack spacing={3} sx={{ width: "100%", maxWidth: "100%", minWidth: 0, overflowX: "hidden" }}>
        {Object.entries(groupedDocuments).map(([sectionTitle, sectionDocuments]) => (
          <Card
            key={sectionTitle}
            variant="outlined"
            sx={(theme) => ({
              width: "100%",
              minWidth: 0,
              maxWidth: "100%",
              borderRadius: 3,
              borderColor: theme.palette.divider,
              boxShadow: theme.shadows[1],
              overflow: "hidden",
              contain: "inline-size",
            })}
          >
            <CardContent
              sx={{
                width: "100%",
                maxWidth: "100%",
                minWidth: 0,
                overflowX: "hidden",
                contain: "inline-size",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                {sectionTitle}
              </Typography>

              <Box
                sx={(theme) => ({
                  width: "100%",
                  maxWidth: "100%",
                  minWidth: 0,
                  display: "block",
                  overflowX: "auto",
                  overflowY: "hidden",
                  pb: 1,
                  pl: 0.25,
                  pr: 0.25,
                  contain: "inline-size",
                  scrollBehavior: "smooth",
                  scrollbarWidth: "thin",
                  WebkitOverflowScrolling: "touch",
                  overscrollBehaviorX: "contain",
                  "&::-webkit-scrollbar": {
                    height: 8,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: theme.palette.action.disabled,
                    borderRadius: 999,
                  },
                })}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    width: "max-content",
                    minWidth: "100%",
                    maxWidth: "none",
                    overflow: "visible",
                    flexWrap: "nowrap",
                  }}
                >
                  {sectionDocuments.map((document) => {
                    const kind = getFileKind(document.fileName);

                    return (
                      <Box
                        key={document.id}
                        sx={{
                          flex: "0 0 auto",
                          width: kind === "image" ? 220 : 280,
                          minWidth: kind === "image" ? 220 : 280,
                          maxWidth: kind === "image" ? 220 : 280,
                        }}
                      >
                      {kind === "image" ? (
                        <Card
                          variant="outlined"
                          sx={(theme) => ({
                            width: 220,
                            height: 230,
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: 3,
                            overflow: "hidden",
                            borderColor: theme.palette.divider,
                            boxShadow: theme.shadows[1],
                          })}
                        >
                          <CardActionArea onClick={() => openPreview(document)}>
                            <Box
                              sx={{
                                position: "relative",
                                height: 140,
                                overflow: "hidden",
                              }}
                            >
                              <Box
                                component="img"
                                src={document.url}
                                alt={document.title}
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  display: "block",
                                }}
                              />
                              <Box
                                sx={(theme) => ({
                                  position: "absolute",
                                  inset: 0,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  backgroundColor: theme.palette.action.active,
                                  opacity: 0,
                                  transition: theme.transitions.create("opacity", {
                                    duration: theme.transitions.duration.shorter,
                                  }),
                                  ".MuiCardActionArea-root:hover &": {
                                    opacity: 0.6,
                                  },
                                })}
                              >
                                <VisibilityOutlinedIcon
                                  sx={{
                                    fontSize: 34,
                                    color: "common.white",
                                  }}
                                />
                              </Box>
                            </Box>
                            <CardContent
                              sx={{
                                p: 1.25,
                                height: 90,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                              }}
                            >
                              <Typography variant="subtitle2" noWrap>
                                {document.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  mt: 0.5,
                                  fontSize: "0.8rem",
                                  lineHeight: 1.3,
                                  overflow: "hidden",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                }}
                              >
                                {document.fileName}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      ) : (
                        <Card
                          variant="outlined"
                          sx={(theme) => ({
                            width: 280,
                            minHeight: 170,
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: 3,
                            borderColor: theme.palette.divider,
                            boxShadow: theme.shadows[1],
                            background: `linear-gradient(180deg, ${theme.palette.background.paper} 0%, ${theme.palette.action.hover} 100%)`,
                          })}
                        >
                          <CardActionArea
                            onClick={() => openPreview(document)}
                            sx={{ flexGrow: 1, alignItems: "stretch" }}
                          >
                            <CardContent sx={{ minHeight: 96, pb: 1.25 }}>
                              <Stack direction="row" spacing={2} alignItems="center">
                                {renderIcon(document)}
                                <Box sx={{ minWidth: 0 }}>
                                  <Typography variant="subtitle1" noWrap>
                                    {document.title}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                      mt: 0.5,
                                      overflow: "hidden",
                                      display: "-webkit-box",
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: "vertical",
                                    }}
                                  >
                                    {document.fileName}
                                  </Typography>
                                </Box>
                              </Stack>
                            </CardContent>
                          </CardActionArea>

                          <Stack
                            direction={{ xs: "column", sm: "row" }}
                            spacing={1}
                            px={2}
                            pb={2}
                            pt={0.5}
                          >
                            <Button
                              variant="outlined"
                              fullWidth
                              onClick={() => openPreview(document)}
                              sx={{ minWidth: 0 }}
                            >
                              Preview
                            </Button>
                            <Button
                              variant="contained"
                              fullWidth
                              component="a"
                              href={document.url}
                              target="_blank"
                              rel="noreferrer"
                              startIcon={<DownloadIcon />}
                              sx={{ minWidth: 0 }}
                            >
                              Download
                            </Button>
                          </Stack>
                        </Card>
                      )}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <DocumentPreviewDialog
        selectedDocument={selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />
    </Box>
  );
};

const UserShow = () => {
  return (
    <Show title={<Title />} aside={<Aside />}>
      <TabbedShowLayout>
        <Tab label="Résumé">
          <WithRecord render={(record) => <ResumeContent record={record} />} />
        </Tab>
        <Tab label="Documents" path="documents">
          <WithRecord render={(record) => <DocumentsTabContent record={record} />} />
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

export default UserShow;
