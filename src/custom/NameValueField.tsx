import { Typography } from '@mui/material';

const NameValueField = ({name,value}:{name:string|JSX.Element,value:string|JSX.Element}) => {

    const sx_name = {
        color : "rgba(0, 0, 0, 0.7)",
        fontFamily : '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize : "0.85em",
        letterSpacing: "0.00938em",
        fontWeight: 400,
        lineHeight: 1.5,
    }

    const sx_value = {
        color : "rgba(0, 0, 0, 0.87)",
        fontFamily : '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize : "0.875em",
        letterSpacing: "0.01071em",
        fontWeight: 400,
        lineHeight: 1.43,
    }

    
    return (
        <div>
        <Typography sx={sx_name} component="span">{name+ " : "}</Typography><Typography sx={sx_value} component="span">{value}</Typography>
        </div>
    )
}

export default NameValueField;