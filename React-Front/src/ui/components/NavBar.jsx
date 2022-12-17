import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography, Link } from '@mui/material';
import { useAuthStore } from '../../hooks';
import { toCapitalized } from '../../helpers';

export const NavBar = ({ drawerWidth = 240 }) => {
    const { subscribed } = useSelector(state => state.auth);
    const { startLogout, displayName, } = useAuthStore();
    const username = toCapitalized(displayName);
    return (
        <AppBar
            position='fixed'
            sx={{
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                ml: { sm: `${drawerWidth}px` }
            }}
            color='secondary'
        >
            <Toolbar>
                <IconButton
                    color='inherit'
                    edge='start'
                    sx={{ mr: 4 }}
                >
                    <MenuOutlined />
                </IconButton>
                <Typography variant='h6' component='div' noWrap minWidth={110} p={0}>{username}</Typography>
                <Grid container direction='row' justifyContent='end' alignItems='center' pr={10}>
                    <Link component={RouterLink} color='inherit' mx={3} underline="hover" to='/'>
                        Home
                    </Link>
                    {
                        subscribed === false ? (

                            <Link component={RouterLink} color='inherit' mx={3} underline="hover" to='/pricing'>
                                Pricing
                            </Link>
                        ) : (<></>)
                    }
                    <IconButton
                        color='inherit'
                        edge='start'
                        sx={{ mx: 4 }}
                        onClick={startLogout}
                    >
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>

        </AppBar>
    )
}
