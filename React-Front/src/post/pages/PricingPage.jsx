import { Button, Grid, Input, TextField, Typography, Card, CardContent, CardActions, Chip } from '@mui/material';
import { PostLayout } from '../layout/PostLayout';
import { getPaymentUrl } from '../../helpers';
import { useAuthStore } from '../../hooks';

const today = new Date();
const inADay = new Date(new Date().setDate(today.getDate() + 1));
const inAMonth = new Date(new Date().setMonth(today.getMonth() + 1));
const inAYear = new Date(new Date().setFullYear(today.getFullYear() + 1));

export const PricingPage = () => {

    const { checkLogin } = useAuthStore();

    const onPlanClick = async (id) => {
        var resp = await getPaymentUrl(id);
        console.log(resp);
        if (resp) {

            window.open(resp, '_blank', 'noreferrer');
        }
    };

    const onReload = () => {
        checkLogin();
    };


    return (
        <PostLayout>

            <Button
                size='small'
                sx={{ backgroundColor: 'secondary.main', color: 'white', fontSize: 15, mb: 3 }}
                onClick={onReload}
            >
                Revisar Estado
            </Button>

            <Grid container direction='row' justifyContent='center' alignItems='center' px={2} height={500} >
                <Card key='daily' variant="outlined" sx={{ width: 300, my: 3, mx: 2, backgroundColor: 'disable.main' }}>
                    <CardContent >
                        <Typography variant="h5" component="div">
                            Plan Diario
                        </Typography>
                        <Typography variant="body2" sx={{ my: 0.5 }}>
                            Este plan te permite acceso a toda la plataforma por 1 Dia
                        </Typography>
                        <Typography variant='caption' color="text.secondary">
                            {today.toDateString()} - {inADay.toDateString()}
                        </Typography>
                    </CardContent>
                    <CardActions
                        sx={{ m: 0, pb: 0.5 }}
                    >
                        <Button
                            size='small'
                            sx={{ backgroundColor: 'secondary.main', color: 'white', fontSize: 15 }}
                            onClick={() => onPlanClick(1)}
                        >
                            7 BOB
                        </Button>
                    </CardActions>
                </Card>
                <Card key='monthly' variant="outlined" sx={{ width: 300, my: 3, mx: 2, backgroundColor: 'disable.main' }}>
                    <CardContent >
                        <Typography variant="h5" component="div">
                            Plan Mensual
                        </Typography>
                        <Typography variant="body2" sx={{ my: 0.5 }}>
                            Este plan te permite acceso a toda la plataforma por 1 Mes
                        </Typography>
                        <Typography variant='caption' color="text.secondary">
                            {today.toDateString()} - {inAMonth.toDateString()}
                        </Typography>
                    </CardContent>
                    <CardActions
                        sx={{ m: 0, pb: 0.5 }}

                    >
                        <Button
                            size='small'
                            sx={{ backgroundColor: 'secondary.main', color: 'white', fontSize: 15 }}
                            onClick={() => onPlanClick(2)}
                        >
                            30 BOB
                        </Button>
                    </CardActions>
                </Card>
                <Card key='anual' variant="outlined" sx={{ width: 300, my: 3, mx: 2, backgroundColor: 'disable.main' }}>
                    <CardContent >
                        <Typography variant="h5" component="div">
                            Plan Anual
                        </Typography>
                        <Typography variant="body2" sx={{ my: 0.5 }}>
                            Este plan te permite acceso a toda la plataforma por 1 Año
                        </Typography>
                        <Typography variant='caption' color="text.secondary">
                            {today.toDateString()} - {inAYear.toDateString()}
                        </Typography>
                    </CardContent>
                    <CardActions
                        sx={{ m: 0, pb: 0.5 }}
                    >
                        <Button
                            size='small'
                            sx={{ backgroundColor: 'secondary.main', color: 'white', fontSize: 15 }}
                            onClick={() => onPlanClick(3)}
                        >
                            100 BOB
                        </Button>
                    </CardActions>
                </Card>
            </Grid>

        </PostLayout >
    )
}
