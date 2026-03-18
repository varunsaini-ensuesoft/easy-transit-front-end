import { Box, Button, Stack, Typography } from "@mui/material";

const FilePreview = ({
  url,
  fileName,
  isImage = true,
}: {
  url?: string;
  fileName?: string;
  isImage?: boolean;
}) => {

  // 🚫 No file → show clean message only
  if (!fileName) {
    return (
      <Box
        sx={{
          border: "1px dashed #ccc",
          borderRadius: 2,
          p: 2,
          width: 220,
          textAlign: "center",
          color: "#999",
          bgcolor: "#fafafa",
        }}
      >
        📂 Aucun document
      </Box>
    );
  }

  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        p: 2,
        width: 220,
        bgcolor: "#fafafa",
        textAlign: "center",
      }}
    >
      {isImage ? (
        <Box
          component="img"
          src={url}
          alt="preview"
          sx={{
            width: "100%",
            height: 140,
            objectFit: "contain",
            mb: 1,
          }}
        />
      ) : (
        <Typography variant="body2" sx={{ mb: 1 }}>
          📄 Aperçu
        </Typography>
      )}

      <Button
        variant="contained"
        size="small"
        href={url}
        // target="_blank"
        sx={{ textTransform: "none" }}
      >
        Télécharger
      </Button>
    </Box>
  );
};

export default FilePreview;