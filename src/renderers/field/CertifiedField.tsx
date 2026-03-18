import React from 'react';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';

const CertifiedField =  ({ record }:{record?:any}) =>
    (record && record.profil && record.profil.isCertified)
        ? <div style={{marginBottom:5}}> <Chip
        size="small"
        label="Certifié"
        deleteIcon={<DoneIcon />}
      /></div>
        : null;

export default CertifiedField;


