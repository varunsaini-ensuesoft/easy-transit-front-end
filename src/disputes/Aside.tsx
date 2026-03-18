
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
    Stack
} from '@mui/material';
import Orders from '../offer_orders/index';
import { HistoryBoxEx } from '../history/HistoryBox';

import { ACTIONS,RELATED_OBJECTS } from '../custom/mainConstants';
import Requests from '../requests/index';
import Users from '../users/index';



const Aside = () => {
    const record = useRecordContext();
    return (
        <Box width={400} display={{ xs: 'none', lg: 'block' }}>
            {/*record && <AsideActions />*/}
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
                               
                                    <span>BOUTON POUR VALIDER UTILISATEUR ?</span>    
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
    if(!record) return null;

    const createPath = useCreatePath();
    const orderId = record.order._id

    //TODO
    const clientId = record.order?.offer?.request?.user
    const forwarderId = record.order?.offer?.forwarder
    console.log("Aside dispute : ",record)
    // ---

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
                                        <Requests.icon
                                            fontSize="small"
                                            color="disabled"
                                        />
                                        <Link
                                            variant="body2"
                                            flexGrow={1}
                                            to={createPath({ resource: 'orders', type: 'show',id:orderId })}
                                        >
                                            {"Commande"}
                                        </Link>
                                    </>
                                    
                        </Grid>

                        <Grid item xs={12} display="flex" gap={1}>
                                    <>
                                         <Users.icon
                                            fontSize="small"
                                            color="disabled"
                                        /> 
                                        <Link
                                            variant="body2"
                                            flexGrow={1}
                                            to={createPath({ resource: 'users', type: 'show',id:clientId })}
                                        >
                                            {"Client"}
                                        </Link>
                                    </>
                        </Grid>

                        <Grid item xs={12} display="flex" gap={1}>
                                    <>
                                        <Users.icon
                                            fontSize="small"
                                            color="disabled"
                                        /> 
                                        <Link
                                            variant="body2"
                                            flexGrow={1}
                                            to={createPath({ resource: 'users', type: 'show',id:forwarderId })}
                                        >
                                            {"Transitaire"}
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
