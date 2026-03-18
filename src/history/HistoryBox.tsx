
import { Box,Card,CardContent,Typography } from '@mui/material';
import History from './History'
import { AppObjectType, AppResourceType } from '../custom/MainTypes';



const HistoryBox = ({objectType}:{objectType:AppResourceType}) => (
    <Box ml={2} mb={1}>
            <Card>
                <CardContent>
                 <History showTitle={true} objectType={objectType}/>
                </CardContent>
            </Card>

    </Box>
)

export const HistoryBoxEx = () => (
    <Box ml={2} mb={1}>
            <Card>
                <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                     {"Historique"}
                </Typography>
                 <span>Historique de l'objet ?</span>
                </CardContent>
            </Card>

    </Box>
)

export default HistoryBox;