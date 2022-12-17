import { Link as RouterLink } from 'react-router-dom';
import { Paid, AccountBox, Pages, Home, PostAddOutlined } from '@mui/icons-material';
import { Avatar, Box, Grid, Divider, Drawer, ListItem, Toolbar, Typography, List, ListItemButton, ListItemIcon, ListItemText, Link } from '@mui/material'
import { useAuthStore } from '../../hooks';
import { getInitials } from '../../helpers';

const options = [
    {
        name: 'Home',
        route: '/',
        icon: <Home />
    },
    {
        name: 'Crear Nuevo',
        route: '/create',
        icon: <PostAddOutlined />
    },
    {
        name: 'Mis Publicaciones',
        route: '/myposts',
        icon: <Pages />
    },
    {
        name: 'Mi perfil',
        route: '/profile',
        icon: <AccountBox />
    },
    // {
    //     name: 'Payments',
    //     route: '/payments',
    //     icon: <Paid />
    // },
];


export const SideBar = ({ drawerWidth }) => {
    const { displayName } = useAuthStore();
    const initials = getInitials(displayName);
    return (
        <Box
            component='nav'
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
            <Drawer
                variant='permanent'
                open
                sx={{
                    display: { xs: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                <Toolbar>
                    <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                        <Avatar >{initials}</Avatar>
                        <Typography variant='h6' nowrap='true' component='div'>Biblioteca UAGRM</Typography>
                    </Grid>
                </Toolbar>
                <Divider />

                <List>

                    {
                        options.map(option => (
                            <Link key={option.name} component={RouterLink} color='inherit' underline="none" to={option.route}>
                                <ListItem disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {option.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={option.name} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))
                    }
                </List>

            </Drawer>

        </Box>
    )
}
