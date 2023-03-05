import * as React from 'react';
import "./ReactForm.css"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];



const UserTable = () => {
    const [userData, setUserData] = useState({})

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios.get("http://localhost:8080/user")
            .then((res) => setUserData(res.data))
            .catch((err) => console.log('error', err))
    }
    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/user/${id}`)
            .then(() => getData())
            .catch((err) => console.log("delete err", err))
    }
    console.log('userData table', userData)

    return (
        <>
            <div>UserTable</div>
            <div className='table'>
                <TableContainer component={Paper}>
                    <Table >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="centre">Name</StyledTableCell>
                                <StyledTableCell align="centre">Email</StyledTableCell>
                                <StyledTableCell align="centre">Password</StyledTableCell>
                                <StyledTableCell align="centre">Gender</StyledTableCell>
                                <StyledTableCell align="centre">Age</StyledTableCell>
                                <StyledTableCell align="centre">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userData.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell align="centre">{row?.name}</StyledTableCell>
                                    <StyledTableCell align="centre">{row?.email}</StyledTableCell>
                                    <StyledTableCell align="centre">{row?.password}</StyledTableCell>
                                    <StyledTableCell align="centre">{row?.gender}</StyledTableCell>
                                    <StyledTableCell align="centre">{row?.age}</StyledTableCell>
                                    <StyledTableCell align="centre">
                                        <button onClick={()=>handleDelete(row.id)}>Delete</button>
                                        <button>Edit</button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <Link to="/">Add User</Link>

        </>

    )
}

export default UserTable

