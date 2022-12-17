import { Grid, Typography, Table, TableHead, TableRow, TableBody, TableContainer, TableCell, Paper, tableCellClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PostLayout } from '../layout/PostLayout';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#2671E5',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(id, type, paidAt, from, to, status) {
    return { id, type, paidAt, from, to, status };
}

const rows = [
    createData(4, 'Diario', '03/12/2022', '03/12/2022', '04/12/2022', true),
    createData(3, 'Diario', '02/12/2022', '02/12/2022', '03/12/2022', false),
    createData(2, 'Mensual', '01/11/2022', '01/11/2022', '01/12/2022', false),
    createData(1, 'Anual', '15/10/2021', '15/10/2021', '15/10/2022', false),
];

export const PaymentsPage = () => {
    return (
        <PostLayout>

            <Grid container direction='row' justifyContent='space-between' alignItems='center' px={2} >
                <Typography fontSize={39} fontWeight='light'>Mis Pagos</Typography>

                <TableContainer component={Paper} sx={{ my: 5 }}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table dark">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell align="center">#ID</StyledTableCell>
                                <StyledTableCell align="center">Tipo</StyledTableCell>
                                <StyledTableCell align="center">Pagado</StyledTableCell>
                                <StyledTableCell align="center">Desde</StyledTableCell>
                                <StyledTableCell align="center">Hasta</StyledTableCell>
                                <StyledTableCell align="center">Estado</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="center">{row.id}</StyledTableCell>
                                    <StyledTableCell align="center">{row.type}</StyledTableCell>
                                    <StyledTableCell align="center">{row.paidAt}</StyledTableCell>
                                    <StyledTableCell align="center">{row.from}</StyledTableCell>
                                    <StyledTableCell align="center">{row.to}</StyledTableCell>
                                    <StyledTableCell align="center">{row.status ? 'Active' : 'Expired'}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </PostLayout>
    )
}
