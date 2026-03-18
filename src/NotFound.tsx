
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import HotTub from '@mui/icons-material/HotTub';
import History from '@mui/icons-material/History';

import { useAuthenticated } from 'ra-core';
import { Title } from 'react-admin';

type NotFoundProps = {className:string} & any

const NotFound = (props:NotFoundProps) => {
    const { className} = props;


    useAuthenticated();

    return (
        <Root className={className}>
            <Title title={"Page non trouvée"} />
            <div className={NotFoundClasses.message}>
                <HotTub className={NotFoundClasses.icon} />
                <h1>Page non trouvée</h1>
                <div>La page n'existe pas. Veuillez vérifier le lien utilisé</div>
            </div>
            <div className={NotFoundClasses.toolbar}>
                <Button
                    variant="contained"
                    startIcon={<History />}
                    onClick={goBack}
                >
                    RETOUR
                </Button>
            </div>
        </Root>
    );
};

export default NotFound;

const PREFIX = 'RaNotFound';

export const NotFoundClasses = {
    icon: `${PREFIX}-icon`,
    message: `${PREFIX}-message`,
    toolbar: `${PREFIX}-toolbar`,
};

const Root = styled('div', {
    name: PREFIX,
    overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
        height: '100%',
    },
    [theme.breakpoints.down('md')]: {
        height: '100vh',
        marginTop: '-3em',
    },

    [`& .${NotFoundClasses.icon}`]: {
        width: '9em',
        height: '9em',
    },

    [`& .${NotFoundClasses.message}`]: {
        textAlign: 'center',
        fontFamily: 'Roboto, sans-serif',
        opacity: 0.5,
        margin: '0 1em',
    },

    [`& .${NotFoundClasses.toolbar}`]: {
        textAlign: 'center',
        marginTop: '2em',
    },
}));

function goBack() {
    window.history.go(-1);
}
