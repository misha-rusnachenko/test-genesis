import React, { useState } from 'react';
import { 
    Paper, 
    TableContainer, 
    Table, 
    TableBody,
    TablePagination, 
    Grid,
    Theme, 
    makeStyles 
} from '@material-ui/core';

import { User } from '../definitions';
import TableRowComponent from './TableRowComponent';

import searchIcon from '../assets/images/search.png'

const data = require('../assets/data.json')

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        minHeight: '100vh',
        paddingTop: 50
    },
    paper: {
        width: '100%',
        maxWidth: 550,
        marginBottom: 10
    },
    input: {
        width: '100%',
        height: 71,
        border: 0,
        padding: '0 20px 0 50px',
        boxSizing: 'border-box',
        background: `url(${searchIcon}) no-repeat 20px, ${theme.palette.action.hover}`,
        backgroundSize: 16,
        outline: 'none'
    },
    pagination: {
        border: 0,
        '& .MuiTablePagination-input': {
            display: 'none'
        }
    }
}))

const Card: React.FC = () => {
    const [searchString, setSearchString] = useState("");
    const [page, setPage] = useState(0);
    const classes = useStyles();

    const users: User[] = data
        .slice(3)
        .filter((user: User) => user.name
            .toLowerCase()
            .indexOf(searchString.toLowerCase()) !== -1
        );

    const topUsers: User[] = data.slice(0, 3);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    return (
        <Grid 
            container 
            direction='column' 
            alignItems='center'
            wrap='nowrap'
            className={classes.container}
        >
            <Paper className={classes.paper}>
                <input 
                    onChange={e => setSearchString(e.target.value)} 
                    placeholder='Поиск авторов по имени'
                    className={classes.input} 
                />
                <TableContainer>
                    <Table>
                        <TableBody>
                            {topUsers
                                .map((user: User, index: number) => (
                                    <TableRowComponent 
                                        topUsers
                                        user={user}
                                        index={index + 1}
                                        key={index}
                                    />
                                ))
                            }
                            {users
                                .slice(page * 7, page * 7 + 7)
                                .map((user: User, index: number) => (
                                    <TableRowComponent 
                                        user={user}
                                        index={index + 4}
                                        key={index}
                                    />
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>   
            </Paper>
            <TablePagination
                count={topUsers.length + users.length}
                page={page}
                rowsPerPage={10}
                onChangePage={handleChangePage}
                labelRowsPerPage={null}
                className={classes.pagination}
            />
        </Grid>
    )
}

export default Card;