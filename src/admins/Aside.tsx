
import {
    useRecordContext,
    Link,
    CreateButton,
} from 'react-admin';
import {
    Typography,
    Card,
    CardContent,
    Box,
    Grid,
    Stack
} from '@mui/material';
import Orders from '../offer_orders/index';
import Deliverynotes from '../deliverynotes/index';
import HistoryBox, { HistoryBoxEx } from '../history/HistoryBox';
import { ACTIONS, RELATED_OBJECTS } from '../custom/mainConstants';



const Aside = () => {
    const record = useRecordContext();
    return (
        <Box width={400} display={{ xs: 'none', lg: 'block' }}>
           {/*  {record && <AsideActions />} */}
            {record && <RelatedObjects />}
            {/*record && <HistoryBoxEx/>*/}
        </Box>
    );
};



const AsideActions = () => {

    const record = useRecordContext();
    if(!record) return null;

    const {id} = record;
   
   

    return (
        <Box ml={2} mb={1}>
            <Card>
                <CardContent>
                    <Typography variant="subtitle2" gutterBottom>
                        {ACTIONS}
                    </Typography>
                    <Grid container rowSpacing={1} columnSpacing={1}>
                        <Grid item xs={12} display="flex" gap={1}>
                            <Stack>        
                               
                                    <span>BOUTON POUR ACTION ?</span>    
                                    <Box mt="5px" />

                            </Stack>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

        </Box>
    );
}


const RelatedObjects = () => {
    const record = useRecordContext();

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
                                        <Orders.icon
                                            fontSize="small"
                                            color="disabled"
                                        />
                                        <Link
                                            variant="body2"
                                            flexGrow={1}
                                            to={{
                                                pathname: '/orders',
                                                search: `&filter=${JSON.stringify({
                                                    "clientId:eq": record?.id,
                                                })}`,
                                            }}
                                        >
                                           LIEN VERS OBJECT 1
                                        </Link>
                                    </>
                        </Grid>

                        <Grid item xs={12} display="flex" gap={1}>
                                    <>
                                        <Deliverynotes.icon
                                            fontSize="small"
                                            color="disabled"
                                        />
                                        <Link
                                            variant="body2"
                                            flexGrow={1}
                                            to={{
                                                pathname: '/operations',
                                                search: `&filter=${JSON.stringify({
                                                    "clientId:eq": record?.id,
                                                })}`,
                                            }}
                                        >
                                            LIEN VERS OBJECT 1
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
